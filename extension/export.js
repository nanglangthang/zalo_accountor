const XLSX = require('xlsx');

function exportRecordsToWorkbook(records) {
  const rows = records.map((record) => {
    const fields = record.parsedFields || {};
    return [fields.name || '', fields.phone || '', fields.address || '', fields.amount || '', fields.note || ''];
  });

  const workbook = XLSX.utils.book_new();
  const sheet = XLSX.utils.aoa_to_sheet([['name', 'phone', 'address', 'amount', 'note'], ...rows]);
  XLSX.utils.book_append_sheet(workbook, sheet, 'ZaloData');
  return XLSX.write(workbook, { type: 'buffer', bookType: 'xlsx' });
}

module.exports = { exportRecordsToWorkbook };
