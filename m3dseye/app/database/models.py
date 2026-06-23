"""SQLAlchemy ORM models — the m3dsEYE data schema.

Tables
------
    users         Authorised operators (role-based access control).
    cameras       Configured camera inputs (webcam / RTSP / file).
    detections    A tracked vehicle pass (one row per unique vehicle).
    plate_reads   Individual OCR reads (a detection may have several).
    watchlist     Plates of interest (stolen / suspicious vehicles).
    alerts        Raised when a detection matches the watchlist.
    audit_logs    Immutable trail of every sensitive action.

The schema is deliberately normalised so plate reads and alerts can be queried,
exported and retention-purged independently.
"""
from __future__ import annotations

import datetime as dt
import enum

from sqlalchemy import (
    Boolean,
    DateTime,
    Enum,
    Float,
    ForeignKey,
    Integer,
    String,
    Text,
)
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.database.db import Base


def _utcnow() -> dt.datetime:
    return dt.datetime.now(dt.timezone.utc)


# ─────────────────────────────────────────────────────────────────────────────
# Enums
# ─────────────────────────────────────────────────────────────────────────────
class UserRole(str, enum.Enum):
    """Role-based access control levels."""

    ADMIN = "admin"        # full control: users, cameras, watchlist, exports
    OPERATOR = "operator"  # run cameras, view feed, manage watchlist
    VIEWER = "viewer"      # read-only dashboard access


class CameraType(str, enum.Enum):
    WEBCAM = "webcam"
    RTSP = "rtsp"
    FILE = "file"


class AlertStatus(str, enum.Enum):
    NEW = "new"
    ACKNOWLEDGED = "acknowledged"
    DISMISSED = "dismissed"


# ─────────────────────────────────────────────────────────────────────────────
# Users
# ─────────────────────────────────────────────────────────────────────────────
class User(Base):
    __tablename__ = "users"

    id: Mapped[int] = mapped_column(primary_key=True)
    email: Mapped[str] = mapped_column(String(255), unique=True, index=True)
    full_name: Mapped[str] = mapped_column(String(255), default="")
    hashed_password: Mapped[str] = mapped_column(String(255))
    role: Mapped[UserRole] = mapped_column(Enum(UserRole), default=UserRole.VIEWER)
    is_active: Mapped[bool] = mapped_column(Boolean, default=True)
    created_at: Mapped[dt.datetime] = mapped_column(DateTime, default=_utcnow)
    last_login: Mapped[dt.datetime | None] = mapped_column(DateTime, nullable=True)


# ─────────────────────────────────────────────────────────────────────────────
# Cameras
# ─────────────────────────────────────────────────────────────────────────────
class Camera(Base):
    __tablename__ = "cameras"

    id: Mapped[int] = mapped_column(primary_key=True)
    name: Mapped[str] = mapped_column(String(120), index=True)
    location: Mapped[str] = mapped_column(String(255), default="")
    camera_type: Mapped[CameraType] = mapped_column(Enum(CameraType))
    # For WEBCAM: device index ("0"). For RTSP: full URL. For FILE: video path.
    source: Mapped[str] = mapped_column(String(1024))
    is_active: Mapped[bool] = mapped_column(Boolean, default=True)
    created_at: Mapped[dt.datetime] = mapped_column(DateTime, default=_utcnow)

    detections: Mapped[list["Detection"]] = relationship(
        back_populates="camera", cascade="all, delete-orphan"
    )


# ─────────────────────────────────────────────────────────────────────────────
# Detections (one per unique tracked vehicle pass)
# ─────────────────────────────────────────────────────────────────────────────
class Detection(Base):
    __tablename__ = "detections"

    id: Mapped[int] = mapped_column(primary_key=True)
    camera_id: Mapped[int] = mapped_column(ForeignKey("cameras.id"), index=True)
    track_id: Mapped[int] = mapped_column(Integer, index=True)
    vehicle_type: Mapped[str] = mapped_column(String(40), index=True)
    vehicle_confidence: Mapped[float] = mapped_column(Float, default=0.0)

    # Best plate read for this vehicle (denormalised for fast dashboard queries).
    best_plate_text: Mapped[str | None] = mapped_column(String(32), index=True, nullable=True)
    best_plate_confidence: Mapped[float] = mapped_column(Float, default=0.0)

    snapshot_path: Mapped[str | None] = mapped_column(String(1024), nullable=True)
    plate_image_path: Mapped[str | None] = mapped_column(String(1024), nullable=True)

    first_seen: Mapped[dt.datetime] = mapped_column(DateTime, default=_utcnow, index=True)
    last_seen: Mapped[dt.datetime] = mapped_column(DateTime, default=_utcnow)

    camera: Mapped["Camera"] = relationship(back_populates="detections")
    plate_reads: Mapped[list["PlateRead"]] = relationship(
        back_populates="detection", cascade="all, delete-orphan"
    )
    alerts: Mapped[list["Alert"]] = relationship(
        back_populates="detection", cascade="all, delete-orphan"
    )


# ─────────────────────────────────────────────────────────────────────────────
# Plate reads (individual OCR results)
# ─────────────────────────────────────────────────────────────────────────────
class PlateRead(Base):
    __tablename__ = "plate_reads"

    id: Mapped[int] = mapped_column(primary_key=True)
    detection_id: Mapped[int] = mapped_column(
        ForeignKey("detections.id"), index=True
    )
    plate_text: Mapped[str] = mapped_column(String(32), index=True)
    confidence: Mapped[float] = mapped_column(Float, default=0.0)
    plate_image_path: Mapped[str | None] = mapped_column(String(1024), nullable=True)
    created_at: Mapped[dt.datetime] = mapped_column(DateTime, default=_utcnow)

    detection: Mapped["Detection"] = relationship(back_populates="plate_reads")


# ─────────────────────────────────────────────────────────────────────────────
# Watchlist (plates of interest)
# ─────────────────────────────────────────────────────────────────────────────
class WatchlistEntry(Base):
    __tablename__ = "watchlist"

    id: Mapped[int] = mapped_column(primary_key=True)
    # Stored NORMALISED (uppercase, no spaces) for reliable matching.
    plate_text: Mapped[str] = mapped_column(String(32), unique=True, index=True)
    reason: Mapped[str] = mapped_column(String(255), default="")  # e.g. "Stolen vehicle"
    severity: Mapped[str] = mapped_column(String(20), default="medium")  # low|medium|high
    reference: Mapped[str] = mapped_column(String(120), default="")  # case / report no.
    is_active: Mapped[bool] = mapped_column(Boolean, default=True)
    notes: Mapped[str] = mapped_column(Text, default="")
    created_at: Mapped[dt.datetime] = mapped_column(DateTime, default=_utcnow)
    added_by: Mapped[str] = mapped_column(String(255), default="system")


# ─────────────────────────────────────────────────────────────────────────────
# Alerts (watchlist match events)
# ─────────────────────────────────────────────────────────────────────────────
class Alert(Base):
    __tablename__ = "alerts"

    id: Mapped[int] = mapped_column(primary_key=True)
    detection_id: Mapped[int] = mapped_column(ForeignKey("detections.id"), index=True)
    watchlist_id: Mapped[int] = mapped_column(ForeignKey("watchlist.id"), index=True)
    plate_text: Mapped[str] = mapped_column(String(32), index=True)
    reason: Mapped[str] = mapped_column(String(255), default="")
    severity: Mapped[str] = mapped_column(String(20), default="medium")
    status: Mapped[AlertStatus] = mapped_column(
        Enum(AlertStatus), default=AlertStatus.NEW, index=True
    )
    created_at: Mapped[dt.datetime] = mapped_column(DateTime, default=_utcnow, index=True)
    acknowledged_by: Mapped[str | None] = mapped_column(String(255), nullable=True)
    acknowledged_at: Mapped[dt.datetime | None] = mapped_column(DateTime, nullable=True)

    detection: Mapped["Detection"] = relationship(back_populates="alerts")


# ─────────────────────────────────────────────────────────────────────────────
# Audit logs (immutable trail — privacy/compliance requirement)
# ─────────────────────────────────────────────────────────────────────────────
class AuditLog(Base):
    __tablename__ = "audit_logs"

    id: Mapped[int] = mapped_column(primary_key=True)
    timestamp: Mapped[dt.datetime] = mapped_column(DateTime, default=_utcnow, index=True)
    user_email: Mapped[str] = mapped_column(String(255), index=True, default="anonymous")
    action: Mapped[str] = mapped_column(String(80), index=True)  # e.g. SEARCH, VIEW, EXPORT
    resource: Mapped[str] = mapped_column(String(120), default="")  # e.g. "detections"
    detail: Mapped[str] = mapped_column(Text, default="")          # query params / context
    ip_address: Mapped[str] = mapped_column(String(64), default="")
