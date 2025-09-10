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
  composes: card card-pad from global;
  padding: 2rem;
  text-align: center;
}
.code { font-size: 3rem; margin: 0; }
.msg { color: var(--gray-700); margin: .5rem 0 1rem 0; }
</style>
