from __future__ import annotations

import re
from pathlib import Path
from typing import Iterable

from openpyxl import Workbook, load_workbook


class ZaloDataProcessor:
    """Simple processor that transforms Zalo-style text into workbook rows."""

    headers = ["name", "phone", "address", "amount", "note"]

    def parse_text(self, text: str) -> dict[str, str]:
        normalized = "\n".join(line.strip() for line in text.splitlines() if line.strip())
        values: dict[str, str] = {}

        for label in ["name", "phone", "address", "amount", "note"]:
            match = re.search(rf"{label}:\s*(.+)", normalized, flags=re.IGNORECASE)
            if match:
                values[label] = match.group(1).strip()

        return values

    def build_row(self, payload: dict[str, str]) -> list[str]:
        return [payload.get(header, "") for header in self.headers]

    def process_text(self, text: str) -> list[str]:
        payload = self.parse_text(text)
        return self.build_row(payload)


def parse_zalo_payload(text: str) -> dict[str, str]:
    return ZaloDataProcessor().parse_text(text)


def append_rows_to_excel(workbook_path: str | Path, rows: Iterable[Iterable[str]]) -> Path:
    path = Path(workbook_path)
    path.parent.mkdir(parents=True, exist_ok=True)

    if path.exists():
        workbook = load_workbook(path)
        sheet = workbook.active
    else:
        workbook = Workbook()
        sheet = workbook.active
        sheet.title = "ZaloData"
        sheet.append(["name", "phone", "address", "amount", "note"])

    for row in rows:
        sheet.append(list(row))

    workbook.save(path)
    return path
