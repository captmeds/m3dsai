"""Detection feed: search, filter, detail view, and audited CSV export.

Every search/view/export is recorded in the audit trail (privacy requirement).
Supports filtering by plate number, date range, camera, and vehicle type.
"""
from __future__ import annotations

import csv
import datetime as dt
import io
from typing import Optional

from fastapi import APIRouter, Depends, HTTPException, Query, Request
from fastapi.responses import StreamingResponse
from sqlalchemy.orm import Session

from app.core.audit import record_audit
from app.core.security import get_current_user, require_roles
from app.database.db import get_db
from app.database.models import Alert, Camera, Detection, User, UserRole
from app.ocr.ocr_engine import normalise_plate
from app.schemas.schemas import DetectionDetail, DetectionOut

router = APIRouter(prefix="/api/detections", tags=["detections"])


def _apply_filters(
    query,
    plate: Optional[str],
    camera_id: Optional[int],
    vehicle_type: Optional[str],
    date_from: Optional[dt.date],
    date_to: Optional[dt.date],
):
    """Apply the standard dashboard filters to a Detection query."""
    if plate:
        query = query.filter(Detection.best_plate_text.contains(normalise_plate(plate)))
    if camera_id:
        query = query.filter(Detection.camera_id == camera_id)
    if vehicle_type:
        query = query.filter(Detection.vehicle_type == vehicle_type)
    if date_from:
        query = query.filter(Detection.first_seen >= dt.datetime.combine(date_from, dt.time.min))
    if date_to:
        query = query.filter(Detection.first_seen <= dt.datetime.combine(date_to, dt.time.max))
    return query


@router.get("", response_model=list[DetectionOut])
def search_detections(
    request: Request,
    plate: Optional[str] = Query(None, description="Plate substring (normalised)"),
    camera_id: Optional[int] = Query(None),
    vehicle_type: Optional[str] = Query(None),
    date_from: Optional[dt.date] = Query(None),
    date_to: Optional[dt.date] = Query(None),
    limit: int = Query(100, le=500),
    offset: int = Query(0, ge=0),
    db: Session = Depends(get_db),
    user: User = Depends(get_current_user),
) -> list[Detection]:
    """Search/filter the detection feed. Audited as a SEARCH."""
    query = _apply_filters(
        db.query(Detection), plate, camera_id, vehicle_type, date_from, date_to
    )
    results = (
        query.order_by(Detection.first_seen.desc()).offset(offset).limit(limit).all()
    )
    record_audit(
        db, user_email=user.email, action="SEARCH", resource="detections",
        detail=(
            f"plate={plate} camera_id={camera_id} type={vehicle_type} "
            f"from={date_from} to={date_to} -> {len(results)} rows"
        ),
        request=request,
    )
    return results


@router.get("/{detection_id}", response_model=DetectionDetail)
def get_detection(
    detection_id: int,
    request: Request,
    db: Session = Depends(get_db),
    user: User = Depends(get_current_user),
) -> DetectionDetail:
    """View a single detection with its plate reads + watchlist status. Audited as VIEW."""
    det = db.get(Detection, detection_id)
    if not det:
        raise HTTPException(status_code=404, detail="Detection not found")

    camera = db.get(Camera, det.camera_id)
    is_watchlisted = (
        db.query(Alert).filter(Alert.detection_id == det.id).first() is not None
    )
    record_audit(
        db, user_email=user.email, action="VIEW", resource="detections",
        detail=f"id={detection_id} plate={det.best_plate_text}", request=request,
    )

    detail = DetectionDetail.model_validate(det)
    detail.plate_reads = det.plate_reads  # type: ignore[assignment]
    detail.camera_name = camera.name if camera else None
    detail.camera_location = camera.location if camera else None
    detail.is_watchlisted = is_watchlisted
    return detail


@router.get(
    "/export/csv",
    dependencies=[Depends(require_roles(UserRole.ADMIN, UserRole.OPERATOR))],
)
def export_csv(
    request: Request,
    plate: Optional[str] = Query(None),
    camera_id: Optional[int] = Query(None),
    vehicle_type: Optional[str] = Query(None),
    date_from: Optional[dt.date] = Query(None),
    date_to: Optional[dt.date] = Query(None),
    db: Session = Depends(get_db),
    user: User = Depends(get_current_user),
) -> StreamingResponse:
    """Export the filtered detections as CSV. Audited as EXPORT (admin/operator only)."""
    query = _apply_filters(
        db.query(Detection), plate, camera_id, vehicle_type, date_from, date_to
    )
    rows = query.order_by(Detection.first_seen.desc()).all()

    buf = io.StringIO()
    writer = csv.writer(buf)
    writer.writerow(
        ["id", "camera_id", "vehicle_type", "plate", "plate_confidence",
         "first_seen", "last_seen"]
    )
    for d in rows:
        writer.writerow([
            d.id, d.camera_id, d.vehicle_type, d.best_plate_text or "",
            f"{d.best_plate_confidence:.3f}", d.first_seen, d.last_seen,
        ])
    buf.seek(0)

    record_audit(
        db, user_email=user.email, action="EXPORT", resource="detections",
        detail=f"{len(rows)} rows exported (csv)", request=request,
    )
    return StreamingResponse(
        iter([buf.getvalue()]),
        media_type="text/csv",
        headers={"Content-Disposition": "attachment; filename=detections.csv"},
    )
