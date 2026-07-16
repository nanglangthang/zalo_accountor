# Requirements: Zalo-to-Excel Chrome Extension

## 1. Product Summary
Build a Chrome extension that helps users extract structured information from Zalo chat messages and images, then export the results into an Excel workbook.

## 2. Goals
- Allow users to capture messages from a selected Zalo chat.
- Extract text from images shared in the chat using OCR.
- Parse relevant values into a structured schema.
- Export parsed records into an .xlsx file.
- Support manual review before final export.

## 3. Scope
### In scope
- Chrome extension for Zalo Web
- Message extraction from visible chat content
- Image capture and OCR processing
- Rule-based field extraction
- Excel export with a standard worksheet schema
- Basic review UI

### Out of scope for MVP
- Full automation of all possible Zalo UI variations
- Mobile app integration
- Advanced AI-based entity extraction
- Multi-user collaboration
- Cloud storage/backend service

## 4. User Stories
- As a user, I want to open a Zalo chat and start capture so I can collect data automatically.
- As a user, I want the extension to read text and images from the chat so I do not have to copy data manually.
- As a user, I want extracted data to be organized into fields such as name, phone, address, amount, and note.
- As a user, I want to review the extracted results before exporting them.
- As a user, I want to download a structured Excel file containing the collected records.

## 5. Functional Requirements
### FR1: Extension UI
The extension shall provide a popup with actions to:
- start capture,
- stop capture,
- review extracted records,
- export to Excel.

### FR2: Chat content capture
The extension shall read visible messages from the current Zalo chat conversation.

### FR3: Image capture
The extension shall detect images attached to messages and attempt OCR extraction.

### FR4: Extraction
The extension shall parse raw message and OCR text into a structured record with fields:
- name
- phone
- address
- amount
- note

### FR5: Review
The extension shall allow the user to review and edit extracted fields before export.

### FR6: Export
The extension shall generate an Excel workbook containing one row per record.

### FR7: Persistence
The extension shall store captured records locally in the browser during the session.

## 6. Non-Functional Requirements
- The extension should work on current versions of Chrome.
- The UI should remain responsive during capture and OCR.
- OCR accuracy should be acceptable for typical screenshots and photos.
- The export file should be compatible with Microsoft Excel and LibreOffice.

## 7. Technical Constraints
- Extension must run in a browser environment.
- Access to Zalo page content is limited by browser extension permissions.
- OCR implementation may rely on a lightweight local library for MVP.
- The project should be structured so future AI-based extraction can be added.

## 8. Acceptance Criteria
- A user can open the extension popup and start capture.
- The extension captures text and images from the current chat.
- The extracted data is shown in a review list.
- The user can export the reviewed data as an .xlsx file.
