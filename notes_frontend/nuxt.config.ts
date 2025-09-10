/**
 * Nuxt configuration for Simple Notes App frontend.
 * - Exposes public runtime config: notesApiBase
 *   Set via env: NUXT_PUBLIC_NOTES_API_BASE (e.g., http://localhost:8000)
 *   Defaults to '/api' for reverse proxy scenarios.
 *
 * Dev proxy:
 * - If you keep notesApiBase='/api', set NUXT_BACKEND_URL (e.g., http://localhost:8000)
 *   to proxy /api/* to your backend during `npm run dev`.
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
  css: [
    '~/assets/css/global.css',
  ],
  runtimeConfig: {
    public: {
      // ENV: NUXT_PUBLIC_NOTES_API_BASE (optional)
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
    // Dev-time server proxy (used by Nitro) if NUXT_BACKEND_URL is provided
    devProxy: process.env.NUXT_BACKEND_URL
      ? {
          "/api": {
            target: process.env.NUXT_BACKEND_URL,
            changeOrigin: true,
            prependPath: false,
          },
        }
      : undefined,
  },
  vite: {
    server: {
      host: '0.0.0.0',
      allowedHosts: true,
      port: 3000,
      // Vite dev proxy for browser-originated requests during development
      proxy: process.env.NUXT_BACKEND_URL
        ? {
            '/api': {
              target: process.env.NUXT_BACKEND_URL,
              changeOrigin: true,
              secure: false,
            },
          }
        : undefined,
    },
  },
});
