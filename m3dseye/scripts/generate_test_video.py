"""Generate a synthetic traffic test video (no external assets required).

Produces ``data/videos/test_traffic.mp4``: a simple animation of coloured
"vehicles" with drawn rectangular "number plates" sweeping across the frame.

This lets you exercise the FULL pipeline (vehicle boxes, tracking, plate region,
OCR, dedup, dashboard) offline. With real YOLO/OCR installed the synthetic plates
are simplistic; the MOCK detector/OCR path gives the most coherent demo.

Run:
    python -m scripts.generate_test_video
"""
from __future__ import annotations

import sys

sys.path.insert(0, ".")

import cv2  # noqa: E402
import numpy as np  # noqa: E402

from app.config import settings  # noqa: E402
from app.logging_config import get_logger  # noqa: E402

logger = get_logger("generate_test_video")

W, H, FPS, SECONDS = 960, 540, 25, 20
PLATES = ["AB12 CDE", "STOLEN1", "XY98 ZZZ", "WANTED7", "GV67 TRK"]
COLOURS = [(60, 60, 200), (60, 160, 60), (200, 120, 40), (160, 60, 160), (40, 160, 200)]


def draw_vehicle(frame, x, y, w, h, colour, plate_text):
    """Draw a crude car body with a white number plate."""
    cv2.rectangle(frame, (x, y), (x + w, y + h), colour, -1)
    cv2.rectangle(frame, (x + int(w * 0.1), y - int(h * 0.35)),
                  (x + int(w * 0.9), y), colour, -1)  # cabin
    # Number plate (white box + black text) in the lower-centre.
    pw, ph = int(w * 0.55), int(h * 0.22)
    px, py = x + (w - pw) // 2, y + int(h * 0.62)
    cv2.rectangle(frame, (px, py), (px + pw, py + ph), (255, 255, 255), -1)
    cv2.rectangle(frame, (px, py), (px + pw, py + ph), (0, 0, 0), 2)
    cv2.putText(frame, plate_text, (px + 6, py + ph - 8),
                cv2.FONT_HERSHEY_SIMPLEX, 0.6, (0, 0, 0), 2)


def main() -> None:
    out_path = settings.video_path / "test_traffic.mp4"
    settings.video_path.mkdir(parents=True, exist_ok=True)
    fourcc = cv2.VideoWriter_fourcc(*"mp4v")
    writer = cv2.VideoWriter(str(out_path), fourcc, FPS, (W, H))
    if not writer.isOpened():
        logger.error("Could not open VideoWriter — is your OpenCV build OK?")
        return

    total = FPS * SECONDS
    vehicle_w, vehicle_h = int(W * 0.22), int(H * 0.20)
    spacing = total // len(PLATES)

    for f in range(total):
        frame = np.full((H, W, 3), (40, 42, 46), np.uint8)
        # Road.
        cv2.rectangle(frame, (0, int(H * 0.5)), (W, H), (70, 70, 70), -1)
        for lx in range(0, W, 80):
            cv2.rectangle(frame, (lx + (f * 6) % 80, int(H * 0.72)),
                          (lx + 40 + (f * 6) % 80, int(H * 0.74)), (220, 220, 220), -1)

        # One vehicle per slot, sweeping left -> right.
        idx = f // spacing
        if idx < len(PLATES):
            local = f % spacing
            progress = local / float(spacing)
            x = int(progress * (W + vehicle_w)) - vehicle_w
            y = int(H * 0.55)
            draw_vehicle(frame, x, y, vehicle_w, vehicle_h, COLOURS[idx], PLATES[idx])

        cv2.putText(frame, "m3dsEYE synthetic test footage", (12, 28),
                    cv2.FONT_HERSHEY_SIMPLEX, 0.7, (200, 200, 200), 2)
        writer.write(frame)

    writer.release()
    logger.info("✔ Wrote %s (%dx%d, %ds @ %dfps)", out_path, W, H, SECONDS, FPS)
    print(f"\n  Test video ready: {out_path}\n")


if __name__ == "__main__":
    main()
