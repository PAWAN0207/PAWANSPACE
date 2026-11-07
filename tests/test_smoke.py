import os, sys, tempfile, json
os.environ["DATA_DIR"] = tempfile.mkdtemp()
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
from fastapi.testclient import TestClient
import main
from main import app
c = TestClient(app)

def reg(e):
    r = c.post("/api/register", json={"email": e, "password": "secret123"}); assert r.status_code == 200, r.text
    return {"Authorization": "Bearer " + r.json()["token"]}

def test_full_flow():
    a, b, o = reg("a@x.com"), reg("b@x.com"), reg("o@x.com")
    w = c.post("/api/ws", json={"name": "T"}, headers=a).json()["id"]
    assert c.post(f"/api/ws/{w}/members", json={"email": "b@x.com", "role": "viewer"}, headers=a).status_code == 200
    d = c.post("/api/items", json={"ws": w, "kind": "doc", "template": "meeting"}, headers=a).json()["id"]
    html = '<h1>Budget plan</h1><script>x()</script><p onclick="y()"><b>bold</b> <a href="javascript:alert(1)">bad</a> <a href="https://ok.com">ok</a></p><table><tr><td>c1</td><td>c2</td></tr></table>'
    assert c.put(f"/api/items/{d}", json={"content": html}, headers=a).status_code == 200
    got = c.get(f"/api/items/{d}", headers=b).json()["content"]
    assert "script" not in got and "onclick" not in got and "javascript:" not in got and "https://ok.com" in got
    assert c.put(f"/api/items/{d}", json={"content": "z"}, headers=b).status_code == 403
    assert c.get(f"/api/items/{d}", headers=o).status_code == 403
    c.put(f"/api/items/{d}", json={"content": html, "private": True}, headers=a)
    assert c.get(f"/api/items/{d}", headers=b).status_code == 403
    assert c.post(f"/api/items/{d}/shares", json={"email": "b@x.com", "perm": "view"}, headers=a).status_code == 200
    assert c.get(f"/api/items/{d}", headers=b).status_code == 200
    # export keeps formatting
    pdf = c.get(f"/api/items/{d}/export?fmt=pdf", headers=a).content; assert pdf[:4] == b"%PDF"
    dx = c.get(f"/api/items/{d}/export?fmt=docx", headers=a).content; assert dx[:2] == b"PK"
    import io, docx
    D = docx.Document(io.BytesIO(dx)); assert len(D.tables) == 1 and any(r.bold for p in D.paragraphs for r in p.runs)
    # files + FTS snippets
    r = c.post(f"/api/upload?ws={w}", files={"f": ("notes.txt", b"quarterly revenue report")}, headers=a); assert r.status_code == 200
    res = c.get(f"/api/items?ws={w}&q=reven", headers=a).json()
    assert len(res) == 1 and "\x02" in res[0]["snip"]
    assert c.get(f"/api/items?ws={w}&q=budget", headers=a).json()[0]["id"] == d
    # trash + delete
    assert c.post(f"/api/items/{d}/trash", json={"on": 1}, headers=a).status_code == 200
    assert c.delete(f"/api/items/{d}", headers=a).status_code == 200
    assert c.get(f"/api/items?ws={w}&q=budget&trashed=all", headers=a).json() == []

def test_teams_inheritance_boards():
    a, b = reg("ta@x.com"), reg("tb@x.com")
    w = c.post("/api/ws", json={"name": "T"}, headers=a).json()["id"]
    c.post(f"/api/ws/{w}/members", json={"email": "tb@x.com", "role": "editor"}, headers=a)
    f = c.post("/api/items", json={"ws": w, "kind": "folder", "title": "Secret"}, headers=a).json()["id"]
    p = c.post("/api/items", json={"ws": w, "kind": "page", "parent": f}, headers=a).json()["id"]
    c.put(f"/api/items/{f}", json={"private": True}, headers=a)
    assert c.get(f"/api/items/{p}", headers=b).status_code == 403          # restricted parent hides child
    t = c.post(f"/api/ws/{w}/teams", json={"name": "Sales"}, headers=a).json()["id"]
    assert c.post(f"/api/teams/{t}/members", json={"email": "tb@x.com"}, headers=a).status_code == 200
    assert c.post(f"/api/items/{f}/shares", json={"team": t, "perm": "view"}, headers=a).status_code == 200
    assert c.get(f"/api/items/{p}", headers=b).json()["perm"] == "view"    # inherited via team on parent
    assert c.put(f"/api/items/{p}", json={"title": "x"}, headers=b).status_code == 403
    assert any(i["id"] == p and i["shared"] for i in c.get(f"/api/items?ws={w}", headers=b).json())
    bd = c.post("/api/items", json={"ws": w, "kind": "board"}, headers=a).json()["id"]
    data = {"columns": [{"id": "z", "title": "Launch", "cards": [{"id": "k", "t": "ship it"}]}]}
    assert c.put(f"/api/items/{bd}", json={"content": json.dumps(data)}, headers=a).status_code == 200
    assert c.put(f"/api/items/{bd}", json={"content": "not json"}, headers=a).status_code == 400
    assert c.get(f"/api/items?ws={w}&q=ship", headers=a).json()[0]["id"] == bd   # board content searchable
    db_ = c.post("/api/items", json={"ws": w, "kind": "database"}, headers=a).json()["id"]
    assert json.loads(c.get(f"/api/items/{db_}", headers=a).json()["content"])["cols"]
    with c.websocket_connect(f"/ws/{bd}?token=" + a["Authorization"][7:]) as s:
        assert s.receive_json()["t"] == "presence"

def test_rate_limit_and_logout():
    h = reg("rl@x.com")
    for _ in range(5):
        assert c.post("/api/login", json={"email": "rl@x.com", "password": "wrongpass1"}).status_code == 400
    assert c.post("/api/login", json={"email": "rl@x.com", "password": "secret123"}).status_code == 429
    assert c.get("/api/me", headers=h).status_code == 200
    c.post("/api/logout", headers=h)
    assert c.get("/api/me", headers=h).status_code == 401
    assert main.nh3 is not None and main.FTS
