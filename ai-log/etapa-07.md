# Stage 7: AI log

## Tools

- Kiro in the IDE
- Stage 7 guide supplied in the conversation
- `json-server` 0.17.4, including the `--delay 3000` option
- Frontend lint and production build scripts
- Headless Google Chrome driven through the DevTools Protocol

## Conversation

- Kiro conversation for adding an invoice form with validation and saving every
  change in Smart Invoice Payer through the mock REST API

## Key requests

### 1. Extend the API module

- Asked: Replace the single read function with a shared `request` helper and one
  function per operation.
- Got: `src/api.js` sets the JSON header, checks `response.ok`, handles `204 No
  Content`, and exports `fetchFacturi`, `createFactura`, `updateFactura`, and
  `deleteFactura`.
- Changed or rejected: Adapted the guide's `tasks` route and names to `facturi`.

### 2. Add a controlled, validated form

- Asked: Create a form component whose fields use `value` and `onChange`, validate
  before submitting, and show errors next to the form.
- Got: `InvoiceForm` has a title field and an urgency select. It rejects empty or
  whitespace-only titles, titles longer than 100 characters, and unknown urgency
  values. The button is disabled while saving, and the fields are cleared only
  after the server confirms the save.
- Changed or rejected: Used `urgenta` instead of the guide's `prioritate`, with the
  project's values `scazuta`, `medie`, and `mare`. Kept the existing `item-form`
  CSS class from the mockup instead of adding a new `task-form` class.

### 3. Save toggle and delete on the server

- Asked: Send `PATCH` and `DELETE` requests before changing state, and use the
  object returned by the server.
- Got: `App.jsx` updates the list with the created or updated invoice from the
  server. Add errors return to the form; toggle and delete errors appear above the
  list while the list stays visible.
- Changed or rejected: Kept the Stage 5 theme toggle. Page error messages include
  the operation that failed.

### 4. Prepare automatic checks and document the stage

- Asked: Add `tw.json`, the `data-testid` attributes from table 7.3, the README
  section, and this journal entry.
- Got: `tw.json` points to `facturi`, `titlu`, `platita`, and the sample
  `urgenta: "mare"`. Cards carry `data-id` with the server id, and the urgency
  select uses `form-urgenta`.
- Changed or rejected: The layout returned to two columns, with the form on the
  left and the list on the right; the existing mobile rule keeps one column.

## What I learned / what did not work

Updating state only after the server responds keeps the screen in sync with
`db.json` and lets the server assign IDs. Letting `handleAdd` rethrow its error
is what allows the form to show the failure and keep the typed title.

Browser scenarios checked that an invalid submit sends no request, a new invoice
gets the next server ID and survives a reload, toggles and deletes persist, a
stopped API produces `Failed to fetch` in the form without clearing it, and a
double click during a delayed save creates only one invoice. The test data was
removed from `db.json` afterwards.
