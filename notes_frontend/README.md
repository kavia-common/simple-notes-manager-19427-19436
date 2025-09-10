# Simple Notes - Nuxt Frontend (Frontend-only Demo)

A minimal Nuxt 3 frontend for managing notes. Supports:
- List notes
- Create new note
- View note
- Edit note
- Delete note

This demo runs entirely in the browser using in-memory data persisted to `localStorage`. No backend or API is required.

## Setup
Install dependencies and run:

```bash
# install
npm install

# dev
npm run dev

# build static site
npm run build
# preview build
npm run preview
```

Open http://localhost:3000

## Connecting a real API later
The notes logic lives in `composables/useNotes.ts`. Replace the in-memory CRUD methods with your API calls when a backend is available. A friendly banner on the home page reminds where to plug an API.

No environment variables or dev proxies are required for this demo.
