"""m3dsEYE — AI Traffic Radar.

A privacy-aware, modular ANPR (Automatic Number Plate Recognition) and vehicle
monitoring system intended for AUTHORISED law-enforcement / government use only.

Package layout
--------------
    app.config        Centralised settings (env-driven).
    app.database       SQLAlchemy models + session management.
    app.schemas        Pydantic request/response models.
    app.core           Cross-cutting concerns: security (auth), audit logging.
    app.detection      Vehicle + plate detection and object tracking.
    app.ocr            OCR engine abstraction (EasyOCR / Tesseract / mock).
    app.pipeline       Video sources, privacy filters, the processing loop.
    app.services       Business logic: watchlist matching, retention, persistence.
    app.api            FastAPI routers (auth, cameras, detections, etc.).
    app.static         Self-contained HTML/JS dashboard.
"""

__version__ = "0.1.0"
