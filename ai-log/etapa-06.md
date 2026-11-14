# Stage 6: AI log

## Tools

- Kiro in the IDE
- Stage 6 guide supplied in the conversation
- `json-server` 0.17.4
- Frontend lint and production build scripts
- Headless Google Chrome checks for loading, success, and error states
- HTTP requests against the generated `/facturi` route

## Conversation

- Kiro conversation for moving the Smart Invoice Payer data to a mock REST API
  and adding explicit request states to the React interface

## Key requests

### 1. Add a mock REST API

- Asked: Move the data out of React, preserve the three existing invoices, add two
  more records, and expose the collection through `json-server` on port 3001.
- Got: `frontend/db.json` contains five invoices and the `api` package script starts
  the fixed `json-server` 0.17.4 dependency at `GET /facturi`.
- Changed or rejected: Adapted the guide's `tasks` resource and fields to the
  project's `facturi`, `titlu`, `platita`, and `urgenta` model.

### 2. Centralize requests and display all request states

- Asked: Keep `fetch` in one API module, read its base URL from a Vite environment
  variable, and load data from `App.jsx` with `useEffect`.
- Got: `src/api.js` checks `response.ok` and returns parsed JSON. `App.jsx` starts
  with an empty list and displays loading, error, or success content. The effect
  cleanup prevents a completed request from updating an unmounted component.
- Changed or rejected: Preserved the Stage 5 checkbox, delete, and theme controls.
  Checkbox and delete changes remain local until the server-write stage.

### 3. Document and verify the stage

- Asked: Add setup commands, a Stage 6 checklist, an environment example, and an AI
  journal entry, then validate the result.
- Got: The README describes the two-terminal workflow and test cases. `.env.example`
  documents `VITE_API_URL`. The API route, lint, and production build are checked
  locally.
- Changed or rejected: Publication is left pending because committing would include
  pre-existing local UI changes and pushing sends changes to GitHub.

## What I learned / what did not work

`fetch` only rejects when the request cannot be made, so `api.js` must inspect
`response.ok` to turn HTTP 4xx and 5xx responses into application errors. Keeping
that check in one module gives every component the same behavior. React development
mode may request `/facturi` twice because `StrictMode` mounts the component twice;
the effect cleanup ignores the obsolete response. Headless browser checks confirmed
the loading, successful response, and failed-request interfaces. The generated
route, static checks, and production bundle were also validated locally.
