# Stage 8: AI log

## Tools

- Kiro in the IDE
- Stage 8 guide supplied in the conversation
- `react-router-dom` 7
- Frontend lint, production build, and `vite preview`
- Headless Google Chrome driven through the DevTools Protocol, including screenshots

## Conversation

- Kiro conversation for splitting Smart Invoice Payer into routed pages and moving
  component styles to CSS Modules

## Key requests

### 1. Add routing and a shared layout

- Asked: Wrap the app in `BrowserRouter`, keep only the route map in `App.jsx`, and
  render the header, navigation, and footer once in a `Layout` with `<Outlet />`.
- Got: Routes for `/`, `/facturi/:id`, `/despre`, and `*`. `Layout` uses `NavLink`
  with `end` on the home link and keeps the Stage 5 theme toggle.
- Changed or rejected: Used the `facturi` resource from `tw.json` for the detail
  route. Kept the existing gradient header instead of the guide's plain bar, and
  added the navigation links under the description.

### 2. Move the list into a page and add a detail page

- Asked: Move the Stage 7 state, effect, and handlers unchanged into a list page,
  make the card title a link, and load one invoice by ID on a detail page.
- Got: `FacturiPage` holds the list logic and the invoice counter. The card title is
  a `Link` marked `item-link`. `FacturaDetaliuPage` reads `useParams`, calls
  `fetchFactura(id)` in an effect that depends on `[id]`, and shows loading, error
  with a link back, or the invoice fields.
- Changed or rejected: The detail page shows urgency, payment status, and ID, the
  fields of the current data model. The effect does not call `setLoading(true)`,
  as the guide recommends for the newer React lint rule.

### 3. Organize styles with CSS Modules

- Asked: Rename `App.css` to `index.css`, keep only shared styles there, and give
  each component its own `.module.css`.
- Got: Modules for `Layout`, `InvoiceCard`, `InvoiceList`, `InvoiceForm`,
  `FacturiPage`, and `FacturaDetaliuPage`. `index.css` keeps the variables, both
  themes, and shared classes. Urgency values moved to `constants.js`.
- Changed or rejected: Kept the project's colors and the `badge-scazuta`,
  `badge-medie`, and `badge-mare` names instead of the guide's palette.

### 4. Test and document

- Asked: Check navigation, direct URLs, missing IDs, the 404 page, the new
  `data-testid` attributes, and the Stage 7 behaviour.
- Got: Browser scenarios passed on both the production build and the dev server.
  Screenshots were reviewed on desktop and phone widths.
- Changed or rejected: Screenshots showed two layout problems on phones, which were
  fixed (see below). The test data was removed from `db.json` afterwards.

## What I learned / what did not work

`Link` changes only the address, so the page and its state stay loaded; the tests
confirmed no new HTML document was requested while navigating. `useParams` always
returns text, which is fine here because the ID is only placed in the request URL.

`main.jsx` imports `index.css` before `App.jsx`, so the shared styles load first
and a module rule can override a shared class when both apply to one element.

The phone screenshots showed two problems: the card titles broke in the middle of
words, and the theme button covered the header text. On narrow screens the cards
now move the status and delete button under the title, and the theme button sits
in the header corner.

Moving the Stage 7 code also made the line links in the older README checklists
point to the wrong code, so they now point to the Stage 5 and Stage 7 commits.
