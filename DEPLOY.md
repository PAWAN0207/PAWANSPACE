# Deployment guide

## 1. Local (no Docker)
Windows: double-click `run.bat`. Mac/Linux: `./run.sh`. Open http://localhost:8000.

## 2. Settings (.env) - optional
Copy `.env.example` to `.env` in the same folder as `main.py`, edit, restart.
No API key is required for any feature. Only two things are optional:
| Feature | Variables |
|---|---|
| Invite emails | `SMTP_HOST SMTP_PORT SMTP_USER SMTP_PASS SMTP_FROM` (Gmail: use an App Password) |
| Hindi in PDF export | `FONT_PATH` = path to a Unicode .ttf (Windows: auto) |
Without SMTP, invites are saved and the person joins automatically when they register with that email.

## 3. Docker
```
docker compose up -d --build            # http://localhost:8000
docker compose --profile https up -d    # automatic HTTPS (set DOMAIN in .env, ports 80/443 open)
```
Data lives in `./data` (SQLite + uploaded files).

## 4. Backup / restore
Stop the app and copy the `data` folder. To restore, put it back.

## 5. Security checklist for real use
- Serve over HTTPS (Caddy profile above). Set `APP_URL` to the https address.
- Sessions expire after `TOKEN_DAYS` (default 7). Logout deletes the session on the server.
- Login is limited to 5 failures / 15 min per email+IP. Passwords: PBKDF2-SHA256, min 8 chars.
- Editor HTML is sanitised with `nh3` (allow-list). Security headers + CSP are on.
- Every API call checks permission on the server.
- Single process / SQLite: fine for a team of ~50. For more, move to PostgreSQL + Redis (not included).

## 6. Architecture
```
Browser (static/index.html)  --REST-->  FastAPI (main.py)  -->  SQLite (data/app.db, FTS5 index)
        \--WebSocket /ws/{id}-->  rooms (live content + presence)  -->  data/files (uploads)
export.py: HTML -> DOCX/PDF
```
Permission order for an item: owner/admin -> edit; else best of (direct share, team share,
share on any parent folder/page) and workspace default (editor=edit, viewer=view) unless the item
or any parent is "Restricted".
