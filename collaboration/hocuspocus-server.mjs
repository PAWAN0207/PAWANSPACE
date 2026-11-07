import { Server } from "@hocuspocus/server";
import { SQLite } from "@hocuspocus/extension-sqlite";
import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

// ============================================================
// PATH + ENVIRONMENT
// ============================================================

const currentDir = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(currentDir, "..");
const databasePath = path.join(currentDir, "data", "crdt.sqlite");

function loadProjectEnv() {
    const envPath = path.join(projectRoot, ".env");
    if (!fs.existsSync(envPath)) return;

    for (const rawLine of fs.readFileSync(envPath, "utf8").split(/\r?\n/)) {
        const line = rawLine.trim();
        if (!line || line.startsWith("#")) continue;

        const separator = line.indexOf("=");
        if (separator <= 0) continue;

        const key = line.slice(0, separator).trim();
        let value = line.slice(separator + 1).trim();

        if (
            (value.startsWith('"') && value.endsWith('"')) ||
            (value.startsWith("'") && value.endsWith("'"))
        ) {
            value = value.slice(1, -1);
        }

        if (key && process.env[key] === undefined) {
            process.env[key] = value;
        }
    }
}

loadProjectEnv();

// ============================================================
// SERVER SETTINGS
// ============================================================

const HOST = "127.0.0.1";
const PORT = 1234;
const API_URL = (process.env.COLLAB_API_URL || "http://127.0.0.1:8001")
    .replace(/\/+$/, "");
const REVALIDATE_MS = 5000;
const REQUEST_TIMEOUT_MS = 3000;

const TICKET_SECRET = process.env.COLLAB_TICKET_SECRET || "";

if (!/^[0-9a-fA-F]{64,}$/.test(TICKET_SECRET)) {
    throw new Error(
        "COLLAB_TICKET_SECRET missing or invalid. Check project-root .env"
    );
}

if (!fs.existsSync(path.dirname(databasePath))) {
    fs.mkdirSync(path.dirname(databasePath), { recursive: true });
}

// ============================================================
// BASE64URL + TICKET VERIFICATION
// ============================================================

function decodeBase64Url(value) {
    if (typeof value !== "string" || !/^[A-Za-z0-9_-]+$/.test(value)) {
        throw new Error("Malformed collaboration ticket.");
    }
    return Buffer.from(value, "base64url");
}

function verifyCollaborationTicket(ticket, requestedDocumentName) {
    if (typeof ticket !== "string" || ticket.length > 4096) {
        throw new Error("Missing or invalid collaboration ticket.");
    }

    const parts = ticket.split(".");
    if (parts.length !== 2) throw new Error("Malformed collaboration ticket.");

    const [encodedPayload, encodedSignature] = parts;
    const suppliedSignature = decodeBase64Url(encodedSignature);

    const expectedSignature = crypto
        .createHmac("sha256", Buffer.from(TICKET_SECRET, "utf8"))
        .update(encodedPayload, "utf8")
        .digest();

    if (
        suppliedSignature.length !== expectedSignature.length ||
        !crypto.timingSafeEqual(suppliedSignature, expectedSignature)
    ) {
        throw new Error("Invalid collaboration ticket signature.");
    }

    let payload;
    try {
        payload = JSON.parse(decodeBase64Url(encodedPayload).toString("utf8"));
    } catch {
        throw new Error("Invalid ticket payload.");
    }

    const now = Math.floor(Date.now() / 1000);

    if (payload?.v !== 1) throw new Error("Unsupported ticket version.");

    if (
        typeof payload.sub !== "string" ||
        payload.sub.length < 1 ||
        payload.sub.length > 200
    ) {
        throw new Error("Invalid user identity.");
    }

    if (
        typeof payload.doc !== "string" ||
        !/^item:[A-Za-z0-9_-]{1,200}$/.test(payload.doc) ||
        payload.doc !== requestedDocumentName
    ) {
        throw new Error("Document identity mismatch.");
    }

    if (
        typeof payload.ws !== "string" ||
        payload.ws.length < 1 ||
        payload.ws.length > 200
    ) {
        throw new Error("Invalid workspace identity.");
    }

    if (!["view", "edit"].includes(payload.perm)) {
        throw new Error("Invalid document permission.");
    }

    if (
        !Number.isInteger(payload.iat) ||
        !Number.isInteger(payload.exp) ||
        payload.iat > now + 30 ||
        payload.exp <= now ||
        payload.exp <= payload.iat ||
        payload.exp - payload.iat > 300
    ) {
        throw new Error("Ticket expired or invalid.");
    }

    if (
        typeof payload.jti !== "string" ||
        payload.jti.length < 8 ||
        payload.jti.length > 200
    ) {
        throw new Error("Invalid ticket identifier.");
    }

    // SHA-256 of the original FastAPI login token; never the raw token.
    if (!/^[0-9a-f]{64}$/.test(payload.sid || "")) {
        throw new Error("Invalid session binding.");
    }

    return payload;
}

// ============================================================
// PRIVATE NODE -> FASTAPI LIVE AUTHORIZATION CHECK
// ============================================================

async function validateActiveConnection(auth) {
    const bodyObject = {
        sub: auth.userId,
        doc: auth.documentId,
        ws: auth.workspaceId,
        sid: auth.sessionHash
    };
    const body = JSON.stringify(bodyObject);
    const timestamp = Math.floor(Date.now() / 1000).toString();

    const signature = crypto
        .createHmac("sha256", Buffer.from(TICKET_SECRET, "utf8"))
        .update(`${timestamp}.${body}`, "utf8")
        .digest("hex");

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

    try {
        const response = await fetch(
            `${API_URL}/internal/collaboration/validate`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "X-Collab-Timestamp": timestamp,
                    "X-Collab-Signature": signature
                },
                body,
                signal: controller.signal
            }
        );

        if (!response.ok) {
            throw new Error(`Authorization service returned HTTP ${response.status}`);
        }

        const result = await response.json();
        return result;
    } finally {
        clearTimeout(timeout);
    }
}

// socketId -> { connection, auth, timer, checking, closed }
const activeConnections = new Map();

function closeRevokedConnection(socketId, reason) {
    const entry = activeConnections.get(socketId);
    if (!entry || entry.closed) return;

    entry.closed = true;
    if (entry.timer) clearInterval(entry.timer);

    console.warn(
        `[REVOKE] Closing connection | User: ${entry.auth.userId} | ` +
        `Document: ${entry.auth.documentId} | Reason: ${reason}`
    );

    try {
        // Hocuspocus v4 Connection exposes close(code, reason).
        entry.connection.close(4403, "Access revoked. Reconnect to re-authenticate.");
    } catch (error) {
        console.error("[REVOKE] Could not close connection cleanly:", error.message);
    }
}

async function revalidateConnection(socketId) {
    const entry = activeConnections.get(socketId);
    if (!entry || entry.closed || entry.checking) return;

    entry.checking = true;
    try {
        const result = await validateActiveConnection(entry.auth);

        if (!result.allowed) {
            closeRevokedConnection(socketId, result.reason || "permission_revoked");
            return;
        }

        // Permission changes (e.g. editor -> viewer) require a fresh connection
        // so the Hocuspocus readOnly flag is recalculated from a new ticket.
        if (result.permission !== entry.auth.permission) {
            closeRevokedConnection(socketId, "permission_changed");
        }
    } catch (error) {
        // Fail closed: if FastAPI cannot validate, do not keep an unverified
        // authenticated editing connection alive indefinitely.
        console.error(
            `[REVALIDATE] Failed | socket=${socketId} | ${error.message}`
        );
        closeRevokedConnection(socketId, "authorization_service_unavailable");
    } finally {
        entry.checking = false;
    }
}

// ============================================================
// HOCUSPOCUS SERVER
// ============================================================

const server = new Server({
    name: "PAWANSPACE-CRDT",
    address: HOST,
    port: PORT,
    debounce: 1000,
    maxDebounce: 5000,

    async onAuthenticate({ token, documentName, connectionConfig }) {
        const ticket = verifyCollaborationTicket(token, documentName);

        if (!connectionConfig) {
            throw new Error("Hocuspocus connection configuration is missing.");
        }

        // Do not trust a correctly signed but now-stale ticket. Check the
        // current login session and current RBAC before accepting the socket.
        const liveAuthorization = await validateActiveConnection({
            userId: ticket.sub,
            workspaceId: ticket.ws,
            documentId: documentName.replace(/^item:/, ""),
            permission: ticket.perm,
            sessionHash: ticket.sid
        });

        if (!liveAuthorization.allowed) {
            throw new Error("Collaboration access has been revoked.");
        }

        if (liveAuthorization.permission !== ticket.perm) {
            throw new Error("Document permission changed. Refresh the document.");
        }

        connectionConfig.readOnly = ticket.perm !== "edit";

        console.log(
            `[AUTH] User=${ticket.sub} | Document=${documentName} | ` +
            `Permission=${ticket.perm} | ReadOnly=${connectionConfig.readOnly}`
        );

        return {
            userId: ticket.sub,
            workspaceId: ticket.ws,
            documentId: documentName.replace(/^item:/, ""),
            permission: ticket.perm,
            ticketId: ticket.jti,
            sessionHash: ticket.sid
        };
    },

    // `connected` runs after the authenticated document connection is ready.
    async connected({ socketId, connection, context, documentName }) {
        if (
            !connection ||
            !context ||
            typeof context.userId !== "string" ||
            typeof context.sessionHash !== "string"
        ) {
            throw new Error("Authenticated connection context is missing.");
        }

        const auth = {
            userId: context.userId,
            workspaceId: context.workspaceId,
            documentId: context.documentId,
            permission: context.permission,
            sessionHash: context.sessionHash
        };

        const entry = {
            connection,
            auth,
            timer: null,
            checking: false,
            closed: false
        };

        activeConnections.set(socketId, entry);

        console.log(
            `[CONNECTED] User=${auth.userId} | Document=${documentName} | ` +
            `Active=${activeConnections.size}`
        );

        // Immediate server-side recheck plus periodic rechecks.
        await revalidateConnection(socketId);

        if (!entry.closed) {
            entry.timer = setInterval(
                () => void revalidateConnection(socketId),
                REVALIDATE_MS
            );
            entry.timer.unref?.();
        }
    },

    async onDisconnect({ socketId, documentName }) {
        const entry = activeConnections.get(socketId);
        if (entry?.timer) clearInterval(entry.timer);
        activeConnections.delete(socketId);

        console.log(
            `[DISCONNECTED] Socket=${socketId} | Document=${documentName} | ` +
            `Active=${activeConnections.size}`
        );
    },

    extensions: [
        new SQLite({
            database: databasePath
        })
    ],

    onListen() {
        console.log("==================================");
        console.log(" PAWANSPACE Secure CRDT Server");
        console.log("==================================");
        console.log(` WebSocket: ws://${HOST}:${PORT}`);
        console.log(` FastAPI validation: ${API_URL}`);
        console.log(` Revalidation interval: ${REVALIDATE_MS}ms`);
        console.log(" Authentication: HMAC-SHA256");
        console.log(" Session binding: Enabled");
        console.log(" Live permission revocation: Enabled");
        console.log(" Viewer Read-Only: Enabled");
        console.log(" Editor Write Access: Enabled");
        console.log(" Persistence: SQLite");
        console.log(" SQLite:", databasePath);
        console.log(" Status: RUNNING");
        console.log("==================================");
    },

    async onDestroy() {
        for (const [socketId, entry] of activeConnections) {
            if (entry.timer) clearInterval(entry.timer);
            try {
                entry.connection.close(1001, "CRDT server shutting down");
            } catch {}
            activeConnections.delete(socketId);
        }
    }
});

// ============================================================
// START + GRACEFUL SHUTDOWN
// ============================================================

await server.listen();

let shuttingDown = false;

async function shutdown() {
    if (shuttingDown) return;
    shuttingDown = true;

    console.log("\nStopping PAWANSPACE CRDT server...");

    for (const entry of activeConnections.values()) {
        if (entry.timer) clearInterval(entry.timer);
    }
    activeConnections.clear();

    await server.destroy();
    process.exit(0);
}

process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);
