# Stage 3: AI log

## Tools
- Copilot in VS Code
- Project README and Stage 3 requirements

## Conversations
- Copilot conversation for setting up the Vite and React version of Smart Invoice Payer

## Key requests
### 1. Move the earlier stages into the mockup folder
- Asked: Keep the Stage 1 page, styles, and Stage 2 logic while moving development to React.
- Got: `index.html`, `style.css`, and `facturi.js` were moved into `mockup/`.
- Changed or rejected: Kept the original mockup contents and retained the single-column layout in its stylesheet.

### 2. Set up the React application
- Asked: Create a Vite React app in `frontend/` and replace its demo screen with the project UI.
- Got: Added the Vite configuration, React entry point, ESLint configuration, app component, and npm scripts.
- Changed or rejected: Removed the demo assets and styles from the app; the existing invoice examples are shown instead.

### 3. Reuse project data and styling
- Asked: Move the Stage 2 sample data into the main component, calculate the unpaid count, and temporarily print the list as JSON.
- Got: `App.jsx` declares the three sample invoices, calculates the unpaid total from the array, and renders formatted JSON.
- Changed or rejected: Adapted the TaskFlow example in the instructions to the Smart Invoice Payer data model and Romanian UI labels.

## What I learned / what did not work
The app uses a Vite entry document and mounts `App` into the `root` element. The previous
mockup is preserved separately so the React app can reuse its styles without loading
the old page or Stage 2 console examples.

The initial scaffold task could not invoke `cmd.exe`, so the Vite project files were
created directly. npm itself was available through the VS Code task runner:
`npm install`, `npm run build`, `npm run lint`, and `npm run dev` were run. The first
lint pass found JSX imports reported as unused; registering the React ESLint plugin's
JSX usage rule resolved that configuration issue. The app was opened in the browser
and displayed the expected title, three invoices, and two unpaid invoices.

The local build and runtime checks pass. Publishing the Stage 3 commit remains a
separate step.
