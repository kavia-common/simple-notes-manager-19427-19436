<template>
  <div>
    <h1 class="title">Your Notes</h1>
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
  margin: 0 0 1rem 0;
}
</style>
