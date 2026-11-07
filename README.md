<div align="center">

# PAWANSPACE

### One workspace. Every document. Better collaboration.

**A Collaborative Team Workspace & Document Management Platform**

Organize team knowledge, manage files, and collaborate on documents in one place.

![Python](https://img.shields.io/badge/Python-FastAPI-3776AB?logo=python&logoColor=white)
![JavaScript](https://img.shields.io/badge/Frontend-Vanilla%20JavaScript-F7DF1E?logo=javascript&logoColor=black)
![Real-time](https://img.shields.io/badge/Collaboration-Yjs%20%7C%20Hocuspocus-6C5CE7)
![Database](https://img.shields.io/badge/Database-SQLite-003B57?logo=sqlite&logoColor=white)
![Status](https://img.shields.io/badge/Status-Development-orange)

</div>

PAWANSPACE is a web-based team workspace built to bring documents, files, and collaboration together. The platform combines a **FastAPI backend**, a lightweight browser-based interface, and a dedicated **Yjs/Hocuspocus real-time collaboration service**.

> **Project status:** Under active development. Review the configuration and deployment notes before exposing the application to the public internet.

---

## Dashboard Preview

![PAWANSPACE Dashboard](docs/screenshots/dashboard.png)


---

## Overview

PAWANSPACE brings essential team workspace and document-management capabilities into one application:

- A centralized workspace dashboard.
- Document creation and organization.
- File upload and management.
- Document sharing and role-based access.
- Real-time collaborative editing powered by Yjs and Hocuspocus.
- User authentication and session-based access.
- Export support through the application.

The application is composed of two services:

| Service | Technology | Local address | Responsibility |
|---|---|---|---|
| Web application / API | FastAPI, Python, SQLite | `http://localhost:8000` | Authentication, workspace and document APIs, file operations, and serving the web interface |
| Collaboration server | Node.js, Hocuspocus, Yjs | `ws://127.0.0.1:1234` | Real-time collaborative document updates and CRDT persistence |

The collaboration service communicates with the FastAPI application to validate collaboration tickets and access.

## System Architecture

PAWANSPACE uses a **two-service architecture**. The application layer is powered by FastAPI, while real-time document collaboration runs independently through a Node.js and Hocuspocus service. The browser interface connects to both services depending on the action being performed.

### High-level architecture

```mermaid
flowchart TB
    subgraph CLIENT["1. Client Layer"]
        USER["Team Members"]
        BROWSER["Web Browser"]
        UI["PAWANSPACE Web Interface<br/>HTML · CSS · JavaScript"]
        EDITOR["Tiptap Editor"]
        USER --> BROWSER --> UI
        UI --> EDITOR
    end

    subgraph APP["2. Application Layer"]
        API["FastAPI Application<br/>Python · Uvicorn"]
        AUTH["Authentication<br/>Sessions · Access Validation"]
        WORKSPACE["Workspace & Document APIs"]
        FILEAPI["File Management APIs"]
        API --> AUTH
        API --> WORKSPACE
        API --> FILEAPI
    end

    subgraph COLLAB["3. Real-time Collaboration Layer"]
        WS["Hocuspocus Server<br/>Node.js · WebSocket"]
        YJS["Yjs CRDT<br/>Shared Document State"]
        TICKET["Collaboration Ticket<br/>Validation"]
        WS <--> YJS
        WS --> TICKET
    end

    subgraph DATA["4. Persistence Layer"]
        APPDB[("Main SQLite Database<br/>Users · Workspaces · Metadata")]
        FILES[("File Storage<br/>Uploaded Documents")]
        CRDTDB[("Collaboration SQLite Database<br/>Persisted Yjs State")]
    end

    subgraph BUILD["5. Frontend Build"]
        VITE["Vite Build Tool"]
        BUNDLE["Generated CRDT Client Bundle"]
        VITE --> BUNDLE
    end

    UI <-->|"HTTP / REST API"| API
    API --> APPDB
    FILEAPI --> FILES
    UI <-->|"WebSocket updates"| WS
    EDITOR <--> YJS
    TICKET -->|"Validate ticket / permissions"| API
    WS --> CRDTDB
    BUNDLE -.->|"Included in web interface"| UI
```

### How the components work together

| Stage | Component | What happens |
|---|---|---|
| 1. User access | Browser interface | Team members open PAWANSPACE and interact with the workspace dashboard and document interface. |
| 2. Application requests | FastAPI | The frontend sends HTTP requests for authentication, workspace data, document operations, and file management. |
| 3. Application data | Main SQLite database | FastAPI reads and writes application records, user information, workspace data, and document metadata. |
| 4. File operations | File storage | Uploaded files are stored and accessed through the application's file-management flow. |
| 5. Collaboration session | Hocuspocus | When a user enters a collaborative document, the browser establishes a WebSocket connection to the collaboration server. |
| 6. Live synchronization | Yjs + Tiptap | Yjs maintains shared document state and synchronizes updates between connected editing clients. Tiptap provides the editor components. |
| 7. Access validation | Signed collaboration ticket | The collaboration server asks the FastAPI application to validate the ticket and relevant access before allowing a collaboration session. |
| 8. Collaboration persistence | Collaboration SQLite database | The Hocuspocus SQLite extension persists collaboration data separately from the main application database. |
| 9. Frontend build | Vite | Vite builds the collaboration client bundle that is served with the web interface. |

### Service boundaries

| Service / component | Responsibility | Local endpoint / storage |
|---|---|---|
| FastAPI application | Authentication, application APIs, workspace and document operations, file handling | `http://localhost:8000` |
| Hocuspocus collaboration server | WebSocket connections and real-time collaboration sessions | `ws://127.0.0.1:1234` |
| Main application database | User, workspace, document, and application metadata | `data/app.db` |
| File storage | Uploaded workspace files | `data/files/` |
| Collaboration database | Persisted collaborative document state | `collaboration/data/crdt.sqlite` |
| Vite build output | Browser collaboration client bundle | `static/assets/crdt/crdt.js` |

> **Architecture note:** The main application database and collaboration database are separate by design. FastAPI remains responsible for application-level access checks, while Hocuspocus manages the live collaboration connection and Yjs document synchronization.

---

## Key Capabilities

### Workspace and documents
- Workspace dashboard and document navigation.
- Create and manage documents.
- Rename, duplicate, move, and delete documents where enabled by the application.
- Restore support where available in the application interface.

### File management
- Upload and manage workspace files.
- Preview, download, and delete supported files.
- File upload size is configurable through `MAX_UPLOAD_MB`.

### Collaboration
- Real-time document synchronization using **Yjs CRDT**.
- Hocuspocus WebSocket collaboration server.
- Tiptap-based collaborative editor components.
- Persistent collaboration data stored separately from the main application database.

### Access and security
- Authenticated API access.
- Document/workspace roles such as administrator, editor, and viewer, as implemented by the application.
- Signed collaboration tickets validated by the collaboration service.
- Environment-based configuration for secrets and service URLs.

### Export
- Document export functionality provided by the application.
- Hindi PDF font configuration can be supplied through `FONT_PATH` when required.

> Feature availability depends on the current application configuration and implementation. This README describes the project structure and configured capabilities; it is not a third-party security or production-readiness certification.

---

## Technology Stack

| Layer | Technologies | Purpose |
|---|---|---|
| Backend | **Python**, **FastAPI**, **Uvicorn** | REST APIs, authentication, workspace and document operations |
| Main data storage | **SQLite** | Application records and metadata |
| Frontend | **HTML5**, **CSS3**, **JavaScript** | Browser-based workspace interface |
| Real-time server | **Node.js**, **Hocuspocus** | WebSocket connections and collaborative sessions |
| Collaboration engine | **Yjs (CRDT)** | Synchronizes shared document changes between collaborators |
| Rich-text editing | **Tiptap** | Editor extensions and collaborative editing components |
| Frontend build | **Vite** | Builds the collaboration frontend bundle |
| Collaboration persistence | **SQLite** via Hocuspocus extension | Stores collaboration state |
| Package management | **pip**, **npm** | Python and Node.js dependency management |
| Version control | **Git**, **GitHub** | Source control and project hosting |
| Container configuration | **Docker**, **Docker Compose** | Container-related development/deployment configuration |


---

## Project Structure

```text
PAWANSPACE/
├── collaboration/
│   ├── frontend/
│   │   └── crdt.js
│   ├── hocuspocus-server.mjs
│   ├── package.json
│   ├── package-lock.json
│   └── vite.config.mjs
├── docs/
│   └── screenshots/
│       └── dashboard.png
├── static/
│   ├── assets/
│   │   └── crdt/
│   │       └── crdt.js
│   └── index.html
├── tests/
│   └── test_smoke.py
├── .dockerignore
├── .env.example
├── .gitignore
├── Caddyfile
├── DEPLOY.md
├── Dockerfile
├── docker-compose.yml
├── export.py
├── main.py
├── requirements.txt
├── run.bat
└── run.sh
```

Runtime databases, uploaded user data, virtual environments, dependency folders, and secrets should remain outside version control.

---

## Requirements

Install the following before running PAWANSPACE:

- Python 3.10 or newer (use a version compatible with the pinned packages in `requirements.txt`).
- Node.js and npm.
- Git.
- A modern web browser.

The collaboration service uses native Node dependencies such as `better-sqlite3`; on some systems, its installation may require build tools.

---

## Local Setup

### 1. Clone the repository

```bash
git clone https://github.com/PAWAN0207/PAWANSPACE.git
cd PAWANSPACE
```

### 2. Create and activate a Python virtual environment

**Windows PowerShell**
```powershell
python -m venv .venv
.\.venv\Scripts\Activate.ps1
```

If PowerShell blocks activation, you can use:
```powershell
.\.venv\Scripts\python.exe -m pip install -r requirements.txt
```

**macOS / Linux**
```bash
python3 -m venv .venv
source .venv/bin/activate
```

### 3. Install Python dependencies

```bash
python -m pip install --upgrade pip
python -m pip install -r requirements.txt
```

### 4. Configure environment variables

Copy the example file:

**Windows PowerShell**
```powershell
Copy-Item .env.example .env
```

**macOS / Linux**
```bash
cp .env.example .env
```

Generate a strong collaboration secret:

```bash
python -c "import secrets; print(secrets.token_hex(32))"
```

Put the generated 64-character hexadecimal value in your local `.env` file. Do not commit `.env` or share the secret.

Set or verify these collaboration settings in `.env`:

```dotenv
APP_URL=http://localhost:8000

COLLAB_TICKET_SECRET=PASTE_YOUR_64_CHARACTER_HEX_SECRET_HERE
COLLAB_TICKET_TTL_SECONDS=90
COLLAB_WS_URL=ws://127.0.0.1:1234
COLLAB_API_URL=http://127.0.0.1:8000
```

Other optional settings:

```dotenv
TOKEN_DAYS=7
MAX_UPLOAD_MB=50

# Optional email invitations (configure your SMTP provider)
# SMTP_HOST=
# SMTP_PORT=587
# SMTP_USER=
# SMTP_PASS=
# SMTP_FROM=

# Optional Unicode font path for Hindi PDF output
# FONT_PATH=
```

Use the same `COLLAB_TICKET_SECRET` for the FastAPI application and collaboration server. Keep it private.

### 5. Install and build the collaboration frontend

Open a terminal in the collaboration directory:

```bash
cd collaboration
npm ci
npm run build
```

The Vite build writes the collaboration frontend bundle to:

```text
static/assets/crdt/crdt.js
```

Return to the project root before starting the application:

```bash
cd ..
```

### 6. Start the FastAPI application

In **Terminal 1**, from the project root:

```bash
python -m uvicorn main:app --host 127.0.0.1 --port 8000
```

Open:

```text
http://localhost:8000
```

### 7. Start the collaboration server

In **Terminal 2**, from the project root:

```bash
cd collaboration
node hocuspocus-server.mjs
```

The collaboration WebSocket server listens on:

```text
ws://127.0.0.1:1234
```

Keep both services running while using real-time collaboration. Starting only the FastAPI service does not start the separate Hocuspocus server.

---

## Running on Windows

The repository includes `run.bat` and `run.sh` helper scripts for starting the FastAPI application. The collaboration server is a separate process.

For a complete local setup:

1. Install Python dependencies.
2. Configure `.env`.
3. Install Node dependencies and build the collaboration frontend.
4. Start FastAPI.
5. Start Hocuspocus in a second terminal.

See **Local Setup** above for the commands.

---

## Configuration Reference

| Variable | Purpose | Default / example |
|---|---|---|
| `APP_URL` | Base URL of the FastAPI application | `http://localhost:8000` |
| `TOKEN_DAYS` | Authentication token lifetime in days | `7` |
| `MAX_UPLOAD_MB` | Maximum upload size in MB | `50` |
| `COLLAB_TICKET_SECRET` | Shared secret used to sign and validate collaboration tickets | Generate a private 64-character hex value |
| `COLLAB_TICKET_TTL_SECONDS` | Collaboration ticket lifetime | `90` |
| `COLLAB_WS_URL` | Browser-facing collaboration WebSocket URL | `ws://127.0.0.1:1234` |
| `COLLAB_API_URL` | FastAPI URL used by the collaboration service | `http://127.0.0.1:8000` |
| `SMTP_HOST` | SMTP server for invitation emails | Optional |
| `SMTP_PORT` | SMTP server port | `587` |
| `SMTP_USER` | SMTP username | Optional |
| `SMTP_PASS` | SMTP password or app password | Optional |
| `SMTP_FROM` | Sender email address | Optional |
| `FONT_PATH` | Unicode font path for PDF output | Optional |

For a hosted deployment, replace local URLs with the correct public application and secure WebSocket URLs, and configure the reverse proxy and network access accordingly.

---

## Data and Persistence

The application stores runtime data separately from source code:

- Main application database: `data/app.db`
- Uploaded files: `data/files/`
- Collaboration database: `collaboration/data/crdt.sqlite`

These paths contain runtime or user data and should not be committed to Git. Back them up securely before performing maintenance or upgrades.

---

## Tests

A smoke test is included in the `tests/` directory.

Run the test suite with:

```bash
python -m pytest
```

The test result depends on the local environment and configuration. Run the tests after installing dependencies and configuring the application.

---

## Testing & Validation

The following checks were run during the PAWANSPACE development workflow.

### Automated backend tests

| Test | What it covers | Result |
|---|---|---|
| `test_full_flow` | Main application flow | **Passed** |
| `test_teams_inheritance_boards` | Team, inheritance, and board-related behavior | **Passed** |
| `test_rate_limit_and_logout` | Rate limiting and logout behavior | **Passed** |
| **Pytest summary** | `3 passed, 1 warning` | **Passed** |

### CRDT synchronization check

A separate in-memory Yjs synchronization check was also run:

| Check | Result |
|---|---|
| Client A update received by Client B | **Passed** |
| Client B update received by Client A | **Passed** |
| Shared document state matched on both clients | **Passed** |
| Example merged text | `Hello from User A. Hello from User B.` |

**Scope clarification:** The Yjs check validated bidirectional in-memory document-state synchronization. It was not a full automated end-to-end test of concurrent users communicating through the deployed Hocuspocus WebSocket server. The results above describe the checks actually performed; they should not be interpreted as a production certification or a complete security audit.

## Security Notes

- Never commit `.env`, API keys, passwords, SMTP credentials, or collaboration secrets.
- Use a unique, strong `COLLAB_TICKET_SECRET`.
- Keep runtime databases, uploaded files, and backups out of the public repository.
- Use HTTPS and secure WebSockets (`wss://`) for public deployments.
- Do not expose development servers directly to the public internet.
- Configure production database backups, logging, access controls, and reverse-proxy rules before deployment.
- Review the Docker and reverse-proxy configuration before relying on it for a production deployment; the local two-service setup described above is the reference development workflow in this README.

---

## Roadmap

Potential areas for continued development:

- Production deployment and reverse-proxy configuration for both application services.
- Automated integration tests for multi-user collaboration and permission scenarios.
- Improved file preview and document workflows.
- Monitoring, logging, and backup automation.
- Additional workspace administration and collaboration features.

---

## Contributing

Contributions, bug reports, and suggestions are welcome.

1. Fork the repository.
2. Create a feature branch.
3. Make and test your changes.
4. Submit a pull request with a clear description.

Please do not include secrets, local databases, uploaded user data, or dependency directories in pull requests.

---

## License

No license has been specified yet. Unless a license is added to this repository, the project should not be assumed to be available for reuse, modification, or redistribution under an open-source license.

---

## Author

**PAWANSPACE**  
GitHub: [PAWAN0207](https://github.com/PAWAN0207)

Repository: [github.com/PAWAN0207/PAWANSPACE](https://github.com/PAWAN0207/PAWANSPACE)
