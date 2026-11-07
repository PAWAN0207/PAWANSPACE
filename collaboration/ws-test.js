const Y = require("yjs");
const WebSocket = require("ws");
const { WebsocketProvider } = require("y-websocket");

global.WebSocket = WebSocket;

const server = "ws://localhost:1234";
const room = "PAWANSPACE-CRDT-TEST-" + Date.now();

const docA = new Y.Doc();
const docB = new Y.Doc();

const providerA = new WebsocketProvider(server, room, docA);
const providerB = new WebsocketProvider(server, room, docB);

const textA = docA.getText("content");
const textB = docB.getText("content");

function waitForSync(provider) {
    return new Promise((resolve, reject) => {
        const timeout = setTimeout(
            () => reject(new Error("WebSocket sync timeout")),
            15000
        );

        provider.on("synced", (synced) => {
            if (synced) {
                clearTimeout(timeout);
                resolve();
            }
        });
    });
}

async function test() {
    try {
        await Promise.all([
            waitForSync(providerA),
            waitForSync(providerB)
        ]);

        console.log("Both clients connected and synced.");

        textA.insert(0, "Hello from User A. ");

        await new Promise(resolve => setTimeout(resolve, 1000));

        console.log("Client A:", textA.toString());
        console.log("Client B:", textB.toString());

        textB.insert(textB.length, "Hello from User B.");

        await new Promise(resolve => setTimeout(resolve, 1000));

        console.log("\nAfter second user's edit:");
        console.log("Client A:", textA.toString());
        console.log("Client B:", textB.toString());

        if (textA.toString() === textB.toString()) {
            console.log("\nSUCCESS: Real WebSocket CRDT synchronization passed!");
        } else {
            console.log("\nFAILED: Client contents do not match.");
            process.exitCode = 1;
        }
    } catch (error) {
        console.error("TEST ERROR:", error.message);
        process.exitCode = 1;
    } finally {
        providerA.destroy();
        providerB.destroy();
        docA.destroy();
        docB.destroy();
    }
}

test();
