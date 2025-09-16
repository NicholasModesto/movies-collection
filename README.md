# movies-collection

Simple static web app that displays a movie collection from a Google Sheet, with client-side sorting and filtering.

## Features
- Fetches rows from a Google Sheet (Title, Format, Notes) via the public visualization endpoint (no API key in the client)
- Sorts by title (ignores leading "The")
- Debounced search filter across Title and Format
- Inline error message if the spreadsheet cannot be reached

## Setup
1. In Google Sheets, share the sheet so it is viewable to anyone with the link and publish it to the web (File → Share → Publish to web).
2. Note the sheet name (defaults to `Sheet1`) and the sheet's ID from the URL.
3. Update `script.js` with your sheet ID, name, and desired range.
4. Open `index.html` in a browser to load the collection.
