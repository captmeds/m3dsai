"""Download / prepare ML model weights (OPTIONAL).

By default this fetches the small YOLOv8n COCO model used for vehicle detection.
A dedicated licence-plate model is NOT bundled (licences vary); see the notes
printed below for good open options. Without any weights the system runs in MOCK
mode, so this step is entirely optional.

Run:
    python -m scripts.download_models
"""
from __future__ import annotations

import sys
from pathlib import Path

sys.path.insert(0, ".")

from app.config import settings  # noqa: E402
from app.logging_config import get_logger  # noqa: E402

logger = get_logger("download_models")


def main() -> None:
    Path("models").mkdir(exist_ok=True)
    try:
        from ultralytics import YOLO
    except Exception:
        print(
            "\n  ultralytics is not installed. Install ML extras first:\n"
            "      pip install -r requirements-ml.txt\n"
            "  (The system still runs without it, in MOCK mode.)\n"
        )
        return

    target = settings.vehicle_model_path
    logger.info("Fetching vehicle model -> %s", target)
    # Ultralytics auto-downloads the official weights by name on first load.
    model = YOLO("yolov8n.pt")
    # Persist to the configured path so the app loads it deterministically.
    try:
        Path(model.ckpt_path).replace(target) if hasattr(model, "ckpt_path") else None
    except Exception:
        pass
    logger.info("✔ Vehicle model ready.")

    print(
        "\n  Vehicle model is set up.\n\n"
        "  OPTIONAL — dedicated licence-plate detector:\n"
        "    The heuristic plate detector works out-of-the-box. For higher\n"
        "    accuracy, drop a YOLO plate model at:\n"
        f"        {settings.plate_model_path}\n"
        "    Popular open options (verify the licence for your jurisdiction):\n"
        "      • Roboflow 'License Plate Recognition' YOLO exports\n"
        "      • Open ANPR / openalpr-style datasets retrained on YOLOv8\n"
    )


if __name__ == "__main__":
    main()
