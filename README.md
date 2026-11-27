# Smart Invoice Payer

A React app for tracking utility bills, rent, and subscription invoices.
It highlights payment status and urgency so users can see which invoices are still due.

## Data model

| Field | Type | Notes |
|---|---|---|
| name | Text | Required invoice title, maximum 100 characters |
| paid | Boolean | Whether the invoice is paid; defaults to false |
| urgency | Fixed values | Scăzută, Medie, or Mare |
| category | Relation | Utilități, Chirie, or Abonamente |
| user | Relation | Owner of the invoice; introduced in week 11 |

Sample data used across all stages:

| Invoice | Status | Tag |
|---|---|---|
| Factură electricitate | Neplătită | Urgență mare |
| Abonament internet | Plătită | Urgență medie |
| Factură apă | Neplătită | Urgență scăzută |

## How to run

Use Node.js 22.9 or newer. Start the Express API in the first terminal:

```sh
cd backend
npm ci
npm run dev
```

Start the React app in a second terminal from the repository root:

```sh
cd frontend
npm ci
npm run dev
```

Open `http://localhost:5173`. The API runs at `http://localhost:3001`.
For custom settings, copy `backend/.env.example` to `backend/.env` and edit
`PORT` and `CORS_ORIGIN`. If the API address changes, set `VITE_API_URL` in
`frontend/.env`. Use `npm start` in `backend/` to run without watch mode.

Pages: `/` (invoice list and form), `/facturi/:id` (invoice details), `/despre`
(about), and a 404 page for any other address.
The original static mockup and Stage 2 data logic are preserved in `mockup/`.

## Stage 2: data logic

Plain JavaScript, no DOM access. `mockup/facturi.js` contains the sample invoice data and immutable functions
for listing titles, counting unpaid invoices, searching, adding with validation, toggling payment status,
and deleting. The grouped examples and assertions run in the browser console when the page loads
(F12 or Ctrl + Shift + J).

The add function trims and validates the title (1–100 characters), checks the urgency value, defaults
urgency to `medie`, and uses a monotonically increasing ID counter so deleted IDs are not reused.
Each operation returns a new array and leaves its input unchanged.

### Stage 2 verification checklist

| ID | Requirement | Where (permalink) | How to check |
|---|---|---|---|
| S2-R1 | JavaScript is linked and logs on page load | [index.html](https://github.com/sakrahmedramy-glitch/TW-Project/blob/9f675aa/index.html#L72) | Open the page and inspect the browser console |
| S2-R2 | Three invoices have an id, title, state, and urgency | [facturi.js](https://github.com/sakrahmedramy-glitch/TW-Project/blob/9f675aa/facturi.js#L1-L5) | Read the initial array |
| S2-R3 | List, count, search, add, toggle, and delete work | [facturi.js](https://github.com/sakrahmedramy-glitch/TW-Project/blob/9f675aa/facturi.js#L9-L75) | Inspect grouped console output and assertions |
| S2-R4 | Empty titles and invalid urgency values are rejected | [facturi.js](https://github.com/sakrahmedramy-glitch/TW-Project/blob/9f675aa/facturi.js#L33-L59) | Check the validation messages in the console |
| S2-R5 | Adding does not mutate the original array | [facturi.js](https://github.com/sakrahmedramy-glitch/TW-Project/blob/9f675aa/facturi.js#L82-L88) | Console confirms the original still has three invoices |
| S2-R6 | README Stage 2 section and AI log are present | [README.md](https://github.com/sakrahmedramy-glitch/TW-Project/blob/9f675aa/README.md#L28), [ai-log/etapa-02.md](https://github.com/sakrahmedramy-glitch/TW-Project/blob/9f675aa/ai-log/etapa-02.md) | Read both files |
| S2-R7 | Stage 2 commit is published on GitHub | [Stage 2 commit 9f675aa](https://github.com/sakrahmedramy-glitch/TW-Project/commit/9f675aa) | Check the commit in the remote repository |

S2-R7 is not yet complete: the local Stage 2 commit is ready, but pushing it was rejected by GitHub
with HTTP 403 because the configured account does not have permission to write to this repository.

## AI usage

| Tool | Used for |
|---|---|
| Copilot in VS Code | Creating and refining the Stage 1 HTML/CSS mockup and project documentation |
| Copilot in VS Code | Implementing and documenting the Stage 2 JavaScript data logic |
| Browser DevTools console | Checking the grouped Stage 2 examples and assertions after opening `index.html` |

Details per stage: see the `ai-log/` folder.

## Status

- [x] Stage 1: static mockup
- [x] Stage 2: data logic in JavaScript
- [x] Stage 3: Vite and React project (local verification complete; publication pending)
- [x] Stage 4: components rendered from data (local checks passed; publication pending)
- [x] Stage 5: local state and events (implementation complete; validation unavailable; publication pending)
- [x] Stage 6: data from a mock API
- [x] Stage 7: form and validation
- [x] Stage 8: routing and detail page
- [x] Stage 9: own backend with Express
- [ ] Stage 10: MariaDB and full CRUD

## Stage 3: Vite and React project

The application is built with Vite and React in `frontend/`. The three sample
invoices from the data model are declared in `frontend/src/App.jsx`, and the header
count is calculated from that array. The list was initially displayed as formatted
JSON and is now rendered by the Stage 4 components. The Stage 1 stylesheet is reused
in `frontend/src/App.css`, with a single-column layout.

The original Stage 1 and Stage 2 files are kept together in `mockup/`.

### Stage 3 verification checklist

| ID | Requirement | Where | How to check |
|---|---|---|---|
| S3-R1 | `npm run dev` starts without errors | `frontend/package.json` | Passed: the app runs at `http://127.0.0.1:5173/` |
| S3-R2 | App name and invoice count are displayed from data | `frontend/src/App.jsx` | Edit the invoice array and save |
| S3-R3 | App uses the sample invoices documented in this README | `frontend/src/App.jsx` | Compare with the sample data table above |
| S3-R4 | Stage 1 styles are reused | `frontend/src/App.css` | Inspect the app in a browser |
| S3-R5 | `node_modules/` is ignored and the build passes | `frontend/.gitignore`, `frontend/package.json` | Passed: `npm run build` succeeds |
| S3-R6 | Stage 3 documentation and AI log are present | `README.md`, `ai-log/etapa-03.md` | Read both files |
| S3-R7 | Stage 3 commit is published | Git history | Check the Stage 3 commit |

S3-R1 and S3-R5 have been verified locally. S3-R7 remains pending until the Stage 3
changes are committed and published.

## Stage 4: components rendered from data

The invoice list is rendered from the data through two reusable components:
- `InvoiceList` receives the complete array and renders one card per invoice.
- `InvoiceCard` receives one invoice through props and displays its title, urgency,
  and payment status.

The list uses each invoice ID as its React key, displays an explicit message when
there are no invoices, and changes the card appearance based on whether the invoice
is paid. Adding or changing an invoice in the array updates the rendered cards
without editing the components.

### Stage 4 verification checklist

| ID | Requirement | Where | How to check |
|---|---|---|---|
| S4-R1 | At least two components, one per file | `frontend/src/components/` | Open the folder |
| S4-R2 | Card receives invoice data through props | `frontend/src/components/InvoiceCard.jsx` | Read the component |
| S4-R3 | List uses `map` and `key={factura.id}` | `frontend/src/components/InvoiceList.jsx` | Inspect the code and browser console |
| S4-R4 | Empty list displays a message | `frontend/src/components/InvoiceList.jsx` | Temporarily set `facturi` to `[]` |
| S4-R5 | Payment state changes the card appearance | `frontend/src/components/InvoiceCard.jsx` | Toggle a `platita` value |
| S4-R6 | README Stage 4 section and AI log are present | `README.md`, `ai-log/etapa-04.md` | Read both files |
| S4-R7 | Stage 4 commit is published | Git history | Check the Stage 4 commit |

The Stage 4 lint and production build pass. The browser renders three invoice cards
with no console warnings or errors. S4-R7 remains pending until the changes are
committed and published.

## Stage 5: local state and events

The invoice list lives in React state in `App.jsx`. Checking an invoice updates its
payment status and the unpaid counter; deleting invoices updates the list and its
empty state. A header button switches between light and dark mode. These changes
are held in memory and reset on refresh, as expected for this stage.

### Stage 5 verification checklist

| ID | Requirement | Where | How to check |
|---|---|---|---|
| S5-R1 | Invoice list is kept in `useState` in the parent | [App.jsx#L17-L18](https://github.com/sakrahmedramy-glitch/TW-Project/blob/e12dafd/frontend/src/App.jsx#L17-L18) | Read the component state |
| S5-R2 | Checking an invoice changes its state and card appearance | [App.jsx#L20-L28](https://github.com/sakrahmedramy-glitch/TW-Project/blob/e12dafd/frontend/src/App.jsx#L20-L28), [InvoiceCard.jsx#L12-L24](https://github.com/sakrahmedramy-glitch/TW-Project/blob/e12dafd/frontend/src/components/InvoiceCard.jsx#L12-L24) | Click a checkbox |
| S5-R3 | Deleting an invoice removes it from the list | [App.jsx#L30-L32](https://github.com/sakrahmedramy-glitch/TW-Project/blob/e12dafd/frontend/src/App.jsx#L30-L32), [InvoiceCard.jsx#L28-L34](https://github.com/sakrahmedramy-glitch/TW-Project/blob/e12dafd/frontend/src/components/InvoiceCard.jsx#L28-L34) | Click Delete |
| S5-R4 | Header counter is derived from the list, not stored in state | [App.jsx#L40](https://github.com/sakrahmedramy-glitch/TW-Project/blob/e12dafd/frontend/src/App.jsx#L40) | Toggle a checkbox and watch the header |
| S5-R5 | State updates are immutable and use updater functions | [App.jsx#L20-L32](https://github.com/sakrahmedramy-glitch/TW-Project/blob/e12dafd/frontend/src/App.jsx#L20-L32) | Inspect the `map` and `filter` updates |
| S5-R6 | Theme toggle works in both directions and overrides system preference | [App.jsx#L10-L13](https://github.com/sakrahmedramy-glitch/TW-Project/blob/e12dafd/frontend/src/App.jsx#L10-L13), [App.jsx#L34-L38](https://github.com/sakrahmedramy-glitch/TW-Project/blob/e12dafd/frontend/src/App.jsx#L34-L38), [App.css#L286-L306](https://github.com/sakrahmedramy-glitch/TW-Project/blob/e12dafd/frontend/src/App.css#L286-L306) | Test with both system themes |
| S5-R7 | No console warnings; README and AI log are updated | `README.md`, `ai-log/etapa-05.md` | Run lint/build and check the browser console |
| S5-R8 | Stage 5 commit is published on GitHub | Git history | Check the Stage 5 commit |

S5-R1–S5-R6 are implemented locally. S5-R7 is only partially verified: the
documentation is present, but lint, build, and browser-console checks could not be
run in the current environment. S5-R8 remains pending until the changes are
committed and published.

## Stage 6: data from a mock API

The invoice data now lives in `frontend/db.json`. `json-server` 0.17.4 exposes it
through `GET /facturi`, and `frontend/src/api.js` is the only place where the React
application calls `fetch`. The API base URL comes from `VITE_API_URL`, with
`http://localhost:3001` as the local default.

`App.jsx` starts with an empty invoice list and requests the data after mounting.
It displays a loading message while the request is pending, an actionable error
message when the request fails, and `InvoiceList` only after a successful response.
Checking and deleting invoices remain local Stage 5 interactions, so those changes
are reset when the page reloads.

To reproduce Stage 6, check out commit `6fbbfe3` and run these commands in separate
terminals from `frontend/`:

```sh
npm run api  # terminal 1: http://localhost:3001
npm run dev  # terminal 2: the Vite address, usually http://localhost:5173
```

### Stage 6 verification checklist

| ID | Requirement | Where | How to check |
|---|---|---|---|
| S6-R1 | `npm run api` starts and the generated route returns JSON | `frontend/package.json`, `frontend/db.json` | Open http://localhost:3001/facturi |
| S6-R2 | React loads invoice data instead of declaring it in the component | `frontend/src/App.jsx` | Search for the removed `FACTURI_INITIALE` constant and reload the app |
| S6-R3 | A loading message appears while the request is pending | `frontend/src/App.jsx`, `frontend/src/App.css` | Start `json-server` with `--delay 4000`, then reload |
| S6-R4 | A failed request displays an error instead of a blank page | `frontend/src/App.jsx`, `frontend/src/App.css` | Stop the API and reload the page |
| S6-R5 | `fetch` is isolated and the API URL comes from the environment | `frontend/src/api.js`, `frontend/.env.example` | Search for `fetch` and inspect the URL definition |
| S6-R6 | Stage 6 README section and AI log are present | `README.md`, `ai-log/etapa-06.md` | Read both files |
| S6-R7 | The Stage 6 commit is published on GitHub | Git history | Check the Stage 6 commit |

S6-R1–S6-R6 are implemented and checked locally. The API response, lint, and
production build pass. S6-R7 is complete: the Stage 6 changes are published in
commit `6fbbfe3`.

## Stage 7: form and validation

Invoices can be added from the page. The `InvoiceForm` component is a controlled
form with a title field and an urgency select. It validates the data before sending
anything, and every change (add, toggle, delete) goes to the API before it shows up
in the list. The list is updated with the object returned by the server, so new
invoices get their `id` from `json-server`.

Validation rules:
- the title is required and cannot contain only spaces;
- the title has at most 100 characters (the `maxLength` attribute and the code check);
- the urgency must be one of `scazuta`, `medie`, or `mare`.

Validation and save errors appear next to the form, not in an `alert`. The submit
button is disabled and shows `Se salvează...` while the request is pending. The form
is cleared only after a successful save; if the API is down, the typed title is kept.
A failed toggle or delete shows an error above the list and keeps the list visible.

`tw.json` in the repository root describes the resource for automatic checks:
resource `facturi`, title field `titlu`, done field `platita`, and the sample value
`urgenta: "mare"`. The form, cards, and messages carry the `data-testid` attributes
from table 7.3; the urgency select uses `form-urgenta`.

### Stage 7 verification checklist

| ID | Requirement | Where | How to check |
|---|---|---|---|
| S7-R1 | Controlled form: `value` + `onChange` on every field | [InvoiceForm.jsx#L61-L83](https://github.com/sakrahmedramy-glitch/TW-Project/blob/2d9067c/frontend/src/components/InvoiceForm.jsx#L61-L83) | Read the fields |
| S7-R2 | Empty title shows an error and nothing is sent | [InvoiceForm.jsx#L18-L37](https://github.com/sakrahmedramy-glitch/TW-Project/blob/2d9067c/frontend/src/components/InvoiceForm.jsx#L18-L37) | Submit empty, watch Network |
| S7-R3 | Added invoice shows in the list and survives refresh | [App.jsx#L50-L53](https://github.com/sakrahmedramy-glitch/TW-Project/blob/2d9067c/frontend/src/App.jsx#L50-L53), [api.js#L24-L29](https://github.com/sakrahmedramy-glitch/TW-Project/blob/2d9067c/frontend/src/api.js#L24-L29) | Add, refresh |
| S7-R4 | Toggle and delete survive refresh | [App.jsx#L55-L78](https://github.com/sakrahmedramy-glitch/TW-Project/blob/2d9067c/frontend/src/App.jsx#L55-L78), [api.js#L31-L40](https://github.com/sakrahmedramy-glitch/TW-Project/blob/2d9067c/frontend/src/api.js#L31-L40) | Toggle/delete, refresh |
| S7-R5 | Button disabled while sending, form cleared only on success | [InvoiceForm.jsx#L39-L50](https://github.com/sakrahmedramy-glitch/TW-Project/blob/2d9067c/frontend/src/components/InvoiceForm.jsx#L39-L50), [InvoiceForm.jsx#L90-L92](https://github.com/sakrahmedramy-glitch/TW-Project/blob/2d9067c/frontend/src/components/InvoiceForm.jsx#L90-L92) | `--delay 3000`; stop the API and submit |
| S7-R6 | `tw.json` and the `data-testid` attributes from table 7.3 | [tw.json](https://github.com/sakrahmedramy-glitch/TW-Project/blob/2d9067c/tw.json), [InvoiceCard.jsx#L10-L40](https://github.com/sakrahmedramy-glitch/TW-Project/blob/2d9067c/frontend/src/components/InvoiceCard.jsx#L10-L40), [InvoiceList.jsx#L6](https://github.com/sakrahmedramy-glitch/TW-Project/blob/2d9067c/frontend/src/components/InvoiceList.jsx#L6) | `querySelectorAll` in the console |
| S7-R7 | README Stage 7 section and AI log | `README.md`, `ai-log/etapa-07.md` | Read both files |
| S7-R8 | Stage 7 commit is published on GitHub | Git history | Check the Stage 7 commit |

S7-R1–S7-R7 are implemented and checked locally with lint, the production build,
and automated headless Chrome scenarios for validation, add, toggle, delete,
refresh, a stopped API, and a delayed API. S7-R8 is complete: the Stage 7 changes
are published in commit `2d9067c`.

## Stage 8: routing and detail page

Three pages behind React Router: the invoice list at `/`, a detail page at
`/facturi/:id`, and an about page at `/despre`, plus a 404 page for any other
address. The detail route uses the `resource` value from `tw.json`. Component
styles moved to CSS Modules.

- `App.jsx` contains only the route map. The shared `Layout` component renders the
  header, the `NavLink` navigation, the theme toggle, and the footer once, and each
  page appears in its `<Outlet />`.
- Navigation uses `Link` and `NavLink`, so pages change without reloading the
  document. `NavLink` marks the current page; `end` keeps the `/` link from staying
  active on every page.
- The invoice title in each card links to its detail page. `FacturaDetaliuPage`
  reads the `id` with `useParams` and requests `GET /facturi/:id`. The effect
  depends on `[id]`, so it loads again when the address changes. An unknown ID
  shows the server's 404 error and a link back to the list.
- The list page logic moved from `App.jsx` to `FacturiPage.jsx` unchanged. The
  invoice counter moved from the header into the list panel, because the header is
  now shared by every page.
- `App.css` was renamed to `index.css` and keeps only the color variables, the
  light and dark themes, and shared classes (`panel`, `info`, `empty`, `error`,
  `btn`, `btn-danger`, `badge-*`, `status-*`). Each component and page with its own
  styles has a `.module.css` file next to it.
- The urgency values and labels live in `constants.js`, shared by the form, the
  card, and the detail page.

The Stage 7 `data-testid` attributes stay on the same elements, except that the card
title is now a link marked `item-link` instead of `item-title`. Stage 8 adds `nav`,
`detail`, `detail-title`, `not-found`, and `loading`/`error` on the detail page.

Reloading a detail URL works with `npm run dev` and `npm run preview`, because Vite
returns `index.html` for every address.

### Stage 8 verification checklist

| ID | Requirement | Where | How to check |
|---|---|---|---|
| S8-R1 | Header navigation changes page without reload | [App.jsx#L12-L19](./frontend/src/App.jsx#L12-L19), [Layout.jsx#L41-L53](./frontend/src/components/Layout.jsx#L41-L53) | Click the links, watch Network |
| S8-R2 | Clicking an invoice opens its detail page | [InvoiceCard.jsx#L23-L29](./frontend/src/components/InvoiceCard.jsx#L23-L29), [FacturaDetaliuPage.jsx](./frontend/src/pages/FacturaDetaliuPage.jsx) | Click a title |
| S8-R3 | Refresh on the detail URL works; a missing ID shows an error | [FacturaDetaliuPage.jsx#L8-L59](./frontend/src/pages/FacturaDetaliuPage.jsx#L8-L59), [api.js#L24-L26](./frontend/src/api.js#L24-L26) | Refresh `/facturi/1`, open `/facturi/999` |
| S8-R4 | An unknown URL shows the app 404 page | [App.jsx#L17](./frontend/src/App.jsx#L17), [NotFoundPage.jsx](./frontend/src/pages/NotFoundPage.jsx) | Open `/ceva` |
| S8-R5 | Components have their own `.module.css`; `index.css` has only shared styles | [src/components](./frontend/src/components), [src/pages](./frontend/src/pages), [index.css](./frontend/src/index.css) | Read the files |
| S8-R6 | `data-testid` attributes from tables 7.3 and 8.2; detail route is `/facturi/:id` | [Layout.jsx#L41](./frontend/src/components/Layout.jsx#L41), [InvoiceCard.jsx#L11-L42](./frontend/src/components/InvoiceCard.jsx#L11-L42), [FacturaDetaliuPage.jsx#L39-L70](./frontend/src/pages/FacturaDetaliuPage.jsx#L39-L70), [NotFoundPage.jsx#L5](./frontend/src/pages/NotFoundPage.jsx#L5) | `querySelector` in the console |
| S8-R7 | README Stage 8 section and AI log | `README.md`, `ai-log/etapa-08.md` | Read both files |
| S8-R8 | Stage 8 commit is published on GitHub | Git history | Check the Stage 8 commit |

S8-R1–S8-R7 are implemented and checked locally with lint, the production build,
and automated headless Chrome scenarios on both `npm run preview` and `npm run dev`.
The scenarios also repeated the Stage 7 checks for validation, add, toggle, delete,
and refresh. Stage 8 was published in commit `79251e9`.

## Stage 9: own backend with Express

Express serves the invoice API in `backend/`. It keeps the initial invoices and
all changes in memory, so changes survive a browser refresh but reset when the
server restarts. The React app uses the same `/facturi` endpoints and displays
the error message returned by the API.

| Method | Path | Success |
|---|---|---|
| GET | `/health` | 200, server status |
| GET | `/facturi` | 200, list of invoices |
| GET | `/facturi/:id` | 200, invoice |
| POST | `/facturi` | 201, created invoice |
| PATCH | `/facturi/:id` | 200, updated invoice |
| DELETE | `/facturi/:id` | 204, empty body |

A new invoice requires a title of 1–100 characters after trimming. Urgency must
be `scazuta`, `medie`, or `mare` and defaults to `medie`. Payment status must be
a boolean and defaults to `false`. PATCH validates the fields supplied, and the
server ignores unknown fields and assigns its own IDs. Invalid data and IDs return
400. Missing invoices and unknown routes return 404. Errors have the format
`{ "error": "..." }`.

To check the API from Git Bash, run these commands in order on a fresh server.
Use the ID returned by POST in place of `7` if the server has already created invoices.

```bash
curl -i http://localhost:3001/health
curl -i http://localhost:3001/facturi
curl -i --json '{"titlu":"Factură din curl","urgenta":"mare"}' http://localhost:3001/facturi
curl -i http://localhost:3001/facturi/7
curl -i -X PATCH --json '{"platita":true}' http://localhost:3001/facturi/7
curl -i --json '{"titlu":"  "}' http://localhost:3001/facturi
curl -i -X DELETE http://localhost:3001/facturi/7
curl -i http://localhost:3001/facturi/7
```

### Stage 9 verification checklist

| ID | Requirement | Where (permalink) | How to check |
|---|---|---|---|
| S9-R1 | The backend starts on port 3001 | [package.json](https://github.com/sakrahmedramy-glitch/TW-Project/blob/c82c630f1aa2e3731d490b9de2dc394fd0481c4a/backend/package.json#L10-L13), [server.js](https://github.com/sakrahmedramy-glitch/TW-Project/blob/c82c630f1aa2e3731d490b9de2dc394fd0481c4a/backend/src/server.js#L1-L8) | Run `npm ci` and `npm run dev` from `backend/`, then GET `/health` |
| S9-R2 | All five invoice routes return the expected status codes | [facturi.js](https://github.com/sakrahmedramy-glitch/TW-Project/blob/c82c630f1aa2e3731d490b9de2dc394fd0481c4a/backend/src/routes/facturi.js#L18-L67) | Run the curl commands above |
| S9-R3 | Invalid data returns 400 and a JSON error | [validation.js](https://github.com/sakrahmedramy-glitch/TW-Project/blob/c82c630f1aa2e3731d490b9de2dc394fd0481c4a/backend/src/validation.js#L1-L49) | POST `{}` or `{"titlu":"  "}` |
| S9-R4 | React supports CRUD with Express and the mock API removed | [package.json](https://github.com/sakrahmedramy-glitch/TW-Project/blob/c82c630f1aa2e3731d490b9de2dc394fd0481c4a/frontend/package.json), [api.js](https://github.com/sakrahmedramy-glitch/TW-Project/blob/c82c630f1aa2e3731d490b9de2dc394fd0481c4a/frontend/src/api.js#L6-L46) | Add, mark as paid, delete, and refresh |
| S9-R5 | The browser can reach the API without CORS errors | [app.js](https://github.com/sakrahmedramy-glitch/TW-Project/blob/c82c630f1aa2e3731d490b9de2dc394fd0481c4a/backend/src/app.js#L5-L8) | Open `http://localhost:5173` and inspect the console and response headers |
| S9-R6 | The README section and AI log are present | [README.md](https://github.com/sakrahmedramy-glitch/TW-Project/blob/c82c630f1aa2e3731d490b9de2dc394fd0481c4a/README.md#L308), [etapa-09.md](https://github.com/sakrahmedramy-glitch/TW-Project/blob/c82c630f1aa2e3731d490b9de2dc394fd0481c4a/ai-log/etapa-09.md) | Read both files |
| S9-R7 | The implementation commit uses the Stage 9 prefix | [Stage 9 implementation commit](https://github.com/sakrahmedramy-glitch/TW-Project/commit/c82c630f1aa2e3731d490b9de2dc394fd0481c4a) | Find the commit on GitHub |
