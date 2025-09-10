# Simple Notes Frontend Usage

Endpoints expected:
  - GET /notes
  - POST /notes
  - GET /notes/:id
  - PUT /notes/:id
  - DELETE /notes/:id

Configuration options:

Option A: Direct to backend (no dev proxy)
- Set `NUXT_PUBLIC_NOTES_API_BASE` to your backend origin (e.g., `http://localhost:8000`).

Option B: Relative base with dev proxy (default)
- Use `/api` as base and set `NUXT_BACKEND_URL` so the dev server proxies `/api/*` to your backend.
- Example:
  ```
  NUXT_PUBLIC_NOTES_API_BASE=/api
  NUXT_BACKEND_URL=http://localhost:8000
  ```

Development
- npm install
- npm run dev

Build
- npm run build
- npm run preview
