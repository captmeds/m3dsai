# m3dsEYE — AI Traffic Radar 🚦

A **privacy-aware, modular ANPR** (Automatic Number Plate Recognition) and
vehicle-monitoring prototype. It ingests video from a **phone camera / webcam**,
an **RTSP / CCTV stream**, or an **uploaded video file**, detects passing
vehicles, reads their number plates, logs traffic activity, and raises **alerts**
when a plate matches a secure local **watchlist** (e.g. stolen vehicles).

> ## ⚠️ Authorised use only
> m3dsEYE processes **personal data** (vehicle registration plates). It is
> intended **solely for authorised law-enforcement / government use** under
> lawful authority. You are responsible for compliance with all applicable
> privacy, surveillance and data-protection laws in your jurisdiction.
> **No public facial recognition. No covert/unauthorised tracking.**

---

## ✨ Highlights

- **Runs with zero ML setup.** If YOLO/torch/OCR aren't installed, the system
  drops into a deterministic **MOCK mode** so you can demo the *entire* pipeline,
  database, dashboard, watchlist and alerts offline. Add the ML extras for live
  inference whenever you're ready.
- **Modular by design** — detection, OCR, database, API and dashboard are fully
  decoupled and individually swappable.
- **Privacy-by-design** — role-based auth, full audit trail, face blurring,
  configurable data retention, secured image storage, lawful-use banner.
- **One input abstraction** — switch webcam / RTSP / file by changing a row in
  the `cameras` table. No code changes.

---

## 🧱 Architecture

```
                    ┌─────────────────────────────────────────────┐
  Webcam / Phone ──▶│                                             │
  RTSP / CCTV    ──▶│   VideoSource ─▶ VehicleDetector (YOLO)     │
  Video file     ──▶│        │              │                      │
                    │        │              ▼                      │
                    │        │          CentroidTracker            │
                    │        │              │                      │
                    │        │              ▼                      │
                    │        │      PlateDetector ─▶ OCR engine    │
                    │        │              │                      │
                    │   PrivacyFilter◀──────┘                      │
                    │        │              ▼                      │
                    │        └────▶  Persistence  ─▶  Watchlist    │
                    │                     │              │ match    │
                    └─────────────────────┼──────────────┼─────────┘
                                          ▼              ▼
                              SQLite/Postgres        Alerts
                                          │
                    FastAPI  ◀────────────┘────────▶  Audit log
                       │
                       ▼
              HTML/JS Dashboard  (live MJPEG, feed, search, watchlist, alerts)
```

### Project layout

```
m3dseye/
├── app/
│   ├── main.py                 # FastAPI app: routers, static dashboard, lifespan
│   ├── config.py               # env-driven settings (pydantic-settings)
│   ├── logging_config.py       # rotating file + console logging
│   ├── database/               # SQLAlchemy engine, ORM models, reference schema.sql
│   ├── schemas/                # Pydantic request/response models
│   ├── core/                   # security (JWT, RBAC), audit logging
│   ├── detection/              # vehicle detector, plate detector, tracker (+ mock)
│   ├── ocr/                    # OCR engine abstraction (easyocr/tesseract/mock)
│   ├── pipeline/               # video sources, privacy filters, processing engine
│   ├── services/               # watchlist matching, persistence, retention
│   ├── api/routes/             # auth, cameras, detections, watchlist, alerts,
│   │                           #   stream, audit, admin, media
│   └── static/                 # self-contained dashboard (HTML/CSS/JS)
├── scripts/                    # init_db, generate_test_video, download_models
├── tests/                      # pytest suite (no ML deps required)
├── data/                       # runtime: SQLite DB, images, videos (gitignored)
├── Dockerfile / docker-compose.yml
├── requirements.txt            # base deps (API + OpenCV + DB)
├── requirements-ml.txt         # optional heavy deps (YOLO + torch + OCR)
└── .env.example
```

---

## 🚀 Quick start (local, no ML — 2 minutes)

```bash
cd m3dseye

python -m venv .venv && source .venv/bin/activate     # Windows: .venv\Scripts\activate
pip install -r requirements.txt

cp .env.example .env            # then EDIT secret_key + admin password!

python -m scripts.init_db              # creates DB + admin + dummy watchlist
python -m scripts.generate_test_video  # writes data/videos/test_traffic.mp4

uvicorn app.main:app --reload
```

Open **http://localhost:8000** → you're redirected to the dashboard / login.
Sign in with the `ADMIN_EMAIL` / `ADMIN_PASSWORD` from your `.env`.

Then: go to **Live**, pick *Test File Camera*, press **Start**. You'll see the
annotated MJPEG preview, detections flowing into the **Detections** tab, and
**Alerts** firing for the seeded watchlist plates (`STOLEN1`, `WANTED7`).

> With no ML libraries installed the badge shows **MOCK MODE** — everything works,
> using synthetic detections/OCR. See below to enable real inference.

---

## 🤖 Enabling live AI inference (optional)

```bash
pip install -r requirements-ml.txt     # ultralytics + torch + easyocr (large!)
python -m scripts.download_models      # fetch YOLOv8n COCO weights
# (optional) drop a dedicated plate model at models/license_plate.pt
```

Set in `.env`:
```
FORCE_MOCK_DETECTION=false
OCR_ENGINE=easyocr        # or tesseract (needs the tesseract binary)
DEVICE=cpu                # or cuda / mps
```

- **Vehicle detection** uses YOLO COCO classes: car, motorbike, bus, truck
  (vans are approximated from car/truck geometry — COCO has no van class).
- **Plate detection** uses your dedicated plate model if present, otherwise an
  OpenCV edge/contour **heuristic** that needs no weights.
- **OCR**: EasyOCR (default, pip-only) or Tesseract.

---

## 🎥 Switching camera input

Add a camera in the **Cameras** tab (or `POST /api/cameras`). The `source` field
depends on the type:

| Type     | `source` example                         | Notes                          |
|----------|------------------------------------------|--------------------------------|
| `webcam` | `0`                                      | device index (phone via OS/IP-cam app) |
| `rtsp`   | `rtsp://user:pass@192.168.1.50:554/h264` | CCTV / IP camera               |
| `file`   | `data/videos/test_traffic.mp4`           | uploaded / sample footage      |

Start/stop processing per camera from the **Live** tab.

---

## 🔐 Privacy & compliance features

| Requirement | How m3dsEYE implements it |
|---|---|
| Authorised users only | JWT auth on **every** data endpoint |
| Role-based access | `admin` / `operator` / `viewer` roles gate sensitive actions |
| Audit logging | Every login, **search, view, export**, watchlist & user change is recorded in `audit_logs` (admin-viewable, append-only via API) |
| Data retention | `DATA_RETENTION_DAYS` auto-purge (`POST /api/admin/retention/run` or cron); audit logs kept longer for accountability |
| Face blurring | `BLUR_FACES` — OpenCV face **detector** (no recognition) blurs bystanders in stored snapshots |
| Plate-only mode | `BLUR_NON_PLATE` — blurs everything except the plate region |
| Secure image storage | Images served only via authenticated `/api/media` with path-traversal guard; randomised filenames; never public static |
| Lawful-use warning | Banner on login + dashboard; warning logged on startup |
| No facial recognition / tracking | None implemented, by design |

---

## 🗄️ Database schema

SQLite by default (`DATABASE_URL=sqlite:///./data/m3dseye.db`); PostgreSQL
supported (uncomment `psycopg2-binary` + set the DSN). Tables: **users,
cameras, detections, plate_reads, watchlist, alerts, audit_logs**. Tables are
auto-created on startup; see `app/database/schema.sql` for the reference DDL.

---

## 🔌 API overview

Interactive docs at **`/docs`** (Swagger). Click **Authorize** and log in.

| Area | Endpoints |
|---|---|
| Auth | `POST /api/auth/login`, `GET /api/auth/me` |
| Cameras | `GET/POST /api/cameras`, `DELETE /api/cameras/{id}` |
| Stream | `POST /api/stream/start`, `/stop`, `GET /api/stream/status`, `GET /api/stream/{id}/live.mjpg` |
| Detections | `GET /api/detections` (filters: plate/date/camera/type), `GET /api/detections/{id}`, `GET /api/detections/export/csv` |
| Watchlist | `GET/POST /api/watchlist`, `DELETE /api/watchlist/{id}` |
| Alerts | `GET /api/alerts`, `PATCH /api/alerts/{id}` |
| Audit | `GET /api/audit` *(admin)* |
| Admin | `GET/POST/DELETE /api/admin/users`, `POST /api/admin/retention/run` |

---

## 🐳 Docker

```bash
cp .env.example .env            # edit secrets first
docker compose up --build       # SQLite + MOCK mode, http://localhost:8000
```

For live inference build with ML deps (large image):
```bash
docker compose build --build-arg INSTALL_ML=true
```
PostgreSQL: uncomment the `postgres` service + `DATABASE_URL` in `docker-compose.yml`.

---

## ✅ Tests

```bash
pip install pytest
pytest -q          # watchlist matching, tracker dedup, plate normalisation, cooldown dedup
```

---

## 🧰 Makefile shortcuts

`make install` · `make install-ml` · `make init` · `make testvideo` · `make dev`
· `make test` · `make docker` — run `make help` for the full list.

---

## 🛣️ Roadmap / notes

- Swap the centroid tracker for ByteTrack/DeepSORT for dense traffic.
- Train/plug a jurisdiction-specific plate model + plate-format validators.
- Add WebSocket push for live alerts; add S3/MinIO storage backend.
- Add rate-limiting and stricter CORS for production.

## 📄 License

MIT — see [LICENSE](./LICENSE), including the additional lawful-use notice.
