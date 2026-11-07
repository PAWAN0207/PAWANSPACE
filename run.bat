@echo off
if not exist venv python -m venv venv
call venv\Scripts\activate
pip install -q -r requirements.txt
echo Open http://localhost:8000 in your browser
python -m uvicorn main:app --host 0.0.0.0 --port 8000
