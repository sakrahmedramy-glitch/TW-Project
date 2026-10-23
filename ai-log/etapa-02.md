# Stage 2: AI log

## Tools
- Copilot in VS Code
- Browser DevTools console for the required manual checks
- Project README and Stage 2 requirements

## Conversations
- Copilot conversation for Stage 2 data-layer logic and JavaScript implementation

## Key requests
### 1. Create the Stage 2 JavaScript logic
- Asked: Move the app data out of the HTML into a JavaScript array of objects and implement the core app functions: listing titles, counting active items, searching, adding with validation, toggling state, and deleting.
- Got: A separate module named `facturi.js` containing the invoice array, fixed allowed values (`URGENTE`), immutable array operations using `map` and `filter`, and a monotonic ID allocator.
- Changed or rejected: Kept the page DOM untouched; the logic does not manipulate the document or events, matching the Stage 2 requirement.

### 2. Connect the JavaScript to the page
- Asked: Link the logic file to the mockup without modifying the visible UI.
- Got: A single `<script src="facturi.js"></script>` line added before `</body>` in `index.html`.
- Changed or rejected: No visual changes were made beyond including the script tag required for Stage 2.

### 3. Complete the validation and console checks
- Asked: Ensure all Stage 2 requirements are covered.
- Got: Added the default urgency, maximum title-length validation, explicit checks for immutability and non-duplicate IDs after deletion, and grouped console examples with assertions.
- Changed or rejected: Validation was executed in the browser on the local `file://` page. The terminal syntax-check was unavailable in this environment, so browser execution was used to verify the functions directly.

## What I learned / what did not work
The main challenge was keeping the code strictly data-only and avoiding any DOM access. Functions return new arrays/objects instead of modifying the original list.
The validation checks for a blank title, titles longer than the 100-character data-model limit, and invalid urgency values. The default urgency is `medie`; a monotonic allocator prevents IDs from being reused after deletion.
The console examples are grouped and use assertions to make failures visible. Browser checks confirmed the expected initial count, case-insensitive search, valid and invalid additions, default urgency, unchanged original array, toggling, deletion, and unique ID generation after deletion. This stage remains separate from the UI so its functions can be reused in a later React stage.
