"""Authentication routes: login + current-user info.

Login accepts the standard OAuth2 password form (so the Swagger "Authorize"
button works) and returns a JWT bearer token. Every login attempt is audited.
"""
from __future__ import annotations

import datetime as dt

from fastapi import APIRouter, Depends, HTTPException, Request, status
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session

from app.core.audit import record_audit
from app.core.security import (
    authenticate_user,
    create_access_token,
    get_current_user,
)
from app.database.db import get_db
from app.database.models import User
from app.logging_config import get_logger
from app.schemas.schemas import Token, UserOut

router = APIRouter(prefix="/api/auth", tags=["auth"])
logger = get_logger(__name__)


@router.post("/login", response_model=Token)
def login(
    request: Request,
    form: OAuth2PasswordRequestForm = Depends(),
    db: Session = Depends(get_db),
) -> Token:
    """Exchange email + password (OAuth2 'username'/'password' fields) for a JWT."""
    user = authenticate_user(db, form.username, form.password)
    if not user:
        record_audit(
            db, user_email=form.username, action="LOGIN_FAILED",
            resource="auth", detail="invalid credentials", request=request,
        )
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password",
            headers={"WWW-Authenticate": "Bearer"},
        )

    user.last_login = dt.datetime.now(dt.timezone.utc).replace(tzinfo=None)
    db.commit()

    token = create_access_token(subject=user.email, role=user.role.value)
    record_audit(db, user_email=user.email, action="LOGIN", resource="auth", request=request)
    logger.info("User logged in: %s (%s)", user.email, user.role.value)
    return Token(access_token=token, role=user.role, email=user.email)


@router.get("/me", response_model=UserOut)
def me(current: User = Depends(get_current_user)) -> User:
    """Return the currently authenticated user's profile."""
    return current
