"""Administrative routes: user management + data-retention control (admin only)."""
from __future__ import annotations

from fastapi import APIRouter, Depends, HTTPException, Request
from sqlalchemy.orm import Session

from app.core.audit import record_audit
from app.core.security import get_current_user, hash_password, require_roles
from app.database.db import get_db
from app.database.models import User, UserRole
from app.schemas.schemas import Message, UserCreate, UserOut
from app.services.retention import cleanup_empty_dirs, purge_old_data

router = APIRouter(prefix="/api/admin", tags=["admin"])


# ── User management ──────────────────────────────────────────────────────────
@router.get(
    "/users", response_model=list[UserOut],
    dependencies=[Depends(require_roles(UserRole.ADMIN))],
)
def list_users(db: Session = Depends(get_db)) -> list[User]:
    return db.query(User).order_by(User.id).all()


@router.post(
    "/users", response_model=UserOut,
    dependencies=[Depends(require_roles(UserRole.ADMIN))],
)
def create_user(
    payload: UserCreate,
    request: Request,
    db: Session = Depends(get_db),
    user: User = Depends(get_current_user),
) -> User:
    if db.query(User).filter(User.email == payload.email).first():
        raise HTTPException(status_code=409, detail="Email already registered")
    new_user = User(
        email=payload.email,
        full_name=payload.full_name,
        hashed_password=hash_password(payload.password),
        role=payload.role,
    )
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    record_audit(
        db, user_email=user.email, action="USER_CREATE", resource="users",
        detail=f"{payload.email} role={payload.role.value}", request=request,
    )
    return new_user


@router.delete(
    "/users/{user_id}", response_model=Message,
    dependencies=[Depends(require_roles(UserRole.ADMIN))],
)
def delete_user(
    user_id: int,
    request: Request,
    db: Session = Depends(get_db),
    user: User = Depends(get_current_user),
) -> Message:
    target = db.get(User, user_id)
    if not target:
        raise HTTPException(status_code=404, detail="User not found")
    if target.id == user.id:
        raise HTTPException(status_code=400, detail="You cannot delete your own account")
    db.delete(target)
    db.commit()
    record_audit(
        db, user_email=user.email, action="USER_DELETE", resource="users",
        detail=f"id={user_id}", request=request,
    )
    return Message(detail="User deleted")


# ── Data retention ───────────────────────────────────────────────────────────
@router.post(
    "/retention/run",
    dependencies=[Depends(require_roles(UserRole.ADMIN))],
)
def run_retention(
    request: Request,
    db: Session = Depends(get_db),
    user: User = Depends(get_current_user),
) -> dict:
    """Manually trigger the retention purge (also runnable via cron/scheduler)."""
    counts = purge_old_data(db)
    cleanup_empty_dirs()
    record_audit(
        db, user_email=user.email, action="RETENTION_RUN", resource="admin",
        detail=str(counts), request=request,
    )
    return {"purged": counts}
