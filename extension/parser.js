function parseMessageText(rawText) {
  const lines = rawText
    .split(/\n|\r/)
    .map((line) => line.trim())
    .filter(Boolean);

  const fields = {
    name: '',
    phone: '',
    address: '',
    amount: '',
    note: ''
  };

  for (const line of lines) {
    if (!line) continue;
    if (/name/i.test(line)) fields.name = line.replace(/^name[:\-\s]*/i, '');
    else if (/phone/i.test(line)) fields.phone = line.replace(/^phone[:\-\s]*/i, '');
    else if (/address/i.test(line)) fields.address = line.replace(/^address[:\-\s]*/i, '');
    else if (/amount/i.test(line)) fields.amount = line.replace(/^amount[:\-\s]*/i, '');
    else if (/note/i.test(line)) fields.note = line.replace(/^note[:\-\s]*/i, '');
  }

  return fields;
}

function buildExcelRow(record) {
  const parsed = record.parsedFields || parseMessageText(record.rawText);
  return [parsed.name, parsed.phone, parsed.address, parsed.amount, parsed.note];
}

if (typeof module !== 'undefined') {
  module.exports = { parseMessageText, buildExcelRow };
}
