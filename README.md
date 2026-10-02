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

## AI usage

| Tool | Used for |
|---|---|
| [Fill in] | [Fill in] |

Details per stage: see the `ai-log/` folder.

## Status

- [x] Stage 1: static mockup
- [ ] Stage 2: data logic in JavaScript
