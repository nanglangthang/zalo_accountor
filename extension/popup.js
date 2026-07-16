const startBtn = document.getElementById('startBtn');
const stopBtn = document.getElementById('stopBtn');
const exportBtn = document.getElementById('exportBtn');
const output = document.getElementById('output');
const status = document.getElementById('status');

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

startBtn.addEventListener('click', async () => {
  status.textContent = 'Capturing...';
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  await chrome.tabs.sendMessage(tab.id, { action: 'startCapture' });
  status.textContent = 'Capture started';
});

stopBtn.addEventListener('click', async () => {
  status.textContent = 'Stopping...';
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  await chrome.tabs.sendMessage(tab.id, { action: 'stopCapture' });
  status.textContent = 'Capture stopped';
});

exportBtn.addEventListener('click', async () => {
  const data = await chrome.storage.local.get(['records']);
  const records = buildExportPayload(data.records || []);
  output.value = JSON.stringify(records, null, 2);
  status.textContent = `Exporting ${records.length} records`;
  const blob = new Blob([JSON.stringify(records, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  chrome.downloads.download({ url, filename: 'zalo-export.json' });
});
