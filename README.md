# zalo_accountor

Get hand-written data from the image message in Zalo app then fill it into structured excel sheet.

## Agent scaffold

This workspace now includes a small Python agent that can parse Zalo-style text fields and write them to an Excel workbook.

### Quick start

1. Install dependencies:
   - `pip install -r requirements.txt`
2. Run the CLI with sample data:
   - `python -m accountor_agent`
3. Or provide your own text:
   - `python -m accountor_agent "Name: Alice\nPhone: 0901234567\nAddress: 123 Main Street\nAmount: 500000\nNote: Paid" --output output.xlsx`

### Structure

- `src/accountor_agent/processor.py` – parsing and Excel writing logic
- `src/accountor_agent/cli.py` – command-line entry point
- `tests/test_processor.py` – basic regression tests
