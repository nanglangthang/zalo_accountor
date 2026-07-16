chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === 'storeRecord') {
    chrome.storage.local.get(['records'], (result) => {
      const records = result.records || [];
      records.push(message.record);
      chrome.storage.local.set({ records });
      sendResponse({ ok: true, count: records.length });
    });
    return true;
  }

  return false;
});
