"""Pydantic models defining the API contract (requests + responses).

Kept separate from the ORM models (app/database/models.py) so the wire format and
the storage format can evolve independently.
"""
from __future__ import annotations

import datetime as dt
from typing import Optional

from pydantic import BaseModel, ConfigDict, EmailStr, Field

from app.database.models import AlertStatus, CameraType, UserRole


# ── Auth ─────────────────────────────────────────────────────────────────────
class Token(BaseModel):
    access_token: str
    token_type: str = "bearer"
    role: UserRole
    email: str


class LoginRequest(BaseModel):
    email: EmailStr
    password: str


# ── Users ────────────────────────────────────────────────────────────────────
class UserCreate(BaseModel):
    email: EmailStr
    password: str = Field(min_length=8)
    full_name: str = ""
    role: UserRole = UserRole.VIEWER


class UserOut(BaseModel):
    model_config = ConfigDict(from_attributes=True)
    id: int
    email: str
    full_name: str
    role: UserRole
    is_active: bool
    created_at: dt.datetime
    last_login: Optional[dt.datetime] = None


# ── Cameras ──────────────────────────────────────────────────────────────────
class CameraCreate(BaseModel):
    name: str
    location: str = ""
    camera_type: CameraType
    source: str = Field(description="Device index, RTSP URL, or video file path")


class CameraOut(BaseModel):
    model_config = ConfigDict(from_attributes=True)
    id: int
    name: str
    location: str
    camera_type: CameraType
    source: str
    is_active: bool
    created_at: dt.datetime


# ── Plate reads / detections ─────────────────────────────────────────────────
class PlateReadOut(BaseModel):
    model_config = ConfigDict(from_attributes=True)
    id: int
    plate_text: str
    confidence: float
    plate_image_path: Optional[str] = None
    created_at: dt.datetime


class DetectionOut(BaseModel):
    model_config = ConfigDict(from_attributes=True)
    id: int
    camera_id: int
    track_id: int
    vehicle_type: str
    vehicle_confidence: float
    best_plate_text: Optional[str] = None
    best_plate_confidence: float
    snapshot_path: Optional[str] = None
    plate_image_path: Optional[str] = None
    first_seen: dt.datetime
    last_seen: dt.datetime


class DetectionDetail(DetectionOut):
    plate_reads: list[PlateReadOut] = []
    camera_name: Optional[str] = None
    camera_location: Optional[str] = None
    is_watchlisted: bool = False


# ── Watchlist ────────────────────────────────────────────────────────────────
class WatchlistCreate(BaseModel):
    plate_text: str
    reason: str = ""
    severity: str = "medium"
    reference: str = ""
    notes: str = ""


class WatchlistOut(BaseModel):
    model_config = ConfigDict(from_attributes=True)
    id: int
    plate_text: str
    reason: str
    severity: str
    reference: str
    is_active: bool
    notes: str
    created_at: dt.datetime
    added_by: str


# ── Alerts ───────────────────────────────────────────────────────────────────
class AlertOut(BaseModel):
    model_config = ConfigDict(from_attributes=True)
    id: int
    detection_id: int
    watchlist_id: int
    plate_text: str
    reason: str
    severity: str
    status: AlertStatus
    created_at: dt.datetime
    acknowledged_by: Optional[str] = None
    acknowledged_at: Optional[dt.datetime] = None


class AlertUpdate(BaseModel):
    status: AlertStatus


# ── Audit ────────────────────────────────────────────────────────────────────
class AuditLogOut(BaseModel):
    model_config = ConfigDict(from_attributes=True)
    id: int
    timestamp: dt.datetime
    user_email: str
    action: str
    resource: str
    detail: str
    ip_address: str


# ── Stream control ───────────────────────────────────────────────────────────
class StreamStartRequest(BaseModel):
    camera_id: int


class StreamStatus(BaseModel):
    camera_id: int
    running: bool
    mode: str  # "live" | "mock"
    frames_processed: int = 0
    detections_logged: int = 0
    message: str = ""


# ── Generic ──────────────────────────────────────────────────────────────────
class Message(BaseModel):
    detail: str
