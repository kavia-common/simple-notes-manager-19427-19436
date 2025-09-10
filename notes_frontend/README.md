# Simple Notes - Nuxt Frontend

A minimal Nuxt 3 frontend for managing notes. Supports:
- List notes
- Create new note
- View note
- Edit note
- Delete note

## Backend API
This UI expects a REST backend exposing:
- GET    {API_BASE}/notes
- POST   {API_BASE}/notes           body: { title, content }
- GET    {API_BASE}/notes/:id
- PUT    {API_BASE}/notes/:id       body: { title?, content? }
- DELETE {API_BASE}/notes/:id

Set the public API base via environment variable `NUXT_PUBLIC_NOTES_API_BASE` or let it default to `/api`.

## Configuration
Copy `.env.example` to `.env` and set:
```
NUXT_PUBLIC_NOTES_API_BASE=http://localhost:8000
```

## Setup
Install dependencies and run:

```bash
# install
npm install

# dev
npm run dev

# build
npm run build

# preview
npm run preview
```

Open http://localhost:3000

## Notes
- Public runtime config: `runtimeConfig.public.notesApiBase`
- Basic CORS headers are set in `nuxt.config.ts` via Nitro route rules (adjust for production reverse proxy).
- The UI uses a lightweight local composable store (`useNotes`) without extra state libs.
