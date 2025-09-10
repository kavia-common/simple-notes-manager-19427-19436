/**
 * Nuxt configuration for Simple Notes App frontend.
 * - Exposes public runtime config: notesApiBase
 *   Set via env: NUXT_PUBLIC_NOTES_API_BASE (e.g., http://localhost:8000)
 *   Defaults to '/api' for reverse proxy scenarios.
 */
export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },
  app: {
    head: {
      titleTemplate: '%s',
      meta: [
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: 'A simple notes app built with Nuxt 3' },
      ],
    },
  },
  runtimeConfig: {
    public: {
      // ENV REQUIRED: NUXT_PUBLIC_NOTES_API_BASE (optional)
      // Default '/api' is used if not set.
      notesApiBase: process.env.NUXT_PUBLIC_NOTES_API_BASE || '/api',
    },
  },
  nitro: {
    routeRules: {
      "/**": {
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
      },
    },
  },
  vite: {
    server: {
      host: '0.0.0.0',
      allowedHosts: true,
      port: 3000,
    },
  },
});
