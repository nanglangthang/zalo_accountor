from __future__ import annotations

import argparse
from pathlib import Path

from accountor_agent.processor import (
    ZaloDataProcessor,
    append_rows_to_excel,
    extract_fields_from_image,
)


def main() -> None:
    parser = argparse.ArgumentParser(description="Process Zalo message data or a ticket image into an Excel workbook")
    parser.add_argument("source", nargs="?", help="Raw text or an image path to process")
    parser.add_argument("--output", default="output.xlsx", help="Path to write the Excel workbook")
    args = parser.parse_args()

    processor = ZaloDataProcessor()
    source_path = Path(args.source) if args.source else None

    if source_path and source_path.exists() and source_path.is_file():
        payload = extract_fields_from_image(source_path, processor=processor)
        row = processor.build_row(payload)
    else:
        text = args.source or """Name: Nguyen Van A
Phone: 0901234567
Address: 123 Main Street
Amount: 500000
Note: Paid"""
        row = processor.process_text(text)

    append_rows_to_excel(args.output, [row])
    print(f"Wrote row to {Path(args.output).resolve()}")


if __name__ == "__main__":
    main()
