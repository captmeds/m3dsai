-- ════════════════════════════════════════════════════════════════════════════
-- m3dsEYE — AI Traffic Radar :: reference SQL schema
--
-- This file DOCUMENTS the schema. At runtime the tables are created
-- automatically by SQLAlchemy (see app/database/db.py -> init_db()).
-- It is provided for DBAs / auditors and for PostgreSQL provisioning.
-- ════════════════════════════════════════════════════════════════════════════

CREATE TABLE IF NOT EXISTS users (
    id              INTEGER PRIMARY KEY,
    email           VARCHAR(255) UNIQUE NOT NULL,
    full_name       VARCHAR(255) DEFAULT '',
    hashed_password VARCHAR(255) NOT NULL,
    role            VARCHAR(20)  DEFAULT 'viewer',   -- admin | operator | viewer
    is_active       BOOLEAN      DEFAULT 1,
    created_at      TIMESTAMP,
    last_login      TIMESTAMP
);

CREATE TABLE IF NOT EXISTS cameras (
    id           INTEGER PRIMARY KEY,
    name         VARCHAR(120) NOT NULL,
    location     VARCHAR(255) DEFAULT '',
    camera_type  VARCHAR(20)  NOT NULL,             -- webcam | rtsp | file
    source       VARCHAR(1024) NOT NULL,            -- index / URL / path
    is_active    BOOLEAN DEFAULT 1,
    created_at   TIMESTAMP
);

CREATE TABLE IF NOT EXISTS detections (
    id                     INTEGER PRIMARY KEY,
    camera_id              INTEGER NOT NULL REFERENCES cameras(id),
    track_id               INTEGER NOT NULL,
    vehicle_type           VARCHAR(40),
    vehicle_confidence     REAL DEFAULT 0,
    best_plate_text        VARCHAR(32),
    best_plate_confidence  REAL DEFAULT 0,
    snapshot_path          VARCHAR(1024),
    plate_image_path       VARCHAR(1024),
    first_seen             TIMESTAMP,
    last_seen              TIMESTAMP
);
CREATE INDEX IF NOT EXISTS ix_detections_plate ON detections(best_plate_text);
CREATE INDEX IF NOT EXISTS ix_detections_first_seen ON detections(first_seen);

CREATE TABLE IF NOT EXISTS plate_reads (
    id                INTEGER PRIMARY KEY,
    detection_id      INTEGER NOT NULL REFERENCES detections(id),
    plate_text        VARCHAR(32),
    confidence        REAL DEFAULT 0,
    plate_image_path  VARCHAR(1024),
    created_at        TIMESTAMP
);

CREATE TABLE IF NOT EXISTS watchlist (
    id          INTEGER PRIMARY KEY,
    plate_text  VARCHAR(32) UNIQUE NOT NULL,         -- normalised (UPPER, no spaces)
    reason      VARCHAR(255) DEFAULT '',
    severity    VARCHAR(20)  DEFAULT 'medium',       -- low | medium | high
    reference   VARCHAR(120) DEFAULT '',
    is_active   BOOLEAN DEFAULT 1,
    notes       TEXT DEFAULT '',
    created_at  TIMESTAMP,
    added_by    VARCHAR(255) DEFAULT 'system'
);

CREATE TABLE IF NOT EXISTS alerts (
    id               INTEGER PRIMARY KEY,
    detection_id     INTEGER NOT NULL REFERENCES detections(id),
    watchlist_id     INTEGER NOT NULL REFERENCES watchlist(id),
    plate_text       VARCHAR(32),
    reason           VARCHAR(255) DEFAULT '',
    severity         VARCHAR(20)  DEFAULT 'medium',
    status           VARCHAR(20)  DEFAULT 'new',      -- new | acknowledged | dismissed
    created_at       TIMESTAMP,
    acknowledged_by  VARCHAR(255),
    acknowledged_at  TIMESTAMP
);

CREATE TABLE IF NOT EXISTS audit_logs (
    id          INTEGER PRIMARY KEY,
    timestamp   TIMESTAMP,
    user_email  VARCHAR(255) DEFAULT 'anonymous',
    action      VARCHAR(80),                          -- LOGIN | SEARCH | VIEW | EXPORT ...
    resource    VARCHAR(120) DEFAULT '',
    detail      TEXT DEFAULT '',
    ip_address  VARCHAR(64) DEFAULT ''
);
CREATE INDEX IF NOT EXISTS ix_audit_user ON audit_logs(user_email);
CREATE INDEX IF NOT EXISTS ix_audit_action ON audit_logs(action);
