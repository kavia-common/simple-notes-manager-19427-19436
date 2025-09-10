<template>
  <div class="error-wrap">
    <h1 class="code">{{ error?.statusCode || 500 }}</h1>
    <p class="msg">{{ error?.statusMessage || 'Unexpected error' }}</p>
    <p class="hint">This demo runs without a backend. If you tried an API route, it won’t exist here.</p>
    <NuxtLink class="btn" to="/">Go Home</NuxtLink>
  </div>
</template>

<script setup lang="ts">
defineProps<{ error?: { statusCode?: number; statusMessage?: string } }>()
</script>

<style scoped>
.error-wrap {
  composes: card card-pad from global;
  padding: 2rem;
  text-align: center;
}
.code { font-size: 3rem; margin: 0; }
.msg { color: var(--gray-700); margin: .5rem 0 1rem 0; }
.hint { color: var(--gray-500); margin-bottom: 1rem; font-size: .875rem; }
</style>
