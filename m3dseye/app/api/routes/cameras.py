"""Camera management routes (CRUD).

Cameras are the configurable inputs. Switching between webcam / RTSP / file is
purely a data operation here — pick the type and provide the matching source.
"""
from __future__ import annotations

from fastapi import APIRouter, Depends, HTTPException, Request
from sqlalchemy.orm import Session

from app.core.audit import record_audit
from app.core.security import get_current_user, require_roles
from app.database.db import get_db
from app.database.models import Camera, User, UserRole
from app.pipeline.processor import engine
from app.schemas.schemas import CameraCreate, CameraOut, Message

router = APIRouter(prefix="/api/cameras", tags=["cameras"])


@router.get("", response_model=list[CameraOut])
def list_cameras(
    db: Session = Depends(get_db),
    _: User = Depends(get_current_user),
) -> list[Camera]:
    return db.query(Camera).order_by(Camera.id).all()


@router.post(
    "", response_model=CameraOut,
    dependencies=[Depends(require_roles(UserRole.ADMIN, UserRole.OPERATOR))],
)
def create_camera(
    payload: CameraCreate,
    request: Request,
    db: Session = Depends(get_db),
    user: User = Depends(get_current_user),
) -> Camera:
    camera = Camera(
        name=payload.name,
        location=payload.location,
        camera_type=payload.camera_type,
        source=payload.source,
    )
    db.add(camera)
    db.commit()
    db.refresh(camera)
    record_audit(
        db, user_email=user.email, action="CAMERA_CREATE", resource="cameras",
        detail=f"{camera.name} ({camera.camera_type.value})", request=request,
    )
    return camera


@router.delete(
    "/{camera_id}", response_model=Message,
    dependencies=[Depends(require_roles(UserRole.ADMIN))],
)
def delete_camera(
    camera_id: int,
    request: Request,
    db: Session = Depends(get_db),
    user: User = Depends(get_current_user),
) -> Message:
    camera = db.get(Camera, camera_id)
    if not camera:
        raise HTTPException(status_code=404, detail="Camera not found")
    engine.stop(camera_id)  # ensure no worker keeps running
    db.delete(camera)
    db.commit()
    record_audit(
        db, user_email=user.email, action="CAMERA_DELETE", resource="cameras",
        detail=f"id={camera_id}", request=request,
    )
    return Message(detail="Camera deleted")
