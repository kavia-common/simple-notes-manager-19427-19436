<template>
  <div>
    <h1 class="title">Your Notes</h1>

    <div class="demo-banner card card-pad">
      <strong>Demo mode:</strong>
      <p>
        This frontend uses in-memory mock data (stored in your browser) — no backend required.
        When you’re ready to connect a real API, plug your calls into <code>composables/useNotes.ts</code>.
      </p>
    </div>

    <NotesList />
  </div>
</template>

<script setup lang="ts">
import NotesList from '~/components/NotesList.vue'
useHead({ title: 'Simple Notes - All Notes' })
</script>

<style scoped>
.title {
  font-size: 1.5rem;
  margin: 0 0 var(--space-4) 0;
}
.demo-banner {
  margin-bottom: var(--space-4);
  color: var(--gray-700);
}
</style>
