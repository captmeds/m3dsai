# m3dsEYE — common developer commands.
.PHONY: help venv install install-ml init testvideo run dev test docker lint clean

help:
	@echo "m3dsEYE — AI Traffic Radar"
	@echo "  make install       Install base Python deps (API + OpenCV + DB)"
	@echo "  make install-ml    Install optional ML deps (YOLO + torch + OCR)"
	@echo "  make init          Create DB, seed admin + dummy watchlist"
	@echo "  make testvideo     Generate the synthetic test video"
	@echo "  make run           Run the API server"
	@echo "  make dev           Run with autoreload"
	@echo "  make test          Run the test suite"
	@echo "  make docker        Build & run via docker compose"
	@echo "  make clean         Remove caches + the local SQLite DB"

install:
	pip install -r requirements.txt

install-ml:
	pip install -r requirements-ml.txt

init:
	python -m scripts.init_db

testvideo:
	python -m scripts.generate_test_video

run:
	uvicorn app.main:app --host 0.0.0.0 --port 8000

dev:
	uvicorn app.main:app --reload --host 0.0.0.0 --port 8000

test:
	pytest -q

docker:
	docker compose up --build

clean:
	find . -type d -name __pycache__ -exec rm -rf {} + 2>/dev/null || true
	rm -f data/m3dseye.db
