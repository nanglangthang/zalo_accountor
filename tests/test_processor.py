from pathlib import Path

from accountor_agent.processor import ZaloDataProcessor, append_rows_to_excel


def test_parse_text_extracts_fields():
    text = """
    Name: Nguyen Van A
    Phone: 0901234567
    Address: 123 Main Street
    Amount: 500000
    Note: Paid
    """

    processor = ZaloDataProcessor()
    payload = processor.parse_text(text)

    assert payload["name"] == "Nguyen Van A"
    assert payload["phone"] == "0901234567"
    assert payload["address"] == "123 Main Street"
    assert payload["amount"] == "500000"
    assert payload["note"] == "Paid"


def test_append_rows_to_excel_creates_workbook(tmp_path: Path):
    workbook_path = tmp_path / "output.xlsx"

    append_rows_to_excel(workbook_path, [["Alice", "123", "Road", "100", "ok"]])

    assert workbook_path.exists()
