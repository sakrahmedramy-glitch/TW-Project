# Smart Invoice Payer

A static mockup for tracking utility bills, rent, and subscription invoices.  
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

Open `index.html` in a browser. No build step, no server.

## Stage 2: data logic

Plain JavaScript, no DOM access. `facturi.js` contains the sample invoice data and immutable functions
for listing titles, counting unpaid invoices, searching, adding with validation, toggling payment status,
and deleting. The grouped examples and assertions run in the browser console when the page loads
(F12 or Ctrl + Shift + J).

The add function trims and validates the title (1–100 characters), checks the urgency value, defaults
urgency to `medie`, and generates the next ID from the largest existing ID. Each operation returns a
new array and leaves its input unchanged.

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
- [ ] Stage 3: Vite and React project
