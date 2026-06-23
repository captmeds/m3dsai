"""Stream control + live MJPEG preview.

    POST /api/stream/start   start processing a camera (admin/operator)
    POST /api/stream/stop    stop processing a camera (admin/operator)
    GET  /api/stream/status  per-camera worker status
    GET  /api/stream/{id}/live.mjpg   live annotated preview (multipart MJPEG)

The MJPEG endpoint streams the latest annotated frame produced by the worker,
giving a low-dependency live preview that works in any <img> tag.
"""
from __future__ import annotations

import time
from typing import Generator

from fastapi import APIRouter, Depends, HTTPException, Query
from fastapi.responses import StreamingResponse
from jose import JWTError
from sqlalchemy.orm import Session

from app.core.security import decode_token, get_current_user, require_roles
from app.database.db import get_db
from app.database.models import Camera, User, UserRole
from app.logging_config import get_logger
from app.pipeline.processor import engine
from app.schemas.schemas import StreamStartRequest, StreamStatus

router = APIRouter(prefix="/api/stream", tags=["stream"])
logger = get_logger(__name__)


@router.post(
    "/start", response_model=StreamStatus,
    dependencies=[Depends(require_roles(UserRole.ADMIN, UserRole.OPERATOR))],
)
def start_stream(
    payload: StreamStartRequest,
    db: Session = Depends(get_db),
    _: User = Depends(get_current_user),
) -> StreamStatus:
    camera = db.get(Camera, payload.camera_id)
    if not camera:
        raise HTTPException(status_code=404, detail="Camera not found")
    worker = engine.start(camera)
    # Give the worker a moment to attempt opening the source.
    time.sleep(0.3)
    return StreamStatus(
        camera_id=camera.id,
        running=worker.running,
        mode=worker.mode,
        frames_processed=worker.frames_processed,
        detections_logged=worker.detections_logged,
        message=worker.message or "started",
    )


@router.post(
    "/stop", response_model=StreamStatus,
    dependencies=[Depends(require_roles(UserRole.ADMIN, UserRole.OPERATOR))],
)
def stop_stream(
    payload: StreamStartRequest,
    _: User = Depends(get_current_user),
) -> StreamStatus:
    stopped = engine.stop(payload.camera_id)
    return StreamStatus(
        camera_id=payload.camera_id,
        running=False,
        mode="-",
        message="stopped" if stopped else "was not running",
    )


@router.get("/status", response_model=list[StreamStatus])
def stream_status(
    db: Session = Depends(get_db),
    _: User = Depends(get_current_user),
) -> list[StreamStatus]:
    statuses: list[StreamStatus] = []
    for camera in db.query(Camera).all():
        worker = engine.get(camera.id)
        if worker:
            statuses.append(StreamStatus(
                camera_id=camera.id, running=worker.running, mode=worker.mode,
                frames_processed=worker.frames_processed,
                detections_logged=worker.detections_logged,
                message=worker.message,
            ))
        else:
            statuses.append(StreamStatus(
                camera_id=camera.id, running=False, mode="-", message="idle"
            ))
    return statuses


def _mjpeg_generator(camera_id: int) -> Generator[bytes, None, None]:
    """Yield multipart MJPEG frames from the worker's latest annotated frame."""
    boundary = b"--frame"
    while True:
        worker = engine.get(camera_id)
        if not worker or not worker.running:
            break
        frame = worker.get_latest_jpeg()
        if frame is not None:
            yield (
                boundary + b"\r\n"
                b"Content-Type: image/jpeg\r\n\r\n" + frame + b"\r\n"
            )
        time.sleep(0.05)  # ~20 fps cap for the preview


@router.get("/{camera_id}/live.mjpg")
def live_preview(
    camera_id: int,
    token: str | None = Query(None, description="JWT (for use in <img> tags)"),
) -> StreamingResponse:
    """Live annotated MJPEG preview for a running camera.

    Authentication accepts a ``?token=<jwt>`` query parameter because browsers
    cannot attach an Authorization header to an ``<img>`` source. The token is
    validated the same way as a bearer token.
    """
    if not token:
        raise HTTPException(status_code=401, detail="Missing token")
    try:
        decode_token(token)
    except JWTError:
        raise HTTPException(status_code=401, detail="Invalid token")

    worker = engine.get(camera_id)
    if not worker or not worker.running:
        raise HTTPException(status_code=409, detail="Camera is not currently streaming")
    return StreamingResponse(
        _mjpeg_generator(camera_id),
        media_type="multipart/x-mixed-replace; boundary=frame",
    )
