"""Initialise the database and seed starter data.

Creates all tables, a seed ADMIN user (from .env), a sample "file" camera that
points at the generated test video, and a DUMMY watchlist. Two of the dummy
plates (STOLEN1, WANTED7) deliberately match the mock OCR output so you can see
alerts fire end-to-end with zero ML dependencies.

Run:
    python -m scripts.init_db
Idempotent: existing rows are left untouched.
"""
from __future__ import annotations

import sys

# Allow running as `python scripts/init_db.py` too.
sys.path.insert(0, ".")

from app.config import settings  # noqa: E402
from app.core.security import hash_password  # noqa: E402
from app.database.db import SessionLocal, init_db  # noqa: E402
from app.database.models import (  # noqa: E402
    Camera,
    CameraType,
    User,
    UserRole,
    WatchlistEntry,
)
from app.logging_config import get_logger  # noqa: E402

logger = get_logger("init_db")

# Dummy / sample watchlist (clearly fictional). STOLEN1 & WANTED7 match mock OCR.
DUMMY_WATCHLIST = [
    {"plate_text": "STOLEN1", "reason": "Reported stolen vehicle", "severity": "high",
     "reference": "CRIME/2026/0001", "notes": "Sample seed data — fictional."},
    {"plate_text": "WANTED7", "reason": "Vehicle of interest", "severity": "high",
     "reference": "INTEL/2026/0042", "notes": "Sample seed data — fictional."},
    {"plate_text": "AB12CDE", "reason": "No valid insurance (sample)", "severity": "medium",
     "reference": "TRAFFIC/2026/0107", "notes": "Sample seed data — fictional."},
    {"plate_text": "XY98ZZZ", "reason": "Expired registration (sample)", "severity": "low",
     "reference": "DVLA/2026/0908", "notes": "Sample seed data — fictional."},
]


def seed_admin(db) -> None:
    existing = db.query(User).filter(User.email == settings.admin_email).first()
    if existing:
        logger.info("Admin user already exists: %s", settings.admin_email)
        return
    admin = User(
        email=settings.admin_email,
        full_name="System Administrator",
        hashed_password=hash_password(settings.admin_password),
        role=UserRole.ADMIN,
    )
    db.add(admin)
    logger.info("Created admin user: %s (CHANGE THE PASSWORD!)", settings.admin_email)


def seed_sample_camera(db) -> None:
    if db.query(Camera).count() > 0:
        logger.info("Cameras already exist — skipping sample camera.")
        return
    cam = Camera(
        name="Test File Camera",
        location="Sample / demo footage",
        camera_type=CameraType.FILE,
        source=str(settings.video_path / "test_traffic.mp4"),
    )
    db.add(cam)
    logger.info("Created sample 'file' camera pointing at the test video.")


def seed_watchlist(db) -> None:
    added = 0
    for item in DUMMY_WATCHLIST:
        if db.query(WatchlistEntry).filter(
            WatchlistEntry.plate_text == item["plate_text"]
        ).first():
            continue
        db.add(WatchlistEntry(added_by="seed", **item))
        added += 1
    logger.info("Seeded %d dummy watchlist entries.", added)


def main() -> None:
    logger.info("Initialising database at %s", settings.database_url)
    init_db()
    with SessionLocal() as db:
        seed_admin(db)
        seed_sample_camera(db)
        seed_watchlist(db)
        db.commit()
    logger.info("✔ Database ready.")
    print("\n  Login with:")
    print(f"    email:    {settings.admin_email}")
    print(f"    password: (value of ADMIN_PASSWORD in your .env)\n")


if __name__ == "__main__":
    main()
