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

## Configuration

There are two recommended setups:

1) Direct to backend (no dev proxy)
- Set `NUXT_PUBLIC_NOTES_API_BASE` to the backend origin (e.g., `http://localhost:8000`).
- Example `.env`:
  ```
  NUXT_PUBLIC_NOTES_API_BASE=http://localhost:8000
  ```

2) Relative base with dev proxy (default)
- Leave `NUXT_PUBLIC_NOTES_API_BASE` unset (defaults to `/api`) OR set it explicitly to `/api`.
- Set `NUXT_BACKEND_URL` to your backend origin (e.g., `http://localhost:8000`).
- The Nuxt dev server will proxy `/api/*` to your backend during `npm run dev`.
- Example `.env`:
  ```
  NUXT_PUBLIC_NOTES_API_BASE=/api
  NUXT_BACKEND_URL=http://localhost:8000
  ```

Copy `.env.example` to `.env` and adjust as needed.

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
- Public runtime config: `runtimeConfig.public.notesApiBase` (read by `useApiBase()`).
- Dev proxy: When `NUXT_BACKEND_URL` is set, `/api/*` is proxied to that URL in development.
- Basic CORS headers are set in `nuxt.config.ts` via Nitro route rules (adjust for production reverse proxy).
- The UI uses a lightweight local composable store (`useNotes`) without extra state libs.
- If "Create Note" appears non-functional, check the network tab; it likely indicates the API call failed (e.g., misconfigured base URL). See configuration above.
