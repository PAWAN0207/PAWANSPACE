"""PAWANSPACE - Collaborative Workspace
FastAPI + SQLite Backend
"""

import os
import sqlite3
import secrets
import hashlib
import base64
import hmac
import re
import io
import time
import uuid
import threading
import json
import smtplib
import html as H
from fastapi.staticfiles import StaticFiles
from email.message import EmailMessage
from typing import Optional

from fastapi import (
    FastAPI, Depends, HTTPException, UploadFile, File,
    WebSocket, WebSocketDisconnect, Query, Header, Request
)

from fastapi.responses import FileResponse, StreamingResponse
from pydantic import BaseModel


# ============================================================
# CONFIGURATION
# ============================================================

BASE = os.path.dirname(os.path.abspath(__file__))


def _env():
    p = os.path.join(BASE, ".env")

    if os.path.exists(p):
        with open(p, encoding="utf-8") as f:
            for line in f:
                line = line.strip()

                if line and not line.startswith("#") and "=" in line:
                    k, v = line.split("=", 1)
                    os.environ.setdefault(
                        k.strip(),
                        v.strip().strip("\"'")
                    )


_env()

E = os.environ.get

D = E("DATA_DIR", os.path.join(BASE, "data"))

TOKEN_DAYS = float(E("TOKEN_DAYS", "7"))
MAX_MB = int(E("MAX_UPLOAD_MB", "50"))
APP_URL = E("APP_URL", "http://localhost:8000")
# Shared secret must also be configured in the Hocuspocus Node process.
COLLAB_TICKET_SECRET = E("COLLAB_TICKET_SECRET", "").strip()
COLLAB_TICKET_TTL_SECONDS = int(E("COLLAB_TICKET_TTL_SECONDS", "90"))
COLLAB_WS_URL = E("COLLAB_WS_URL", "ws://127.0.0.1:1234").strip()

os.makedirs(D + "/files", exist_ok=True)


try:
    import nh3
except ImportError:
    nh3 = None


# ============================================================
# DATABASE
# ============================================================

db = sqlite3.connect(
    D + "/app.db",
    check_same_thread=False
)

db.row_factory = sqlite3.Row

LOCK = threading.RLock()


db.executescript("""
create table if not exists users(
    id text primary key,
    email text unique,
    name text,
    pw text,
    salt text
);

create table if not exists tokens(
    t text primary key,
    uid text,
    ts real
);

create table if not exists ws(
    id text primary key,
    name text,
    owner text
);

create table if not exists members(
    ws text,
    uid text,
    role text,
    primary key(ws,uid)
);

create table if not exists invites(
    ws text,
    email text,
    role text,
    primary key(ws,email)
);

create table if not exists items(
    id text primary key,
    ws text,
    parent text,
    kind text,
    title text,
    content text default '',
    owner text,
    private int default 0,
    trashed int default 0,
    fname text,
    size int default 0,
    mime text,
    created real,
    updated real
);

create table if not exists versions(
    id integer primary key autoincrement,
    item text,
    content text,
    uid text,
    ts real
);

create table if not exists shares(
    item text,
    uid text,
    perm text,
    primary key(item,uid)
);

create table if not exists comments(
    id integer primary key autoincrement,
    item text,
    uid text,
    text text,
    ts real
);

create table if not exists favs(
    uid text,
    item text,
    primary key(uid,item)
);

create table if not exists teams(
    id text primary key,
    ws text,
    name text
);

create table if not exists team_members(
    team text,
    uid text,
    primary key(team,uid)
);

create table if not exists share_teams(
    item text,
    team text,
    perm text,
    primary key(item,team)
);

create table if not exists audit(
    id integer primary key autoincrement,
    ws text,
    uid text,
    act text,
    ts real
);

create index if not exists ix_items_ws
on items(ws,parent);
""")


FTS = True

try:
    db.execute("""
        create virtual table if not exists fts
        using fts5(
            item unindexed,
            ws unindexed,
            title,
            body,
            tokenize='unicode61 remove_diacritics 2'
        )
    """)

except sqlite3.OperationalError:
    FTS = False


db.execute(
    "delete from tokens where ts<?",
    (time.time() - TOKEN_DAYS * 86400,)
)

db.commit()

# Additive Knowledge Hub metadata migration. Existing items/content are untouched.
db.executescript("""
create table if not exists knowledge_meta(
    item text primary key,
    category text not null default 'General',
    department text not null default '',
    project text not null default '',
    tags text not null default '[]',
    pinned integer not null default 0,
    updated real not null default 0
);
create index if not exists ix_knowledge_category on knowledge_meta(category);
create index if not exists ix_knowledge_department on knowledge_meta(department);
""")
db.commit()


def q(sql, a=(), one=False):

    with LOCK:

        c = db.execute(sql, a)

        db.commit()

        r = c.fetchall()

    return (r[0] if r else None) if one else r


def nid():
    return uuid.uuid4().hex[:12]


def hpw(pw, salt):

    return hashlib.pbkdf2_hmac(
        "sha256",
        pw.encode(),
        bytes.fromhex(salt),
        200_000
    ).hex()


def log(ws, uid, act):

    q(
        "insert into audit(ws,uid,act,ts) values(?,?,?,?)",
        (ws, uid, act[:200], time.time())
    )


# ============================================================
# SECURITY HELPERS
# ============================================================

TAGS = {
    "p", "div", "br", "span", "b", "strong",
    "i", "em", "u", "s", "strike",
    "h1", "h2", "h3", "h4",
    "ul", "ol", "li", "a", "img",
    "table", "thead", "tbody", "tr",
    "td", "th", "pre", "code",
    "blockquote", "hr", "input", "sub", "sup"
}


ATTRS = {
    "a": {"href", "title"},
    "img": {"src", "alt", "width", "height"},
    "input": {"type", "checked"},
    "td": {"colspan", "rowspan"},
    "th": {"colspan", "rowspan"}
}


def _af(tag, attr, val):

    v = val.strip()

    if attr == "href" and not re.match(
        r"(?i)^(https?:|mailto:|#)", v
    ):
        return None

    if attr == "src" and not re.match(
        r"(?i)^(https?://|data:image/(png|jpe?g|gif|webp);base64,)",
        v
    ):
        return None

    if tag == "input" and attr == "type" and v.lower() != "checkbox":
        return None

    return val


def clean(s):

    s = s or ""

    if nh3:

        return nh3.clean(
            s,
            tags=TAGS,
            attributes=ATTRS,
            url_schemes={"http", "https", "mailto", "data"},
            link_rel="noopener noreferrer",
            attribute_filter=_af
        )

    s = re.sub(
        r"(?is)<(script|iframe|object|embed|style)\b.*?</\1\s*>",
        "",
        s
    )

    s = re.sub(
        r"(?is)<(script|iframe|object|embed|style|link|meta)\b[^>]*>",
        "",
        s
    )

    s = re.sub(
        r"(?i)\son\w+\s*=\s*(\"[^\"]*\"|'[^']*'|[^\s>]+)",
        "",
        s
    )

    return re.sub(
        r"(?i)(href|src)\s*=\s*([\"']?)\s*javascript:",
        r"\1=\2#",
        s
    )


HITS = {}


def throttle(key, limit, win):

    now = time.time()

    l = [
        t for t in HITS.get(key, [])
        if now - t < win
    ]

    HITS[key] = l

    if len(l) >= limit:

        raise HTTPException(
            429,
            "Too many attempts. Please wait a few minutes and try again."
        )


def hit(key):

    HITS.setdefault(key, []).append(time.time())


# ============================================================
# EMAIL SERVICE
# ============================================================

def send_mail(to, subj, body):

    if not E("SMTP_HOST"):
        return False

    def run():

        try:

            m = EmailMessage()

            m["From"] = E("SMTP_FROM") or E("SMTP_USER")
            m["To"] = to
            m["Subject"] = subj

            m.set_content(body)

            port = int(E("SMTP_PORT", "587"))

            s = (
                smtplib.SMTP_SSL
                if port == 465
                else smtplib.SMTP
            )(
                E("SMTP_HOST"),
                port,
                timeout=15
            )

            if port != 465:
                s.starttls()

            if E("SMTP_USER"):
                s.login(
                    E("SMTP_USER"),
                    E("SMTP_PASS", "")
                )

            s.send_message(m)
            s.quit()

        except Exception as e:

            print("mail failed:", e)

    threading.Thread(
        target=run,
        daemon=True
    ).start()

    return True


# ============================================================
# FASTAPI APPLICATION
# ============================================================

app = FastAPI(
    title="PAWANSPACE",
    description="Collaborative Team Workspace and Document Management Platform",
    version="1.0.0"
)


# ============================================================
# SECURITY HEADERS + SWAGGER CSP FIX
# ============================================================

@app.middleware("http")
async def sec_headers(request, call_next):

    r = await call_next(request)

    r.headers.update({

        "X-Content-Type-Options": "nosniff",

        "X-Frame-Options": "SAMEORIGIN",

        "Referrer-Policy": "same-origin",

        "Content-Security-Policy":
            "default-src 'self'; "
            "img-src 'self' data: https:; "
            "script-src 'self' 'unsafe-inline' https://cdn.jsdelivr.net; "
            "style-src 'self' 'unsafe-inline' https://cdn.jsdelivr.net; "
            "connect-src 'self' ws: wss: https://cdn.jsdelivr.net; "
            "frame-src 'self'; "
            "object-src 'none'; "
            "base-uri 'self'"

    })

    return r


# ============================================================
# AUTHENTICATION
# ============================================================

def user_by_token(t):

    return q(
        """
        select u.*
        from tokens k
        join users u on u.id=k.uid
        where k.t=? and k.ts>?
        """,
        (
            t or "",
            time.time() - TOKEN_DAYS * 86400
        ),
        True
    )


def _tok(authorization, token):

    return token or (
        authorization or ""
    ).replace("Bearer ", "")


def me(
    authorization: str = Header(None),
    token: str = Query(None)
):

    u = user_by_token(
        _tok(authorization, token)
    )

    if not u:

        raise HTTPException(
            401,
            "Session expired. Please log in again"
        )

    return dict(u)


def mktoken(uid):

    t = secrets.token_urlsafe(32)

    q(
        "insert into tokens values(?,?,?)",
        (t, uid, time.time())
    )

    return t


class Cred(BaseModel):

    email: str
    password: str
    name: str = ""


@app.post("/api/register")
def register(c: Cred, request: Request):

    ip = request.client.host if request.client else "?"

    throttle(f"r:{ip}", 10, 3600)
    hit(f"r:{ip}")

    email = c.email.strip().lower()

    if not re.match(
        r"^[^@\s]+@[^@\s]+\.[^@\s]+$",
        email
    ):

        raise HTTPException(400, "Enter a valid email")

    if len(c.password) < 8:

        raise HTTPException(
            400,
            "Password must be at least 8 characters"
        )

    if q(
        "select 1 from users where email=?",
        (email,),
        True
    ):

        raise HTTPException(
            400,
            "This email is already registered"
        )

    uid = nid()
    salt = secrets.token_hex(16)

    q(
        "insert into users values(?,?,?,?,?)",
        (
            uid,
            email,
            (c.name or email.split("@")[0])[:60],
            hpw(c.password, salt),
            salt
        )
    )

    for i in q(
        "select * from invites where email=?",
        (email,)
    ):

        q(
            "insert or replace into members values(?,?,?)",
            (i["ws"], uid, i["role"])
        )

    q(
        "delete from invites where email=?",
        (email,)
    )

    return {"token": mktoken(uid)}


@app.post("/api/login")
def login(c: Cred, request: Request):

    ip = request.client.host if request.client else "?"
    email = c.email.strip().lower()

    throttle(f"l:{ip}:{email}", 5, 900)
    throttle(f"li:{ip}", 30, 900)

    u = q(
        "select * from users where email=?",
        (email,),
        True
    )

    if not u or not secrets.compare_digest(
        u["pw"],
        hpw(c.password, u["salt"])
    ):

        hit(f"l:{ip}:{email}")
        hit(f"li:{ip}")

        raise HTTPException(
            400,
            "Wrong email or password"
        )

    HITS.pop(f"l:{ip}:{email}", None)

    return {"token": mktoken(u["id"])}


@app.post("/api/logout")
def logout(
    authorization: str = Header(None),
    token: str = Query(None)
):

    q(
        "delete from tokens where t=?",
        (_tok(authorization, token),)
    )

    return {"ok": True}


@app.get("/api/me")
def whoami(u=Depends(me)):

    return {
        "id": u["id"],
        "email": u["email"],
        "name": u["name"]
    }


# ============================================================
# WORKSPACES, MEMBERS AND TEAMS
# ============================================================

def member(u, wsid):

    m = q(
        "select role from members where ws=? and uid=?",
        (wsid, u["id"]),
        True
    )

    if not m:

        raise HTTPException(
            403,
            "You are not a member of this workspace"
        )

    return m["role"]


class WsIn(BaseModel):

    name: str


@app.get("/api/ws")
def list_ws(u=Depends(me)):

    return [
        dict(r)
        for r in q(
            """
            select w.id,w.name,m.role
            from ws w
            join members m on m.ws=w.id
            where m.uid=?
            """,
            (u["id"],)
        )
    ]


@app.post("/api/ws")
def create_ws(b: WsIn, u=Depends(me)):

    name = (b.name or "").strip()
    if not name:
        raise HTTPException(400, "Workspace name is required")

    i = nid()

    q(
        "insert into ws values(?,?,?)",
        (
            i,
            name[:80],
            u["id"]
        )
    )

    q(
        "insert into members values(?,?,?)",
        (i, u["id"], "admin")
    )
    log(i, u["id"], "workspace created")

    return {"id": i}


@app.get("/api/ws/{wid}/members")
def members(wid: str, u=Depends(me)):

    member(u, wid)

    r = [
        dict(x)
        for x in q(
            """
            select u.id,u.name,u.email,m.role
            from members m
            join users u on u.id=m.uid
            where m.ws=?
            """,
            (wid,)
        )
    ]

    r += [
        {
            "id": None,
            "name": "(invited)",
            "email": x["email"],
            "role": x["role"],
            "pending": True
        }
        for x in q(
            "select * from invites where ws=?",
            (wid,)
        )
    ]

    return r


class MemIn(BaseModel):

    email: str
    role: str


@app.post("/api/ws/{wid}/members")
def set_member(wid: str, b: MemIn, u=Depends(me)):

    if member(u, wid) != "admin":

        raise HTTPException(
            403,
            "Only admins can manage members"
        )

    if b.role not in ("admin", "editor", "viewer", "remove"):

        raise HTTPException(400, "Invalid role")

    email = b.email.strip().lower()
    emailed = False

    t = q(
        "select id from users where email=?",
        (email,),
        True
    )

    if b.role == "remove":

        if t:
            target_role = q(
                "select role from members where ws=? and uid=?",
                (wid, t["id"]),
                True
            )
            admin_count = q(
                "select count(*) c from members where ws=? and role='admin'",
                (wid,),
                True
            )["c"]

            if target_role and target_role["role"] == "admin" and admin_count <= 1:
                raise HTTPException(400, "A workspace needs at least one admin")

            q(
                "delete from members where ws=? and uid=?",
                (wid, t["id"])
            )

            q(
                """
                delete from team_members
                where uid=?
                and team in (
                    select id from teams where ws=?
                )
                """,
                (t["id"], wid)
            )

        q(
            "delete from invites where ws=? and email=?",
            (wid, email)
        )

    else:

        if t:
            current_role = q(
                "select role from members where ws=? and uid=?",
                (wid, t["id"]),
                True
            )
            admin_count = q(
                "select count(*) c from members where ws=? and role='admin'",
                (wid,),
                True
            )["c"]
            if (
                current_role
                and current_role["role"] == "admin"
                and b.role != "admin"
                and admin_count <= 1
            ):
                raise HTTPException(400, "A workspace needs at least one admin")

            q(
                "insert or replace into members values(?,?,?)",
                (wid, t["id"], b.role)
            )

        else:

            q(
                "insert or replace into invites values(?,?,?)",
                (wid, email, b.role)
            )

        wn = q(
            "select name from ws where id=?",
            (wid,),
            True
        )["name"]

        emailed = send_mail(
            email,
            f"{u['name']} invited you to {wn}",
            f"{u['name']} added you to the workspace "
            f"\"{wn}\" as {b.role}.\n"
            f"Open: {APP_URL}\n"
            + (
                ""
                if t
                else f"Register with this email ({email}) to join automatically."
            )
        )

    log(
        wid,
        u["id"],
        f"member {email} -> {b.role}"
    )

    return {
        "ok": True,
        "emailed": emailed
    }


class TeamIn(BaseModel):

    name: str


@app.get("/api/ws/{wid}/teams")
def list_teams(wid: str, u=Depends(me)):

    member(u, wid)

    out = []

    for t in q(
        "select * from teams where ws=? order by name",
        (wid,)
    ):

        ms = q(
            """
            select u.id,u.name,u.email
            from team_members tm
            join users u on u.id=tm.uid
            where tm.team=?
            """,
            (t["id"],)
        )

        out.append({
            "id": t["id"],
            "name": t["name"],
            "members": [dict(m) for m in ms]
        })

    return out


@app.post("/api/ws/{wid}/teams")
def create_team(wid: str, b: TeamIn, u=Depends(me)):
    if member(u, wid) != "admin":
        raise HTTPException(403, "Only admins can manage teams")

    i = nid()

    q(
        "insert into teams values(?,?,?)",
        (i, wid, b.name.strip()[:60] or "Team")
    )

    log(wid, u["id"], f"team created {b.name}")

    return {"id": i}


def team_admin(tid, u):
    t = q("select * from teams where id=?", (tid,), True)

    if not t:
        raise HTTPException(404, "Team not found")

    if member(u, t["ws"]) != "admin":
        raise HTTPException(403, "Only admins can manage teams")

    return t


class TmIn(BaseModel):
    email: str
    remove: bool = False


@app.post("/api/teams/{tid}/members")
def team_member(tid: str, b: TmIn, u=Depends(me)):

    t = team_admin(tid, u)

    x = q(
        """
        select u.id from users u
        join members m on m.uid=u.id
        where u.email=? and m.ws=?
        """,
        (b.email.strip().lower(), t["ws"]),
        True
    )

    if not x:
        raise HTTPException(
            400,
            "That person is not a member of this workspace"
        )

    if b.remove:
        q(
            "delete from team_members where team=? and uid=?",
            (tid, x["id"])
        )
    else:
        q(
            "insert or ignore into team_members values(?,?)",
            (tid, x["id"])
        )

    return {"ok": True}


@app.delete("/api/teams/{tid}")
def del_team(tid: str, u=Depends(me)):

    team_admin(tid, u)

    for t in ("team_members", "share_teams"):
        q(f"delete from {t} where team=?", (tid,))

    q("delete from teams where id=?", (tid,))

    return {"ok": True}


@app.get("/api/ws/{wid}/audit")
def audit(wid: str, u=Depends(me)):

    if member(u, wid) != "admin":
        raise HTTPException(403, "Admins only")

    return [
        dict(r)
        for r in q(
            """
            select a.ts,a.act,
            coalesce(u.name,'?') name
            from audit a
            left join users u on u.id=a.uid
            where a.ws=?
            order by a.id desc limit 50
            """,
            (wid,)
        )
    ]


# ============================================================
# PERMISSION SYSTEM
# ============================================================

RANK = {"view": 1, "edit": 2}


def perm_map(u, wsid):
    """
    Resolve effective access for every item in a workspace.

    Rules:
    - Workspace admin and the item's owner can edit that item.
    - Workspace editor defaults to edit; viewer defaults to view.
    - A private item/folder blocks the workspace default for itself and
      descendants.
    - Explicit user/team grants inherit from parent to child.
    - A more specific grant on a child overrides an inherited grant.
    """
    membership = q(
        "select role from members where ws=? and uid=?",
        (wsid, u["id"]),
        True
    )
    if not membership:
        return {}

    rows = {
        r["id"]: dict(r)
        for r in q(
            "select id,parent,owner,private from items where ws=?",
            (wsid,)
        )
    }

    user_grants = {
        r["item"]: r["perm"]
        for r in q(
            """
            select s.item,s.perm
            from shares s
            join items i on i.id=s.item
            where s.uid=? and i.ws=?
            """,
            (u["id"], wsid)
        )
    }

    team_grants = {}
    for r in q(
        """
        select st.item,st.perm
        from share_teams st
        join teams t on t.id=st.team
        join team_members tm on tm.team=t.id
        where tm.uid=? and t.ws=?
        """,
        (u["id"], wsid)
    ):
        # At the same hierarchy level, the stronger team/user grant wins.
        current = team_grants.get(r["item"])
        if RANK[r["perm"]] > RANK.get(current, 0):
            team_grants[r["item"]] = r["perm"]

    grants = dict(team_grants)
    for item_id, permission in user_grants.items():
        if RANK[permission] > RANK.get(grants.get(item_id), 0):
            grants[item_id] = permission

    is_admin = membership["role"] == "admin"
    workspace_default = (
        "view" if membership["role"] == "viewer" else "edit"
    )

    out = {}
    for item_id, item in rows.items():
        chain = []
        current = item
        seen = set()

        while current and len(chain) < 100:
            current_id = current["id"]
            if current_id in seen:
                # Corrupt/cyclic parent references must fail closed.
                chain = []
                break
            seen.add(current_id)
            chain.append(current)
            current = rows.get(current.get("parent"))

        if not chain:
            out[item_id] = (None, False)
            continue

        # Begin with workspace access, then apply root -> leaf rules.
        effective = workspace_default
        explicitly_shared = False

        for node in reversed(chain):
            if node["private"]:
                effective = None

            grant = grants.get(node["id"])
            if grant:
                effective = grant
                explicitly_shared = True

        if is_admin or item["owner"] == u["id"]:
            effective = "edit"

        out[item_id] = (effective, explicitly_shared)

    return out


def perm(u, it):
    return perm_map(u, it["ws"]).get(it["id"], (None, False))[0]


def get_item(iid, u, need="view"):
    it = q("select * from items where id=?", (iid,), True)
    if not it:
        raise HTTPException(404, "Not found")

    it = dict(it)
    permission = perm(u, it)

    if permission not in ("view", "edit"):
        raise HTTPException(403, "You do not have access")

    if need == "edit" and permission != "edit":
        raise HTTPException(403, "You have view-only access")

    it["perm"] = permission
    return it


def _b64url(data):
    return base64.urlsafe_b64encode(data).rstrip(b"=").decode("ascii")


def create_collaboration_ticket(user, item, session_token):
    """Create a short-lived HMAC-SHA256 ticket bound to the active login session."""
    secret = COLLAB_TICKET_SECRET.encode("utf-8")
    if len(secret) < 32:
        raise HTTPException(
            503,
            "Collaboration is not configured. Set COLLAB_TICKET_SECRET "
            "to a shared secret of at least 32 characters."
        )

    ttl = COLLAB_TICKET_TTL_SECONDS
    if not 30 <= ttl <= 300:
        raise HTTPException(
            503,
            "COLLAB_TICKET_TTL_SECONDS must be between 30 and 300."
        )

    now = int(time.time())
    payload = {
        "v": 1,
        "sub": str(user["id"]),
        "doc": f"item:{item['id']}",
        "ws": str(item["ws"]),
        "perm": item["perm"],
        # Hash of the bearer session token: allows live revocation checks
        # without sending or storing the raw login token in the CRDT service.
        "sid": hashlib.sha256(session_token.encode("utf-8")).hexdigest(),
        "iat": now,
        "exp": now + ttl,
        "jti": secrets.token_urlsafe(18)
    }
    encoded = _b64url(json.dumps(
        payload, separators=(",", ":"), sort_keys=True
    ).encode("utf-8"))
    signature = hmac.new(
        secret, encoded.encode("ascii"), hashlib.sha256
    ).digest()

    return {
        "token": encoded + "." + _b64url(signature),
        "documentName": payload["doc"],
        "permission": payload["perm"],
        "readOnly": payload["perm"] != "edit",
        "expiresAt": payload["exp"],
        "ttl": ttl,
        "websocketUrl": COLLAB_WS_URL
    }


@app.post("/api/collaboration/ticket/{iid}")
def collaboration_ticket(
    iid: str,
    u=Depends(me),
    authorization: str = Header(None)
):
    """Issue a ticket bound to the current login session and RBAC state."""
    session_token = _tok(authorization, None)
    session_user = user_by_token(session_token)
    if not session_user or session_user["id"] != u["id"]:
        raise HTTPException(401, "Invalid collaboration session")

    item = get_item(iid, u, "view")

    if item["trashed"]:
        raise HTTPException(404, "Document is in the trash")

    if item["kind"] not in ("doc", "page"):
        raise HTTPException(
            400,
            "Real-time CRDT collaboration is available only for docs and pages."
        )

    ticket = create_collaboration_ticket(u, item, session_token)
    log(item["ws"], u["id"], f"collaboration ticket issued for '{item['title']}'")
    return ticket


@app.post("/internal/collaboration/validate")
async def validate_collaboration_connection(request: Request):
    """
    Private Node-to-FastAPI authorization check.
    The request body is authenticated with the shared HMAC secret.
    No user bearer token is sent to or stored by the Node process.
    """
    if not COLLAB_TICKET_SECRET:
        raise HTTPException(503, "Collaboration validation is not configured")

    raw_body = await request.body()
    timestamp = request.headers.get("X-Collab-Timestamp", "")
    supplied = request.headers.get("X-Collab-Signature", "")

    if not timestamp.isdigit() or abs(int(time.time()) - int(timestamp)) > 15:
        raise HTTPException(401, "Invalid internal request timestamp")

    expected = hmac.new(
        COLLAB_TICKET_SECRET.encode("utf-8"),
        timestamp.encode("ascii") + b"." + raw_body,
        hashlib.sha256
    ).hexdigest()

    if not re.fullmatch(r"[0-9a-f]{64}", supplied) or not hmac.compare_digest(expected, supplied):
        raise HTTPException(401, "Invalid internal request signature")

    try:
        payload = json.loads(raw_body.decode("utf-8"))
    except Exception:
        raise HTTPException(400, "Invalid validation payload")

    if not isinstance(payload, dict):
        raise HTTPException(400, "Invalid validation payload")

    user_id = payload.get("sub")
    document_id = payload.get("doc")
    workspace_id = payload.get("ws")
    session_hash = payload.get("sid")

    if not all(isinstance(v, str) and 1 <= len(v) <= 200 for v in (user_id, document_id, workspace_id)):
        raise HTTPException(400, "Invalid validation identity")
    if not isinstance(session_hash, str) or not re.fullmatch(r"[0-9a-f]{64}", session_hash):
        raise HTTPException(400, "Invalid session reference")
    if not re.fullmatch(r"[A-Za-z0-9_-]{1,200}", document_id):
        raise HTTPException(400, "Invalid document reference")

    # A logout, expired token, or removed session invalidates this connection.
    active_sessions = q(
        "select t,ts from tokens where uid=? and ts>?",
        (user_id, time.time() - TOKEN_DAYS * 86400)
    )
    session_active = any(
        hmac.compare_digest(
            hashlib.sha256(row["t"].encode("utf-8")).hexdigest(),
            session_hash
        )
        for row in active_sessions
    )
    if not session_active:
        return {"allowed": False, "reason": "session_revoked"}

    item = q(
        "select * from items where id=? and ws=?",
        (document_id, workspace_id),
        True
    )
    if not item or item["trashed"] or item["kind"] not in ("doc", "page"):
        return {"allowed": False, "reason": "document_unavailable"}

    current_user = q("select * from users where id=?", (user_id,), True)
    if not current_user:
        return {"allowed": False, "reason": "user_unavailable"}

    current_permission = perm(dict(current_user), dict(item))
    if current_permission not in ("view", "edit"):
        return {"allowed": False, "reason": "permission_revoked"}

    return {"allowed": True, "permission": current_permission}


def require_workspace_role(u, wsid, allowed):
    role = member(u, wsid)
    if role not in allowed:
        raise HTTPException(403, "Insufficient workspace role")
    return role


def can_manage_item_shares(item, u):
    role = member(u, item["ws"])
    return role == "admin" or item["owner"] == u["id"]


# ============================================================
# SEARCH ENGINE
# ============================================================

JSONK = ("board", "database")


def _strs(o):

    if isinstance(o, str):
        yield o

    elif isinstance(o, dict):

        for k, v in o.items():

            if k != "id":
                yield from _strs(v)

    elif isinstance(o, list):

        for v in o:
            yield from _strs(v)


def plain(it):

    content = it["content"] or ""

    if it["kind"] in JSONK:

        try:
            return " ".join(
                _strs(json.loads(content))
            )

        except Exception:
            return ""

    return H.unescape(
        re.sub(
            r"<[^>]+>",
            " ",
            re.sub(
                r"(?is)<(script|style)\b.*?</\1>",
                "",
                content
            )
        )
    )


def reindex(iid):

    if not FTS:
        return

    it = q(
        "select * from items where id=?",
        (iid,),
        True
    )

    q("delete from fts where item=?", (iid,))

    if it:

        meta = q("select category,department,project,tags from knowledge_meta where item=?", (iid,), True)
        meta_text = " ".join(str(meta[k] or "") for k in ("category", "department", "project", "tags")) if meta else ""
        body = plain(it) + " " + meta_text + " " + " ".join(
            r["text"]
            for r in q(
                "select text from comments where item=?",
                (iid,)
            )
        )

        q(
            "insert into fts(item,ws,title,body) values(?,?,?,?)",
            (
                iid,
                it["ws"],
                it["title"],
                body[:400000]
            )
        )


if FTS and not q(
    "select 1 from fts limit 1",
    one=True
):

    for r in q("select id from items"):
        reindex(r["id"])


def search_ids(ws, s):

    if not FTS:
        return None

    tokens = re.findall(r"\w+", s, re.U)[:8]

    if not tokens:
        return {}

    try:

        return {
            r["item"]: r["sn"]
            for r in q(
                """
                select item,
                snippet(fts,-1,char(2),char(3),' … ',14) sn
                from fts
                where fts match ? and ws=?
                order by rank limit 200
                """,
                (
                    " ".join(f'"{t}"*' for t in tokens),
                    ws
                )
            )
        }

    except sqlite3.OperationalError:
        return {}


# ============================================================
# DOCUMENT TEMPLATES
# ============================================================

TPL = {

    "meeting": (
        "Meeting Notes",
        "<h1>Meeting Notes</h1>"
        "<p><b>Date:</b> </p>"
        "<p><b>Attendees:</b> </p>"
        "<h2>Agenda</h2>"
        "<ul><li></li></ul>"
        "<h2>Decisions</h2><p></p>"
        "<h2>Action items</h2>"
        "<div><input type=\"checkbox\">&nbsp;</div>"
    ),

    "policy": (
        "Company Policy",
        "<h1>Policy title</h1>"
        "<p><b>Owner:</b> &nbsp; "
        "<b>Effective:</b> &nbsp; "
        "<b>Version:</b> 1.0</p>"
        "<h2>Purpose</h2><p></p>"
        "<h2>Scope</h2><p></p>"
        "<h2>Policy</h2><ol><li></li></ol>"
        "<h2>Procedure</h2><p></p>"
    ),

    "project": (
        "Project Plan",
        "<h1>Project name</h1>"
        "<h2>Goal</h2><p></p>"
        "<h2>Milestones</h2>"
        "<table border=\"1\">"
        "<tr><td>Milestone</td><td>Owner</td>"
        "<td>Due</td><td>Status</td></tr>"
        "<tr><td></td><td></td><td></td><td></td></tr>"
        "</table>"
        "<h2>Tasks</h2>"
        "<div><input type=\"checkbox\">&nbsp;</div>"
        "<h2>Risks</h2><p></p>"
    )

}


BOARD = {
    "columns": [
        {"id": "a1", "title": "To do", "cards": []},
        {"id": "a2", "title": "In progress", "cards": []},
        {"id": "a3", "title": "Done", "cards": []}
    ]
}


DBASE = {

    "cols": [
        {"id": "c1", "name": "Name", "type": "text"},
        {
            "id": "c2",
            "name": "Status",
            "type": "select",
            "options": ["Not started", "In progress", "Done"]
        },
        {"id": "c3", "name": "Owner", "type": "text"},
        {"id": "c4", "name": "Due", "type": "date"}
    ],

    "rows": []
}


# ============================================================
# DOCUMENT VERSION HISTORY
# ============================================================

def snap(it, uid):

    last = q(
        """
        select ts from versions
        where item=?
        order by id desc limit 1
        """,
        (it["id"],),
        True
    )

    if it["content"] and (
        not last or time.time() - last["ts"] > 30
    ):

        q(
            "insert into versions(item,content,uid,ts) values(?,?,?,?)",
            (
                it["id"],
                it["content"],
                uid,
                time.time()
            )
        )

        q(
            """
            delete from versions
            where item=?
            and id not in (
                select id from versions
                where item=?
                order by id desc limit 50
            )
            """,
            (it["id"], it["id"])
        )


def norm_json(s):

    if len(s) > 2_000_000:
        raise HTTPException(400, "Too large")

    try:

        data = json.loads(s)
        assert isinstance(data, dict)

    except Exception:

        raise HTTPException(
            400,
            "Invalid data"
        )

    return json.dumps(
        data,
        ensure_ascii=False
    )


# ============================================================
# DOCUMENT LISTING
# ============================================================

@app.get("/api/items")
def list_items(
    ws: str,
    q_: str = Query("", alias="q"),
    kind: str = "",
    owner: str = "",
    since: str = "",
    trashed: str = "0",
    u=Depends(me)
):

    member(u, ws)

    pm = perm_map(u, ws)

    sql = (
        "select i.id,i.ws,i.parent,i.kind,i.title,"
        "i.owner,i.private,i.trashed,i.size,i.mime,i.updated,"
        "u.name oname,"
        "(select 1 from favs f "
        "where f.item=i.id and f.uid=?) fav "
        "from items i join users u on u.id=i.owner "
        "where i.ws=?"
    )

    args = [u["id"], ws]
    hits = None

    if trashed != "all":

        sql += " and i.trashed=?"

        args.append(
            1 if trashed == "1" else 0
        )

    if q_.strip():

        hits = search_ids(ws, q_)

        if hits is None:

            sql += " and (i.title like ? or i.content like ?)"

            args += [
                f"%{q_}%",
                f"%{q_}%"
            ]

        else:

            if not hits:
                return []

            sql += " and i.id in (%s)" % ",".join(
                "?" * len(hits)
            )

            args += list(hits)

    if kind:

        sql += " and i.kind=?"
        args.append(kind)

    if owner:

        sql += " and i.owner=?"
        args.append(owner)

    if since:

        sql += " and i.updated>=?"
        args.append(float(since))

    rows = [
        dict(r)
        for r in q(
            sql + " order by i.updated desc",
            args
        )
    ]

    if hits:

        order = list(hits)

        rows.sort(
            key=lambda r: order.index(r["id"])
        )

    out = []

    for r in rows:

        p, shared = pm.get(
            r["id"],
            (None, False)
        )

        if p:

            r["perm"] = p

            r["shared"] = (
                1
                if shared and r["owner"] != u["id"]
                else 0
            )

            r["snip"] = (
                hits or {}
            ).get(r["id"])

            out.append(r)

    return out


# ============================================================
# KNOWLEDGE HUB + CROSS-WORKSPACE SEARCH
# ============================================================

class KnowledgeMetaIn(BaseModel):
    category: str = "General"
    department: str = ""
    project: str = ""
    tags: list[str] = []
    pinned: bool = False


def _knowledge_meta(item_id):
    row = q("select * from knowledge_meta where item=?", (item_id,), True)
    if not row:
        return {
            "category": "General", "department": "",
            "project": "", "tags": [], "pinned": False
        }
    data = dict(row)
    try:
        data["tags"] = json.loads(data.get("tags") or "[]")
    except Exception:
        data["tags"] = []
    data["pinned"] = bool(data.get("pinned"))
    return data


@app.get("/api/knowledge")
def knowledge_hub(
    ws: str,
    category: str = "",
    department: str = "",
    project: str = "",
    tag: str = "",
    pinned: Optional[bool] = None,
    q_: str = Query("", alias="q"),
    u=Depends(me)
):
    """Permission-aware Knowledge Hub listing for a single workspace."""
    member(u, ws)
    pm = perm_map(u, ws)
    sql = """
        select i.id,i.ws,i.parent,i.kind,i.title,i.owner,i.updated,
               u.name oname,km.category,km.department,km.project,
               km.tags,km.pinned
        from items i
        join users u on u.id=i.owner
        left join knowledge_meta km on km.item=i.id
        where i.ws=? and i.trashed=0 and i.kind in ('doc','page')
    """
    args = [ws]
    for col, val in (("category", category), ("department", department), ("project", project)):
        if val.strip():
            sql += f" and coalesce(km.{col},'')=?"
            args.append(val.strip())
    if pinned is not None:
        sql += " and coalesce(km.pinned,0)=?"
        args.append(1 if pinned else 0)
    if tag.strip():
        # Tags are JSON arrays; use exact quoted value matching.
        sql += " and km.tags like ?"
        args.append("%" + json.dumps(tag.strip(), ensure_ascii=False)[1:-1] + "%")
    if q_.strip():
        hits = search_ids(ws, q_)
        if hits is not None:
            if not hits:
                return []
            sql += " and i.id in (" + ",".join("?" for _ in hits) + ")"
            args.extend(list(hits))
        else:
            sql += " and (i.title like ? or i.content like ?)"
            args.extend([f"%{q_.strip()}%", f"%{q_.strip()}%"])
    rows = q(sql + " order by coalesce(km.pinned,0) desc,i.updated desc limit 500", args)
    result = []
    for row in rows:
        item = dict(row)
        permission = pm.get(item["id"], (None, False))[0]
        if permission not in ("view", "edit"):
            continue
        item["perm"] = permission
        try:
            item["tags"] = json.loads(item.pop("tags") or "[]")
        except Exception:
            item["tags"] = []
        item["pinned"] = bool(item.get("pinned"))
        item["category"] = item.get("category") or "General"
        result.append(item)
    return result


@app.put("/api/knowledge/{iid}")
def update_knowledge_meta(iid: str, b: KnowledgeMetaIn, u=Depends(me)):
    item = get_item(iid, u, "edit")
    if item["kind"] not in ("doc", "page"):
        raise HTTPException(400, "Knowledge metadata can only be added to docs and pages")
    category = (b.category or "General").strip()[:60]
    department = b.department.strip()[:80]
    project = b.project.strip()[:100]
    tags = []
    for value in b.tags[:30]:
        value = str(value).strip()
        if value and value.lower() not in {x.lower() for x in tags}:
            tags.append(value[:40])
    now = time.time()
    q("""
        insert into knowledge_meta(item,category,department,project,tags,pinned,updated)
        values(?,?,?,?,?,?,?)
        on conflict(item) do update set
          category=excluded.category, department=excluded.department,
          project=excluded.project, tags=excluded.tags,
          pinned=excluded.pinned, updated=excluded.updated
    """, (iid, category, department, project,
          json.dumps(tags, ensure_ascii=False), 1 if b.pinned else 0, now))
    reindex(iid)
    log(item["ws"], u["id"], f"knowledge metadata updated for '{item['title']}'")
    return {"ok": True, **_knowledge_meta(iid)}


@app.get("/api/knowledge/{iid}")
def read_knowledge_meta(iid: str, u=Depends(me)):
    get_item(iid, u, "view")
    return _knowledge_meta(iid)


@app.get("/api/search")
def global_search(
    q_: str = Query(..., alias="q", min_length=1, max_length=120),
    kind: str = "",
    owner: str = "",
    since: str = "",
    department: str = "",
    category: str = "",
    tag: str = "",
    limit: int = Query(100, ge=1, le=200),
    u=Depends(me)
):
    """Search only items the caller can access across all their workspaces."""
    query_text = q_.strip()
    if not query_text:
        return []
    workspaces = q("select ws,role from members where uid=?", (u["id"],))
    results = []
    for membership in workspaces:
        wsid = membership["ws"]
        pm = perm_map(u, wsid)
        hits = search_ids(wsid, query_text)
        sql = """
            select i.id,i.ws,i.parent,i.kind,i.title,i.owner,i.updated,
                   u.name oname,km.category,km.department,km.project,km.tags
            from items i
            join users u on u.id=i.owner
            left join knowledge_meta km on km.item=i.id
            where i.ws=? and i.trashed=0
        """
        args = [wsid]
        if hits is not None:
            if not hits:
                continue
            sql += " and i.id in (" + ",".join("?" for _ in hits) + ")"
            args.extend(list(hits))
        else:
            sql += " and (i.title like ? or i.content like ?)"
            args.extend([f"%{query_text}%", f"%{query_text}%"])
        if kind:
            sql += " and i.kind=?"; args.append(kind)
        if owner:
            sql += " and i.owner=?"; args.append(owner)
        if since:
            try:
                since_ts = float(since)
            except ValueError:
                raise HTTPException(400, "since must be a Unix timestamp")
            sql += " and i.updated>=?"; args.append(since_ts)
        if department:
            sql += " and coalesce(km.department,'')=?"; args.append(department)
        if category:
            sql += " and coalesce(km.category,'General')=?"; args.append(category)
        if tag:
            sql += " and km.tags like ?"; args.append("%" + json.dumps(tag, ensure_ascii=False)[1:-1] + "%")
        for row in q(sql + " order by i.updated desc limit ?", args + [limit]):
            item = dict(row)
            permission, shared = pm.get(item["id"], (None, False))
            if permission not in ("view", "edit"):
                continue
            item["perm"] = permission
            item["shared"] = bool(shared and item["owner"] != u["id"])
            try:
                item["tags"] = json.loads(item.pop("tags") or "[]")
            except Exception:
                item["tags"] = []
            item["category"] = item.get("category") or "General"
            item["snip"] = (hits or {}).get(item["id"], "")
            results.append(item)
    results.sort(key=lambda x: x["updated"], reverse=True)
    return results[:limit]


# ============================================================
# DOCUMENT CREATION
# ============================================================

class New(BaseModel):

    ws: str
    kind: str
    title: str = ""
    parent: Optional[str] = None
    template: str = ""


@app.post("/api/items")
def create_item(b: New, u=Depends(me)):

    if member(u, b.ws) == "viewer":

        raise HTTPException(
            403,
            "Viewers cannot create items"
        )

    if b.kind not in (
        "doc",
        "page",
        "folder",
        "board",
        "database"
    ):

        raise HTTPException(
            400,
            "Invalid kind"
        )

    if b.parent:

        p = get_item(
            b.parent,
            u,
            "edit"
        )

        if p["ws"] != b.ws or p["kind"] not in ("folder", "page"):
            raise HTTPException(400, "Invalid parent folder/page")

    template = TPL.get(b.template)

    title = (
        b.title
        or (
            template[0]
            if template
            else {
                "folder": "New folder",
                "board": "New board",
                "database": "New table"
            }.get(b.kind, "Untitled")
        )
    )[:200]

    content = (
        json.dumps(BOARD)
        if b.kind == "board"
        else json.dumps(DBASE)
        if b.kind == "database"
        else template[1]
        if template
        else ""
    )

    i = nid()
    now = time.time()

    q(
        """
        insert into items(
            id,ws,parent,kind,title,content,
            owner,created,updated
        )
        values(?,?,?,?,?,?,?,?,?)
        """,
        (
            i,
            b.ws,
            b.parent or None,
            b.kind,
            title,
            content,
            u["id"],
            now,
            now
        )
    )

    reindex(i)

    log(
        b.ws,
        u["id"],
        f"created {b.kind} '{title}'"
    )

    return {"id": i}


@app.get("/api/items/{iid}")
def read_item(iid: str, u=Depends(me)):

    it = get_item(iid, u)

    it["can_share"] = (
        it["owner"] == u["id"]
        or member(u, it["ws"]) == "admin"
    )

    it["oname"] = q(
        "select name from users where id=?",
        (it["owner"],),
        True
    )["name"]

    return it


# ============================================================
# DOCUMENT UPDATES
# ============================================================

class Upd(BaseModel):

    title: Optional[str] = None
    content: Optional[str] = None
    parent: Optional[str] = None
    private: Optional[bool] = None


@app.put("/api/items/{iid}")
def update_item(iid: str, b: Upd, u=Depends(me)):

    it = get_item(
        iid,
        u,
        "edit"
    )

    fields = b.model_fields_set

    if (
        "content" in fields
        and b.content is not None
        and it["kind"] != "file"
    ):

        content = (
            norm_json(b.content)
            if it["kind"] in JSONK
            else clean(b.content)
        )

        if content != it["content"]:

            snap(it, u["id"])

            q(
                "update items set content=? where id=?",
                (content, iid)
            )

    if "title" in fields and b.title and b.title.strip():

        q(
            "update items set title=? where id=?",
            (b.title.strip()[:200], iid)
        )

    if "parent" in fields:

        if b.parent:

            p = get_item(
                b.parent,
                u,
                "edit"
            )

            if (
                p["ws"] != it["ws"]
                or p["kind"] not in ("folder", "page")
                or b.parent == iid
            ):
                raise HTTPException(400, "Invalid destination folder/page")

            parents = {
                r["id"]: r["parent"]
                for r in q(
                    "select id,parent from items where ws=?",
                    (it["ws"],)
                )
            }

            current = b.parent
            count = 0

            while current and count < 50:

                if current == iid:
                    raise HTTPException(
                        400,
                        "Cannot move an item into itself"
                    )

                current = parents.get(current)
                count += 1

        q(
            "update items set parent=? where id=?",
            (b.parent or None, iid)
        )

    if "private" in fields and b.private is not None:

        if (
            it["owner"] != u["id"]
            and member(u, it["ws"]) != "admin"
        ):

            raise HTTPException(
                403,
                "Only the owner or an admin can change this"
            )

        q(
            "update items set private=? where id=?",
            (1 if b.private else 0, iid)
        )
        log(
            it["ws"],
            u["id"],
            f"privacy changed for '{it['title']}'"
        )

    q(
        "update items set updated=? where id=?",
        (time.time(), iid)
    )

    reindex(iid)

    return {"ok": True}


# ============================================================
# SHARING
# ============================================================

class ShIn(BaseModel):

    email: str = ""
    team: str = ""
    perm: str


@app.get("/api/items/{iid}/shares")
def shares(iid: str, u=Depends(me)):
    item = get_item(iid, u)
    if not can_manage_item_shares(item, u):
        raise HTTPException(403, "Only the owner or a workspace admin can view sharing settings")

    result = [
        dict(x)
        for x in q(
            """
            select u.id uid,u.name,u.email,s.perm
            from shares s
            join users u on u.id=s.uid
            where s.item=?
            order by u.name
            """,
            (iid,)
        )
    ]

    result += [
        {
            "team_id": x["id"],
            "name": "Team: " + x["name"],
            "email": "(team)",
            "perm": x["perm"]
        }
        for x in q(
            """
            select t.id,t.name,s.perm
            from share_teams s
            join teams t on t.id=s.team
            where s.item=?
            order by t.name
            """,
            (iid,)
        )
    ]
    return result


@app.post("/api/items/{iid}/shares")
def add_share(iid: str, b: ShIn, u=Depends(me)):

    it = get_item(iid, u)

    if (
        it["owner"] != u["id"]
        and member(u, it["ws"]) != "admin"
    ):

        raise HTTPException(
            403,
            "Only the owner or an admin can share"
        )

    if b.perm not in ("view", "edit", "none"):

        raise HTTPException(
            400,
            "Invalid permission"
        )

    if b.team:

        t = q(
            "select * from teams where id=? and ws=?",
            (b.team, it["ws"]),
            True
        )

        if not t:
            raise HTTPException(404, "Team not found")

        if b.perm == "none":

            q(
                "delete from share_teams where item=? and team=?",
                (iid, b.team)
            )

        else:

            q(
                "insert or replace into share_teams values(?,?,?)",
                (iid, b.team, b.perm)
            )

    elif b.email:

        x = q(
            "select id from users where email=?",
            (b.email.strip().lower(),),
            True
        )

        if not x:
            raise HTTPException(
                404,
                "User not found. Invite them to the workspace first."
            )

        workspace_membership = q(
            "select 1 from members where ws=? and uid=?",
            (it["ws"], x["id"]),
            True
        )
        if not workspace_membership:
            raise HTTPException(
                400,
                "Share recipient must be a member of this workspace"
            )

        if b.perm == "none":

            q(
                "delete from shares where item=? and uid=?",
                (iid, x["id"])
            )

        else:

            q(
                "insert or replace into shares values(?,?,?)",
                (iid, x["id"], b.perm)
            )

    else:

        raise HTTPException(
            400,
            "Specify an email or team"
        )

    log(
        it["ws"],
        u["id"],
        f"sharing updated for {it['title']} ({b.perm})"
    )

    return {"ok": True}


class ShareRevokeIn(BaseModel):
    email: str = ""
    team: str = ""


@app.delete("/api/items/{iid}/shares")
def revoke_share(iid: str, b: ShareRevokeIn, u=Depends(me)):
    item = get_item(iid, u)
    if not can_manage_item_shares(item, u):
        raise HTTPException(403, "Only the owner or a workspace admin can revoke sharing")

    if bool(b.email.strip()) == bool(b.team.strip()):
        raise HTTPException(400, "Specify exactly one email or team")

    if b.email.strip():
        target = q(
            "select id from users where email=?",
            (b.email.strip().lower(),),
            True
        )
        if target:
            q("delete from shares where item=? and uid=?", (iid, target["id"]))
    else:
        team = q(
            "select id from teams where id=? and ws=?",
            (b.team.strip(), item["ws"]),
            True
        )
        if not team:
            raise HTTPException(404, "Team not found")
        q("delete from share_teams where item=? and team=?", (iid, team["id"]))

    log(item["ws"], u["id"], f"sharing revoked for '{item['title']}'")
    return {"ok": True}


# ============================================================
# PART 3/3 — TRASH, FAVOURITES, HISTORY, COMMENTS, FILES,
# EXPORT, REALTIME COLLABORATION AND HEALTH
# ============================================================

# ---------- TRASH & RESTORE ----------

def _settrash(i, on):
    q("update items set trashed=? where id=?", (on, i))

    children = q(
        "select id from items where parent=?",
        (i,)
    )

    for child in children:
        _settrash(child["id"], on)


class Tr(BaseModel):
    on: int = 1


@app.post("/api/items/{iid}/trash")
def trash(iid: str, b: Tr, u=Depends(me)):
    it = get_item(iid, u, "edit")

    _settrash(iid, 1 if b.on else 0)

    log(
        it["ws"],
        u["id"],
        f"{'trashed' if b.on else 'restored'} '{it['title']}'"
    )

    return {"ok": True}


def _purge(i):
    children = q(
        "select id from items where parent=?",
        (i,)
    )

    for child in children:
        _purge(child["id"])

    r = q(
        "select fname from items where id=?",
        (i,),
        True
    )

    if r and r["fname"]:
        try:
            os.remove(os.path.join(D, "files", i))
        except OSError:
            pass

    for table in (
        "versions",
        "shares",
        "share_teams",
        "comments",
        "favs",
        "knowledge_meta"
    ):
        q(f"delete from {table} where item=?", (i,))

    q("delete from items where id=?", (i,))

    reindex(i)


@app.delete("/api/items/{iid}")
def delete_item(iid: str, u=Depends(me)):
    it = get_item(iid, u, "edit")

    if not it["trashed"]:
        raise HTTPException(
            400,
            "Move to trash first"
        )

    _purge(iid)

    log(
        it["ws"],
        u["id"],
        f"deleted '{it['title']}'"
    )

    return {"ok": True}


# ---------- FAVOURITES ----------

@app.post("/api/items/{iid}/fav")
def fav(iid: str, u=Depends(me)):
    get_item(iid, u)

    existing = q(
        "select 1 from favs where uid=? and item=?",
        (u["id"], iid),
        True
    )

    if existing:
        q(
            "delete from favs where uid=? and item=?",
            (u["id"], iid)
        )
    else:
        q(
            "insert into favs values(?,?)",
            (u["id"], iid)
        )

    return {"ok": True}


# ---------- VERSION HISTORY ----------

@app.get("/api/items/{iid}/versions")
def versions(iid: str, u=Depends(me)):
    get_item(iid, u)

    result = q(
        """
        select
            v.id,
            v.ts,
            u.name
        from versions v
        join users u on u.id=v.uid
        where v.item=?
        order by v.id desc
        """,
        (iid,)
    )

    return [dict(r) for r in result]


@app.post("/api/versions/{vid}/restore")
def restore(vid: int, u=Depends(me)):
    version = q(
        "select * from versions where id=?",
        (vid,),
        True
    )

    if not version:
        raise HTTPException(404, "Version not found")

    item = get_item(
        version["item"],
        u,
        "edit"
    )

    # Save current content before restoring
    q(
        """
        insert into versions(item,content,uid,ts)
        values(?,?,?,?)
        """,
        (
            item["id"],
            item["content"],
            u["id"],
            time.time()
        )
    )

    q(
        "update items set content=?,updated=? where id=?",
        (
            version["content"],
            time.time(),
            item["id"]
        )
    )

    reindex(item["id"])

    log(
        item["ws"],
        u["id"],
        f"restored version of '{item['title']}'"
    )

    return {"ok": True}


# ---------- COMMENTS ----------

class Cm(BaseModel):
    text: str


@app.get("/api/items/{iid}/comments")
def comments(iid: str, u=Depends(me)):
    get_item(iid, u)

    result = q(
        """
        select
            c.id,
            c.text,
            c.ts,
            u.name
        from comments c
        join users u on u.id=c.uid
        where c.item=?
        order by c.id
        """,
        (iid,)
    )

    return [dict(r) for r in result]


@app.post("/api/items/{iid}/comments")
def add_comment(iid: str, b: Cm, u=Depends(me)):
    get_item(iid, u)

    text = b.text.strip()

    if text:
        q(
            """
            insert into comments(item,uid,text,ts)
            values(?,?,?,?)
            """,
            (
                iid,
                u["id"],
                text[:2000],
                time.time()
            )
        )

        reindex(iid)

    return {"ok": True}


# ---------- FILE MANAGEMENT ----------

ALLOWED = {
    "pdf",
    "docx",
    "xlsx",
    "pptx",
    "csv",
    "txt",
    "md",
    "png",
    "jpg",
    "jpeg",
    "gif",
    "webp"
}


MIMES = {
    "pdf": "application/pdf",
    "csv": "text/csv",
    "txt": "text/plain",
    "md": "text/plain",
    "png": "image/png",
    "jpg": "image/jpeg",
    "jpeg": "image/jpeg",
    "gif": "image/gif",
    "webp": "image/webp"
}


def extract(ext, data):
    try:

        if ext in ("txt", "csv", "md"):
            text = data.decode(
                "utf-8",
                "ignore"
            )

        elif ext == "docx":
            from docx import Document

            document = Document(
                io.BytesIO(data)
            )

            text = " ".join(
                [p.text for p in document.paragraphs]
                +
                [
                    cell.text
                    for table in document.tables
                    for row in table.rows
                    for cell in row.cells
                ]
            )

        elif ext == "pdf":
            from pypdf import PdfReader

            reader = PdfReader(
                io.BytesIO(data)
            )

            text = " ".join(
                (page.extract_text() or "")
                for page in reader.pages[:200]
            )

        elif ext == "xlsx":
            import openpyxl

            workbook = openpyxl.load_workbook(
                io.BytesIO(data),
                read_only=True,
                data_only=True
            )

            text = " ".join(
                str(cell)
                for sheet in workbook
                for row in sheet.iter_rows(values_only=True)
                for cell in row
                if cell is not None
            )

        elif ext == "pptx":
            from pptx import Presentation

            presentation = Presentation(
                io.BytesIO(data)
            )

            text = " ".join(
                shape.text_frame.text
                for slide in presentation.slides
                for shape in slide.shapes
                if shape.has_text_frame
            )

        else:
            text = ""

        return text[:300000]

    except Exception:
        return ""


@app.post("/api/upload")
async def upload(
    ws: str,
    parent: str = "",
    f: UploadFile = File(...),
    u=Depends(me)
):

    if member(u, ws) == "viewer":
        raise HTTPException(403, "Viewers cannot upload")

    if parent:
        parent_item = get_item(
            parent,
            u,
            "edit"
        )

        if (
            parent_item["ws"] != ws
            or parent_item["kind"] not in ("folder", "page")
        ):
            raise HTTPException(400, "Invalid destination folder/page")

    ext = (
        f.filename.rsplit(".", 1)[-1]
        if "." in f.filename
        else ""
    ).lower()

    if ext not in ALLOWED:
        raise HTTPException(
            400,
            "File type not allowed"
        )

    data = await f.read()

    if len(data) > MAX_MB * 1024 * 1024:
        raise HTTPException(
            400,
            f"File is larger than {MAX_MB} MB"
        )

    item_id = nid()
    now = time.time()
    filename = os.path.basename(f.filename)

    file_path = os.path.join(
        D,
        "files",
        item_id
    )

    with open(file_path, "wb") as file:
        file.write(data)

    q(
        """
        insert into items(
            id,ws,parent,kind,title,content,owner,
            fname,size,mime,created,updated
        )
        values(?,?,?,?,?,?,?,?,?,?,?,?)
        """,
        (
            item_id,
            ws,
            parent or None,
            "file",
            filename,
            extract(ext, data),
            u["id"],
            filename,
            len(data),
            MIMES.get(
                ext,
                "application/octet-stream"
            ),
            now,
            now
        )
    )

    reindex(item_id)

    log(
        ws,
        u["id"],
        f"uploaded '{filename}'"
    )

    return {"id": item_id}


# ---------- DOWNLOAD ----------

@app.get("/api/items/{iid}/download")
def download(
    iid: str,
    dl: int = 0,
    u=Depends(me)
):

    item = get_item(iid, u)

    if item["kind"] != "file":
        raise HTTPException(
            400,
            "Not a file"
        )

    filename = re.sub(
        r'[^\w. -]',
        "_",
        item["fname"]
    )

    return FileResponse(
        os.path.join(D, "files", iid),
        media_type=item["mime"],
        headers={
            "Content-Disposition":
            f'{"attachment" if dl else "inline"}; filename="{filename}"'
        }
    )


# ---------- OFFICE FILE PREVIEW ----------

@app.get("/api/items/{iid}/preview")
def preview(iid: str, u=Depends(me)):
    """
    Permission-aware, bounded previews for common workspace file types.
    Returns HTML fragments because the existing File Manager consumes {html}.
    """
    item = get_item(iid, u)

    if item["kind"] != "file":
        raise HTTPException(400, "Only uploaded files can be previewed")

    # Use the stored display filename; never accept a client-supplied path.
    filename = (item.get("fname") or item.get("title") or "").strip()
    ext = os.path.splitext(filename)[1].lower().lstrip(".")
    if not ext:
        ext = os.path.splitext(item.get("title") or "")[1].lower().lstrip(".")

    file_path = os.path.join(D, "files", iid)
    if not os.path.isfile(file_path):
        raise HTTPException(404, "Stored file not found")

    # Avoid loading unexpectedly large office/text files into memory.
    try:
        max_preview_mb = int(E("MAX_PREVIEW_MB", "25"))
    except (TypeError, ValueError):
        max_preview_mb = 25
    max_preview_mb = max(1, min(max_preview_mb, 100))
    if os.path.getsize(file_path) > max_preview_mb * 1024 * 1024:
        raise HTTPException(
            413,
            f"Preview is limited to {max_preview_mb} MB. Download the file instead."
        )

    with open(file_path, "rb") as handle:
        data = handle.read()

    escape = H.escape
    table_style = (
        "border-collapse:collapse;width:100%;margin:10px 0;"
        "font-size:13px"
    )
    cell_style = (
        "border:1px solid #d8dee8;padding:7px 9px;"
        "text-align:left;vertical-align:top;overflow-wrap:anywhere"
    )

    def html_table(rows, first_row_header=True):
        rendered = [f"<table style='{table_style}'>"]
        for row_index, row in enumerate(rows):
            rendered.append("<tr>")
            tag = "th" if first_row_header and row_index == 0 else "td"
            for value in row:
                text = "" if value is None else str(value)
                rendered.append(
                    f"<{tag} style='{cell_style}'>{escape(text)}</{tag}>"
                )
            rendered.append("</tr>")
        rendered.append("</table>")
        return "".join(rendered)

    try:
        if ext == "xlsx":
            import openpyxl

            workbook = openpyxl.load_workbook(
                io.BytesIO(data),
                read_only=True,
                data_only=True
            )
            try:
                output = [
                    "<div class='ps-preview ps-spreadsheet'>",
                    "<p><strong>Spreadsheet preview</strong> "
                    f"<span>({min(len(workbook.worksheets), 5)} of "
                    f"{len(workbook.worksheets)} sheets shown)</span></p>"
                ]

                for sheet in workbook.worksheets[:5]:
                    output.append(f"<h4>{escape(sheet.title)}</h4>")
                    rows = []
                    for row_number, row in enumerate(
                        sheet.iter_rows(values_only=True)
                    ):
                        if row_number >= 200:
                            break
                        rows.append([
                            "" if value is None else str(value)
                            for value in row[:30]
                        ])
                    if rows:
                        output.append(html_table(rows, first_row_header=True))
                    else:
                        output.append("<p><em>This sheet is empty.</em></p>")

                output.append("</div>")
                return {"html": "".join(output), "type": "xlsx"}
            finally:
                workbook.close()

        if ext == "docx":
            from docx import Document
            from docx.text.paragraph import Paragraph
            from docx.table import Table

            document = Document(io.BytesIO(data))
            output = [
                "<div class='ps-preview ps-document'>",
                f"<h3>{escape(item.get('title') or filename)}</h3>"
            ]
            paragraph_count = 0
            table_count = 0

            # Iterate document body children to preserve paragraph/table order.
            for child in document.element.body.iterchildren():
                tag = child.tag.rsplit("}", 1)[-1]

                if tag == "p":
                    paragraph = Paragraph(child, document)
                    text = paragraph.text or ""
                    if not text.strip():
                        continue

                    style_name = (paragraph.style.name or "").lower() if paragraph.style else ""
                    heading_match = re.search(r"heading\s*([1-6])", style_name)
                    if heading_match:
                        level = min(int(heading_match.group(1)), 4)
                        output.append(f"<h{level}>{escape(text)}</h{level}>")
                    elif "title" in style_name:
                        output.append(f"<h2>{escape(text)}</h2>")
                    elif "subtitle" in style_name:
                        output.append(f"<h4>{escape(text)}</h4>")
                    elif "list" in style_name:
                        output.append(
                            f"<p style='padding-left:18px'>• {escape(text)}</p>"
                        )
                    elif "quote" in style_name:
                        output.append(
                            f"<blockquote>{escape(text)}</blockquote>"
                        )
                    else:
                        output.append(f"<p>{escape(text)}</p>")

                    paragraph_count += 1
                    if paragraph_count >= 500:
                        output.append("<p><em>Preview truncated after 500 paragraphs.</em></p>")
                        break

                elif tag == "tbl":
                    table = Table(child, document)
                    rows = []
                    for row in table.rows[:200]:
                        rows.append([cell.text for cell in row.cells[:30]])
                    if rows:
                        output.append(html_table(rows, first_row_header=False))
                    table_count += 1
                    if table_count >= 100:
                        output.append("<p><em>Preview truncated after 100 tables.</em></p>")
                        break

            output.append("</div>")
            return {"html": "".join(output), "type": "docx"}

        if ext == "pptx":
            from pptx import Presentation

            presentation = Presentation(io.BytesIO(data))
            output = [
                "<div class='ps-preview ps-presentation'>",
                f"<p><strong>Presentation preview:</strong> "
                f"{len(presentation.slides)} slides</p>"
            ]

            for number, slide in enumerate(list(presentation.slides)[:100], 1):
                output.append(
                    "<section style='border:1px solid #d8dee8;"
                    "border-radius:8px;padding:12px;margin:12px 0'>"
                    f"<h4>Slide {number}</h4>"
                )
                shape_texts = []
                for shape in slide.shapes:
                    if getattr(shape, "has_text_frame", False):
                        text = shape.text_frame.text.strip()
                        if text:
                            shape_texts.append(text)
                    elif getattr(shape, "has_table", False):
                        ppt_table = shape.table
                        rows = [
                            [cell.text for cell in row.cells[:30]]
                            for row in list(ppt_table.rows)[:100]
                        ]
                        if rows:
                            output.append(html_table(rows, first_row_header=True))

                if shape_texts:
                    output.extend(
                        f"<p>{escape(text).replace(chr(10), '<br>')}</p>"
                        for text in shape_texts[:100]
                    )
                else:
                    output.append("<p><em>No text content on this slide.</em></p>")

                output.append("</section>")

            if len(presentation.slides) > 100:
                output.append("<p><em>Preview limited to the first 100 slides.</em></p>")

            output.append(
                "<p class='muted'><em>Text and tables are extracted. "
                "PowerPoint animations and exact slide layout are not rendered.</em></p>"
            )
            output.append("</div>")
            return {"html": "".join(output), "type": "pptx"}

        if ext == "csv":
            import csv

            text = data.decode("utf-8-sig", errors="replace")
            sample = text[:8192]
            try:
                dialect = csv.Sniffer().sniff(sample, delimiters=",;\t|")
            except csv.Error:
                dialect = csv.excel

            reader = csv.reader(io.StringIO(text), dialect)
            rows = []
            for row_number, row in enumerate(reader):
                if row_number >= 250:
                    break
                rows.append([cell[:2000] for cell in row[:30]])

            output = ["<div class='ps-preview ps-csv'>"]
            if rows:
                output.append(html_table(rows, first_row_header=True))
            else:
                output.append("<p><em>CSV file is empty.</em></p>")
            if len(rows) >= 250:
                output.append("<p><em>Preview limited to 250 rows and 30 columns.</em></p>")
            output.append("</div>")
            return {"html": "".join(output), "type": "csv"}

        if ext in ("txt", "md", "json", "log", "xml"):
            text = data.decode("utf-8-sig", errors="replace")
            if ext == "json":
                try:
                    text = json.dumps(
                        json.loads(text),
                        ensure_ascii=False,
                        indent=2
                    )
                except (ValueError, TypeError):
                    pass

            # Bound the rendered text and escape all user-controlled content.
            truncated = len(text) > 200_000
            text = text[:200_000]
            output = (
                "<div class='ps-preview ps-text'>"
                "<pre style='white-space:pre-wrap;overflow-wrap:anywhere;"
                "max-height:65vh;overflow:auto'>"
                f"{escape(text)}</pre>"
            )
            if truncated:
                output += "<p><em>Preview truncated at 200,000 characters.</em></p>"
            output += "</div>"
            return {"html": output, "type": ext}

    except HTTPException:
        raise
    except Exception as exc:
        # Keep parser/library details out of the client response.
        raise HTTPException(
            400,
            f"Could not preview this {ext.upper() or 'file'} file. "
            "The file may be damaged or use unsupported features."
        ) from exc

    raise HTTPException(
        415,
        "Preview is not supported for this file type. Download the file instead."
    )


# ---------- DOCUMENT EXPORT ----------

@app.get("/api/items/{iid}/export")
def export(
    iid: str,
    fmt: str = "pdf",
    u=Depends(me)
):

    item = get_item(iid, u)

    if item["kind"] not in ("doc", "page"):
        raise HTTPException(
            400,
            "Only documents and pages can be exported"
        )

    import export as X

    safe_name = re.sub(
        r"[^\w.-]",
        "_",
        item["title"]
    ) or "document"

    if fmt == "docx":

        data = X.build_docx(
            item["title"],
            item["content"]
        )

        media_type = (
            "application/vnd.openxmlformats-officedocument."
            "wordprocessingml.document"
        )

    elif fmt == "pdf":

        data = X.build_pdf(
            item["title"],
            item["content"]
        )

        media_type = "application/pdf"

    else:
        raise HTTPException(
            400,
            "fmt must be pdf or docx"
        )

    return StreamingResponse(
        io.BytesIO(data),
        media_type=media_type,
        headers={
            "Content-Disposition":
            f'attachment; filename="{safe_name}.{fmt}"'
        }
    )


# ---------- REAL-TIME COLLABORATION ----------

rooms = {}


@app.websocket("/ws/{iid}")
async def collab(sock: WebSocket, iid: str, token: str = ""):
    await sock.accept()

    user = user_by_token(token)
    item = q("select * from items where id=?", (iid,), True)
    permission = (
        perm(dict(user), dict(item))
        if user and item
        else None
    )
    if permission not in ("view", "edit"):
        await sock.close(4403)
        return

    room = rooms.setdefault(iid, {})
    room[sock] = {"name": user["name"], "token": token}

    async def presence():
        names = sorted({
            info["name"]
            for info in room.values()
        })
        for connection in list(room):
            try:
                await connection.send_json({"t": "presence", "users": names})
            except Exception:
                room.pop(connection, None)

    await presence()

    try:
        while True:
            message = await sock.receive_json()

            # Re-check membership, token and permissions on every message.
            current_user = user_by_token(token)
            current_item = q("select * from items where id=?", (iid,), True)
            current_permission = (
                perm(dict(current_user), dict(current_item))
                if current_user and current_item
                else None
            )
            if current_permission not in ("view", "edit"):
                room.pop(sock, None)
                await sock.close(4403)
                break

            if message.get("t") == "content" and current_permission == "edit":
                html = message.get("html", "")
                if not isinstance(html, str) or len(html) > 2_000_000:
                    continue

                if current_item["kind"] in JSONK:
                    try:
                        html = norm_json(html)
                    except HTTPException:
                        continue
                else:
                    html = clean(html)

                for connection in list(room):
                    if connection is sock:
                        continue

                    # Do not send updates to sockets whose access was revoked.
                    peer_info = room.get(connection)
                    peer_user = user_by_token(peer_info["token"]) if peer_info else None
                    peer_item = q("select * from items where id=?", (iid,), True)
                    peer_permission = (
                        perm(dict(peer_user), dict(peer_item))
                        if peer_user and peer_item
                        else None
                    )
                    if peer_permission not in ("view", "edit"):
                        room.pop(connection, None)
                        try:
                            await connection.close(4403)
                        except Exception:
                            pass
                        continue

                    try:
                        await connection.send_json({
                            "t": "content",
                            "html": html,
                            "by": current_user["name"]
                        })
                    except Exception:
                        room.pop(connection, None)

    except (WebSocketDisconnect, Exception):
        pass
    finally:
        room.pop(sock, None)
        if not room:
            rooms.pop(iid, None)
        await presence()


# ---------- HEALTH CHECK ----------

@app.get("/api/health")
def health():

    return {
        "ok": True,
        "fts": FTS,
        "sanitizer": (
            "nh3"
            if nh3
            else "fallback"
        ),
        "smtp": bool(E("SMTP_HOST"))
    }

# ---------- STATIC ASSETS ----------

app.mount(
    "/static",
    StaticFiles(directory=os.path.join(BASE, "static")),
    name="static"
)


# ---------- FRONTEND ----------

@app.get("/")
def index():

    return FileResponse(
        os.path.join(
            BASE,
            "static",
            "index.html"
        )
    )


# ============================================================
# END OF PAWANSPACE BACKEND
# ============================================================