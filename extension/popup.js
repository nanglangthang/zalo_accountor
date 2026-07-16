const startBtn = document.getElementById('startBtn');
const stopBtn = document.getElementById('stopBtn');
const exportBtn = document.getElementById('exportBtn');
const output = document.getElementById('output');
const status = document.getElementById('status');
const recordList = document.getElementById('recordList');

function buildExportPayload(records) {
  return records.map((record) => ({
    ...record,
    parsedFields: record.parsedFields || {
      name: '',
      phone: '',
      address: '',
      amount: '',
      note: ''
    }
  }));
}

function renderRecords(records) {
  if (!records.length) {
    recordList.innerHTML = '<div class="item">No records yet.</div>';
    return;
  }

  recordList.innerHTML = records
    .slice(-5)
    .reverse()
    .map((record) => {
      const fields = record.parsedFields || {};
      return `<div class="item"><strong>${fields.name || 'Unnamed'}</strong><br/>Phone: ${fields.phone || '-'}<br/>Amount: ${fields.amount || '-'}</div>`;
    })
    .join('');
}

async function refreshRecords() {
  const data = await chrome.storage.local.get(['records']);
  const records = data.records || [];
  renderRecords(records);
  return records;
}

startBtn.addEventListener('click', async () => {
  status.textContent = 'Capturing...';
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  await chrome.tabs.sendMessage(tab.id, { action: 'startCapture' });
  await refreshRecords();
  status.textContent = 'Capture started';
});

stopBtn.addEventListener('click', async () => {
  status.textContent = 'Stopping...';
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  await chrome.tabs.sendMessage(tab.id, { action: 'stopCapture' });
  await refreshRecords();
  status.textContent = 'Capture stopped';
});

exportBtn.addEventListener('click', async () => {
  const data = await chrome.storage.local.get(['records']);
  const records = buildExportPayload(data.records || []);
  output.value = JSON.stringify(records, null, 2);
  status.textContent = `Exporting ${records.length} records`;

  const workbook = XLSX.utils.book_new();
  const sheet = XLSX.utils.aoa_to_sheet([
    ['name', 'phone', 'address', 'amount', 'note'],
    ...records.map((record) => [
      record.parsedFields?.name || '',
      record.parsedFields?.phone || '',
      record.parsedFields?.address || '',
      record.parsedFields?.amount || '',
      record.parsedFields?.note || ''
    ])
  ]);
  XLSX.utils.book_append_sheet(workbook, sheet, 'ZaloData');

  const blob = new Blob([XLSX.write(workbook, { type: 'array', bookType: 'xlsx' })], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
  const url = URL.createObjectURL(blob);
  chrome.downloads.download({ url, filename: 'zalo-export.xlsx' });
});

refreshRecords();
