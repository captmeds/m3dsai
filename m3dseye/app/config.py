"""Centralised application configuration.

All settings are loaded from environment variables (or a local ``.env`` file)
via pydantic-settings. Importing ``settings`` anywhere in the app gives a single,
validated, typed configuration object.
"""
from __future__ import annotations

from functools import lru_cache
from pathlib import Path

from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    """Typed application settings. Field names map to UPPER_CASE env vars."""

    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
        case_sensitive=False,
        extra="ignore",
    )

    # ── Application ──────────────────────────────────────────────────────────
    app_name: str = "m3dsEYE Traffic Radar"
    environment: str = "development"
    debug: bool = True
    host: str = "0.0.0.0"
    port: int = 8000

    # ── Security / auth ──────────────────────────────────────────────────────
    secret_key: str = "change-me-please-generate-a-real-secret-key"
    access_token_expire_minutes: int = 480
    algorithm: str = "HS256"
    admin_email: str = "admin@example.gov"
    admin_password: str = "ChangeMe!Admin123"

    # ── Database ─────────────────────────────────────────────────────────────
    database_url: str = "sqlite:///./data/m3dseye.db"

    # ── Storage ──────────────────────────────────────────────────────────────
    storage_dir: str = "./data/storage"
    video_dir: str = "./data/videos"

    # ── Detection / models ───────────────────────────────────────────────────
    vehicle_model_path: str = "models/yolov8n.pt"
    plate_model_path: str = "models/license_plate.pt"
    detection_confidence: float = 0.35
    plate_confidence: float = 0.25
    device: str = "cpu"
    force_mock_detection: bool = False

    # ── OCR ──────────────────────────────────────────────────────────────────
    ocr_engine: str = "easyocr"
    ocr_min_confidence: float = 0.40
    ocr_languages: str = "en"

    # ── Pipeline tuning ──────────────────────────────────────────────────────
    frame_skip: int = 2
    tracker_max_distance: int = 80
    tracker_max_missing: int = 30
    dedup_cooldown_seconds: int = 30

    # ── Privacy & compliance ─────────────────────────────────────────────────
    blur_faces: bool = True
    blur_non_plate: bool = False
    data_retention_days: int = 30
    lawful_use_banner: bool = True

    # ── Derived helpers ──────────────────────────────────────────────────────
    @property
    def storage_path(self) -> Path:
        p = Path(self.storage_dir)
        p.mkdir(parents=True, exist_ok=True)
        return p

    @property
    def video_path(self) -> Path:
        p = Path(self.video_dir)
        p.mkdir(parents=True, exist_ok=True)
        return p

    @property
    def ocr_lang_list(self) -> list[str]:
        return [lang.strip() for lang in self.ocr_languages.split(",") if lang.strip()]


@lru_cache
def get_settings() -> Settings:
    """Return a cached singleton Settings instance."""
    return Settings()


# Convenience module-level singleton.
settings = get_settings()
