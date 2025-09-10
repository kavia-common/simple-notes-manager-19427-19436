<template>
  <div>
    <header class="app-header">
      <div class="container app-header-inner">
        <NuxtLink to="/" class="brand">Simple Notes</NuxtLink>
        <nav class="nav">
          <NuxtLink to="/">All Notes</NuxtLink>
          <NuxtLink to="/new" class="btn btn-primary">New Note</NuxtLink>
        </nav>
      </div>
    </header>

    <main class="container page">
      <NuxtPage />
    </main>

    <footer class="container app-footer">
      Built with Nuxt 3 • Demo mode (no backend). If you saw 404s before, that was due to missing API routes — now everything runs locally.
    </footer>

    <NuxtRouteAnnouncer />
  </div>
</template>

<script setup lang="ts">
// App shell only. Routes render within <NuxtPage />
</script>

<style>
/* Component-level tweaks if needed can go here (kept empty to rely on global.css) */
</style>
