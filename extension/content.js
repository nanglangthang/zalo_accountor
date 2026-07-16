let isCapturing = false;

function extractTextFromMessages() {
  const messages = Array.from(document.querySelectorAll('[data-mention-id], .message, .chat-message, .msg-item'));
  return messages
    .map((node) => node.textContent)
    .filter(Boolean)
    .slice(0, 20);
}

function extractRecord() {
  const textItems = extractTextFromMessages();
  const combined = textItems.join('\n');
  const record = {
    id: Date.now().toString(),
    rawText: combined,
    parsedFields: {
      name: '',
      phone: '',
      address: '',
      amount: '',
      note: ''
    },
    source: 'content-script'
  };

  const match = combined.match(/name:\s*([^\n]+)/i);
  if (match) record.parsedFields.name = match[1].trim();

  const phoneMatch = combined.match(/phone:\s*([^\n]+)/i);
  if (phoneMatch) record.parsedFields.phone = phoneMatch[1].trim();

  const addressMatch = combined.match(/address:\s*([^\n]+)/i);
  if (addressMatch) record.parsedFields.address = addressMatch[1].trim();

  const amountMatch = combined.match(/amount:\s*([^\n]+)/i);
  if (amountMatch) record.parsedFields.amount = amountMatch[1].trim();

  const noteMatch = combined.match(/note:\s*([^\n]+)/i);
  if (noteMatch) record.parsedFields.note = noteMatch[1].trim();

  return record;
}

async function captureOnce() {
  if (!isCapturing) return;
  const record = extractRecord();
  await chrome.runtime.sendMessage({ action: 'storeRecord', record });
  setTimeout(captureOnce, 5000);
}

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === 'startCapture') {
    isCapturing = true;
    captureOnce();
    sendResponse({ ok: true });
    return true;
  }

  if (message.action === 'stopCapture') {
    isCapturing = false;
    sendResponse({ ok: true });
    return true;
  }

  return false;
});
