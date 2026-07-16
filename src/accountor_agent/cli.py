from __future__ import annotations

import argparse
from pathlib import Path

from accountor_agent.processor import ZaloDataProcessor, append_rows_to_excel


def main() -> None:
    parser = argparse.ArgumentParser(description="Process Zalo message data into an Excel workbook")
    parser.add_argument("text", nargs="?", help="Raw text containing Name/Phone/Address/Amount/Note fields")
    parser.add_argument("--output", default="output.xlsx", help="Path to write the Excel workbook")
    args = parser.parse_args()

    if not args.text:
        sample = """Name: Nguyen Van A
Phone: 0901234567
Address: 123 Main Street
Amount: 500000
Note: Paid"""
        args.text = sample

    processor = ZaloDataProcessor()
    row = processor.process_text(args.text)
    append_rows_to_excel(args.output, [row])
    print(f"Wrote row to {Path(args.output).resolve()}")


if __name__ == "__main__":
    main()
