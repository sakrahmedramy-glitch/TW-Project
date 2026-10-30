# Stage 5: AI log

## Tools
- Copilot in VS Code
- Stage 5 guide
- Project README and Stage 2 immutable data functions
- Frontend lint and production build scripts (could not run: PowerShell is unavailable)

## Conversations
- Copilot conversation for adding local state, invoice actions, and a theme toggle
  to the React invoice list

## Key requests
### 1. Add interactive invoice state
- Asked: Keep the invoice data in the parent component's state and make checking
  and deleting items update the interface.
- Got: `App` owns the invoice array; toggle and delete use functional state updates
  with `map` and `filter`. The unpaid count is derived from the current array.
- Changed or rejected: Adapted the guide's task fields and labels to the existing
  invoice model and Romanian UI.

### 2. Add accessible item controls and theme switching
- Asked: Use a controlled checkbox, an accessible delete button, and a header
  button that switches light and dark themes through `data-theme` on `<html>`.
- Got: `InvoiceCard` reports actions through props, while `App` updates state and
  the root theme attribute. CSS variables support explicit themes and the system
  preference.
- Changed or rejected: Left `main.jsx` unchanged as required by the guide.

## What I learned / what did not work
Keeping state in `App` allows the list, card status, and header counter to stay in
sync. Child components only report user actions through callbacks. Theme state
controls the button label and the root `data-theme` attribute controls CSS.

The configured lint and build commands were not executable in this environment
because PowerShell is unavailable. The app was not started in a browser, so its
runtime behavior and console warnings remain unverified.
