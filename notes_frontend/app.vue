<template>
  <div class="min-h-screen bg-gray-50 text-gray-800">
    <header class="bg-white shadow">
      <div class="mx-auto max-w-5xl px-4 py-4 flex items-center justify-between">
        <NuxtLink to="/" class="text-xl font-semibold hover:opacity-80">
          Simple Notes
        </NuxtLink>
        <nav class="flex gap-3">
          <NuxtLink to="/" class="text-sm px-3 py-1 rounded hover:bg-gray-100">All Notes</NuxtLink>
          <NuxtLink to="/new" class="text-sm px-3 py-1 rounded bg-blue-600 text-white hover:bg-blue-700">New Note</NuxtLink>
        </nav>
      </div>
    </header>

    <main class="mx-auto max-w-5xl px-4 py-6">
      <NuxtPage />
    </main>

    <footer class="mx-auto max-w-5xl px-4 py-6 text-sm text-gray-500">
      Built with Nuxt 3
    </footer>

    <NuxtRouteAnnouncer />
  </div>
</template>

<script setup lang="ts">
// App shell only. Routes render within <NuxtPage />
</script>

<style>
/* Minimal utility-like styles without bringing in Tailwind to keep template simple */
:root {
  --blue-600: #2563eb;
  --blue-700: #1d4ed8;
  --gray-50: #f9fafb;
  --gray-100: #f3f4f6;
  --gray-200: #e5e7eb;
  --gray-500: #6b7280;
  --gray-700: #374151;
}
* { box-sizing: border-box; }
body { margin: 0; font-family: ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Ubuntu, Cantarell, Noto Sans, Helvetica Neue, Arial, Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol; }
.bg-gray-50 { background-color: var(--gray-50); }
.bg-white { background: white; }
.text-gray-800 { color: #1f2937; }
.text-gray-500 { color: var(--gray-500); }
.shadow { box-shadow: 0 1px 2px rgba(0,0,0,.06); }
.max-w-5xl { max-width: 64rem; }
.mx-auto { margin-left: auto; margin-right: auto; }
.px-4 { padding-left: 1rem; padding-right: 1rem; }
.py-4 { padding-top: 1rem; padding-bottom: 1rem; }
.py-6 { padding-top: 1.5rem; padding-bottom: 1.5rem; }
.min-h-screen { min-height: 100vh; }
.flex { display: flex; }
.items-center { align-items: center; }
.justify-between { justify-content: space-between; }
.text-xl { font-size: 1.25rem; }
.font-semibold { font-weight: 600; }
.rounded { border-radius: .375rem; }
.bg-blue-600 { background-color: var(--blue-600); }
.text-white { color: white; }
.hover\:bg-blue-700:hover { background-color: var(--blue-700); }
.hover\:bg-gray-100:hover { background: var(--gray-100); }
.hover\:opacity-80:hover { opacity: .8; }
.gap-3 { gap: .75rem; }
.text-sm { font-size: .875rem; }
</style>
