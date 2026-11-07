#!/bin/bash
cd "$(dirname "$0")"
[ -d venv ] || python3 -m venv venv
source venv/bin/activate
pip install -q -r requirements.txt
echo "Open http://localhost:8000 in your browser"
python -m uvicorn main:app --host 0.0.0.0 --port 8000
