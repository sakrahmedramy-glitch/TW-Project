# Stage 9 AI log

## Tools

- Codex, the supplied Stage 9 PDF guide, Node.js, npm, curl, Chrome, and Git.

## Request and result

The user asked to implement Stage 9 of Smart Invoice Payer. Codex read the PDF
and checked the existing resource in `tw.json`, the urgency values in React,
and the data previously served by the mock API.

- Created an Express 5 API with separate files for application middleware,
  server startup, invoice routes, and validation.
- Moved the six existing invoices into memory. The API keeps their IDs and
  assigns a new ID to each invoice added during the run.
- Kept the existing `/facturi` contract and added server-side checks on title,
  urgency, payment status, and IDs. POST sets defaults, while PATCH keeps
  omitted fields.
- Configured the allowed origin and port through environment variables. The
  startup scripts load `backend/.env` if it exists.
- Updated the frontend to display the API error message and removed the mock
  service, its script, and its data file. The invoice title exposes both the
  Stage 7 title selector and the Stage 8 detail-link selector.

## Verification

- Installed both projects from their lockfiles. Frontend lint and the production
  build passed.
- Exercised all five invoice endpoints with curl and checked malformed input,
  ignored fields, and CORS preflight with HTTP assertions.
- Checked adding, marking as paid, opening details, deleting, and reloading in
  Chrome. The API's missing-invoice message appeared in the UI. Chrome reported
  no CORS errors.
- Reproduced a PATCH request with a text body returning success without updating
  anything. Removed the empty-object fallback for PATCH and verified a JSON 400
  response for that request.

## What I learned

The React components could keep their CRUD behavior because all the HTTP calls
were already in `api.js`. Browser reloads fetch the current data from the server
process, while restarting the process restores the six initial invoices.
