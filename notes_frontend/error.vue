<template>
  <div class="error-wrap">
    <h1 class="code">{{ error?.statusCode || 500 }}</h1>
    <p class="msg">{{ error?.statusMessage || 'Unexpected error' }}</p>
    <NuxtLink class="btn" to="/">Go Home</NuxtLink>
  </div>
</template>

<script setup lang="ts">
defineProps<{ error?: { statusCode?: number; statusMessage?: string } }>()
</script>

<style scoped>
.error-wrap {
  background: white;
  border: 1px solid var(--gray-200);
  border-radius: .5rem;
  padding: 2rem;
  text-align: center;
}
.code { font-size: 3rem; margin: 0; }
.msg { color: var(--gray-700); margin: .5rem 0 1rem 0; }
.btn {
  display: inline-block;
  padding: .5rem .75rem;
  border-radius: .375rem;
  background: var(--blue-600);
  color: white;
  text-decoration: none;
}
.btn:hover { background: var(--blue-700); }
</style>
