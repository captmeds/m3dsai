"""m3dsEYE — FastAPI application entrypoint.

Wires together all routers, serves the static dashboard, exposes health/config
endpoints, and manages startup/shutdown (DB init, worker teardown).

Run with:
    uvicorn app.main:app --reload
or simply:
    python -m app.main
"""
from __future__ import annotations

from contextlib import asynccontextmanager
from pathlib import Path

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse, RedirectResponse
from fastapi.staticfiles import StaticFiles

from app.api.routes import (
    admin,
    alerts,
    audit,
    auth,
    cameras,
    detections,
    media,
    stream,
    watchlist,
)
from app.config import settings
from app.database.db import init_db
from app.logging_config import get_logger, setup_logging
from app.pipeline.processor import engine

setup_logging(level="DEBUG" if settings.debug else "INFO")
logger = get_logger(__name__)

_STATIC_DIR = Path(__file__).parent / "static"


@asynccontextmanager
async def lifespan(app: FastAPI):
    """Application startup / shutdown."""
    logger.info("Starting %s (env=%s)", settings.app_name, settings.environment)
    init_db()
    logger.info(
        "⚠ AUTHORISED USE ONLY — this system processes personal data (vehicle "
        "registration plates). Ensure you have lawful authority before use."
    )
    yield
    logger.info("Shutting down — stopping all camera workers.")
    engine.stop_all()


app = FastAPI(
    title=settings.app_name,
    description=(
        "Privacy-aware AI Traffic Radar (ANPR). FOR AUTHORISED LAW-ENFORCEMENT / "
        "GOVERNMENT USE ONLY."
    ),
    version="0.1.0",
    lifespan=lifespan,
)

# CORS — relaxed in development; lock this down in production deployments.
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"] if settings.debug else [],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ── API routers ──────────────────────────────────────────────────────────────
app.include_router(auth.router)
app.include_router(cameras.router)
app.include_router(detections.router)
app.include_router(watchlist.router)
app.include_router(alerts.router)
app.include_router(stream.router)
app.include_router(audit.router)
app.include_router(admin.router)
app.include_router(media.router)


# ── Meta endpoints ───────────────────────────────────────────────────────────
@app.get("/api/health", tags=["meta"])
def health() -> dict:
    """Liveness probe + a quick view of the active detection/OCR modes."""
    from app.detection.vehicle_detector import get_vehicle_detector
    from app.ocr.ocr_engine import get_ocr_engine

    return {
        "status": "ok",
        "app": settings.app_name,
        "environment": settings.environment,
        "vehicle_detection_mode": get_vehicle_detector().mode,
        "ocr_engine": get_ocr_engine().name,
    }


@app.get("/api/config", tags=["meta"])
def public_config() -> dict:
    """Non-sensitive config the dashboard needs before login."""
    return {
        "app_name": settings.app_name,
        "lawful_use_banner": settings.lawful_use_banner,
        "data_retention_days": settings.data_retention_days,
    }


# ── Static dashboard ─────────────────────────────────────────────────────────
# Mount JS/CSS assets; serve index/login at the root.
app.mount("/static", StaticFiles(directory=str(_STATIC_DIR)), name="static")


@app.get("/", include_in_schema=False)
def root() -> RedirectResponse:
    return RedirectResponse(url="/app")


@app.get("/login", include_in_schema=False)
def login_page() -> FileResponse:
    return FileResponse(str(_STATIC_DIR / "login.html"))


@app.get("/app", include_in_schema=False)
def dashboard_page() -> FileResponse:
    return FileResponse(str(_STATIC_DIR / "index.html"))


if __name__ == "__main__":
    import uvicorn

    uvicorn.run(
        "app.main:app",
        host=settings.host,
        port=settings.port,
        reload=settings.debug,
    )
