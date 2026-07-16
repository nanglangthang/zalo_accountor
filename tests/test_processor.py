from pathlib import Path

from PIL import Image, ImageDraw, ImageFont

from accountor_agent.processor import (
    ZaloDataProcessor,
    append_rows_to_excel,
    extract_fields_from_image,
)


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


def test_parse_text_handles_optional_spacing_around_colon():
    text = """
    Name : Nguyen Van A
    Phone : 0901234567
    Address : 123 Main Street
    Amount : 500000
    Note : Paid
    """

    processor = ZaloDataProcessor()
    payload = processor.parse_text(text)

    assert payload["name"] == "Nguyen Van A"
    assert payload["phone"] == "0901234567"
    assert payload["address"] == "123 Main Street"
    assert payload["amount"] == "500000"
    assert payload["note"] == "Paid"


def test_extract_fields_from_image_uses_ocr_text(tmp_path: Path):
    image_path = tmp_path / "sample.png"
    image = Image.new("RGB", (400, 200), color="white")
    draw = ImageDraw.Draw(image)
    font = ImageFont.load_default()
    draw.text((20, 20), "Name: Nguyen Van A", fill="black", font=font)
    draw.text((20, 45), "Phone: 0901234567", fill="black", font=font)
    draw.text((20, 70), "Address: 123 Main Street", fill="black", font=font)
    draw.text((20, 95), "Amount: 500000", fill="black", font=font)
    draw.text((20, 120), "Note: Paid", fill="black", font=font)
    image.save(image_path)

    processor = ZaloDataProcessor()
    payload = extract_fields_from_image(image_path, processor=processor)

    assert payload["name"] == "Nguyen Van A"
    assert payload["phone"] == "0901234567"
    assert payload["address"] == "123 Main Street"
    assert payload["amount"] == "500000"
    assert payload["note"] == "Paid"


def test_append_rows_to_excel_creates_workbook(tmp_path: Path):
    workbook_path = tmp_path / "output.xlsx"

    append_rows_to_excel(workbook_path, [["Alice", "123", "Road", "100", "ok"]])

    assert workbook_path.exists()
