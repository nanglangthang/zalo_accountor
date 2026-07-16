# Chrome Extension Scaffold

This folder contains the initial Chrome extension implementation for the Zalo-to-Excel workflow.

## Files
- manifest.json: extension manifest
- popup.html/js: popup UI and actions
- content.js: injected script for chat capture
- background.js: storage handling
- parser.js: simple field extraction helper
- export.js: workbook export helper

## Next steps
1. Load the extension in Chrome via chrome://extensions.
2. Enable Developer mode.
3. Click Load unpacked and select the extension folder.
4. Open Zalo Web and test the popup actions.
