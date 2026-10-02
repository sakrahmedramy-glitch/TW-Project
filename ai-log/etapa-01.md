# Stage 1: AI log

## Tools
- Copilot in VS Code
- Browser preview and PowerShell for checking the page

## Conversations
- [Current Copilot conversation](agent-host-session://copilotcli/d9ff70fc-6807-4ac1-b82a-8ac55c225e5c) (Stage 1 static mockup and CSS design refinement)

## Key requests
### 1. Create the Stage 1 static mockup
- Asked: Create a Romanian invoice-tracking mockup with semantic HTML and CSS only, following the required fields, sample invoices, responsive design, and project documentation.
- Got: A static page with an invoice form, exactly three sample invoice cards, urgency and payment-status labels, dark-mode styling, and documentation.
- Changed or rejected: Kept the empty-state message hidden while sample invoices are displayed; did not add JavaScript because Stage 1 is a static mockup.

### 2. Make the design more professional
- Asked: Improve the visual design while keeping the app and its existing content.
- Got: A more polished dashboard with a stronger header, refined panels and cards, clearer status labels, and a mobile layout.
- Changed or rejected: Preserved the three sample invoices and Romanian interface text; kept the redesign CSS-only.

## What I learned / what did not work
CSS Grid arranges the main form and invoice list, while Flexbox aligns form fields and card contents.
A media query switches the layout to one column on small screens; CSS variables support dark mode without duplicating component rules.
The form is visual only in Stage 1: without JavaScript or a server, submitting it does not add an invoice.
Python and Node.js were unavailable, so I checked the content with PowerShell and previewed the page in the browser instead.
