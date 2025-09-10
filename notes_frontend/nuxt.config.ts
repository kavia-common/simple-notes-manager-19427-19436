/**
 * Nuxt configuration for Simple Notes App frontend (frontend-only demo).
 * This build is fully static-friendly and does not rely on any backend.
 */
export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },
  app: {
    head: {
      titleTemplate: '%s',
      title: 'Simple Notes',
      meta: [
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: 'A simple notes app built with Nuxt 3 (frontend-only demo)' },
      ],
    },
  },
  css: [
    '~/assets/css/global.css',
  ],
  // No runtimeConfig, proxies, or CORS headers needed for in-memory demo
})
