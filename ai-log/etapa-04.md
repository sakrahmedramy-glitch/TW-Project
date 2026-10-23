# Stage 4: AI log

## Tools
- Copilot in VS Code
- Project README and Stage 4 requirements
- Browser preview for checking the rendered invoice cards

## Conversations
- Copilot conversation for rendering the Smart Invoice Payer list through React components

## Key requests
### 1. Create reusable invoice components
- Asked: Replace the JSON output with a card component and a list component in separate files.
- Got: `InvoiceCard` receives one invoice through props; `InvoiceList` receives the invoice array and maps it to cards.
- Changed or rejected: Adapted the exercise's TaskFlow examples to the project's invoice properties and Romanian labels.

### 2. Handle payment state, urgency, and empty data
- Asked: Reproduce the mockup card appearance, use stable keys, and show a message for an empty list.
- Got: Cards show localized urgency labels and payment status, use the existing CSS classes, and mark paid invoices with the `done` class. The list uses invoice IDs as keys and displays an empty-state message.
- Changed or rejected: Kept the array in `App.jsx`; list and card components only receive and render props, leaving interactions for Stage 5.

## What I learned / what did not work
Mapping the data into a separate card component removes the repeated manual markup.
The list component owns the empty-state check and puts the stable invoice ID key on
the component returned directly from `map`. The card translates urgency values into
Romanian labels and uses payment state to select the mockup's status and appearance.
