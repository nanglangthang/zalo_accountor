from __future__ import annotations

import os
from pathlib import Path
from typing import Optional

try:
    import pytesseract
    from PIL import Image
except ImportError:  # pragma: no cover
    pytesseract = None
    Image = None


class OCRBackend:
    def extract_text(self, image_path: str | Path) -> str:
        raise NotImplementedError


class TesseractOCR(OCRBackend):
    def __init__(self, tessdata_dir: Optional[str] = None):
        self.tessdata_dir = tessdata_dir

    def extract_text(self, image_path: str | Path) -> str:
        if pytesseract is None or Image is None:
            raise RuntimeError("pytesseract and pillow are required")

        if self.tessdata_dir:
            os.environ['TESSDATA_PREFIX'] = self.tessdata_dir

        image = Image.open(image_path)
        image.load()
        return pytesseract.image_to_string(image)


class PlaceholderOCR(OCRBackend):
    def extract_text(self, image_path: str | Path) -> str:
        return ""
