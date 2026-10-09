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
- [ ] Stage 3: Vite and React project
