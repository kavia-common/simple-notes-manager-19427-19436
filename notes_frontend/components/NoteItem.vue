<template>
  <article class="note-item">
    <header class="note-header">
      <h3 class="note-title">
        <NuxtLink :to="`/notes/${note.id}`" class="note-link">{{ note.title || '(Untitled)' }}</NuxtLink>
      </h3>
      <div class="note-actions">
        <NuxtLink :to="`/notes/${note.id}`" class="btn btn-secondary">View</NuxtLink>
        <NuxtLink :to="`/notes/${note.id}/edit`" class="btn btn-primary">Edit</NuxtLink>
        <button class="btn btn-danger" @click="$emit('delete', note.id)">Delete</button>
      </div>
    </header>
    <p class="note-content-preview">{{ preview }}</p>
    <footer class="note-meta" v-if="note.updated_at || note.created_at">
      <span v-if="note.updated_at">Updated: {{ formatDate(note.updated_at) }}</span>
      <span v-else-if="note.created_at">Created: {{ formatDate(note.created_at) }}</span>
    </footer>
  </article>
</template>

<script setup lang="ts">
import type { Note } from '~/composables/useNotes'

const props = defineProps<{
  note: Note
}>()

defineEmits<{
  (e: 'delete', id: string): void
}>()

const preview = computed(() => {
  const content = props.note.content || ''
  return content.length > 160 ? content.slice(0, 157) + '...' : content
})

function formatDate(d: string) {
  try {
    return new Date(d).toLocaleString()
  } catch {
    return d
  }
}
</script>

<style scoped>
.note-item {
  composes: card card-pad from global;
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
}
.note-header {
  display: flex;
  justify-content: space-between;
  gap: var(--space-3);
  align-items: center;
}
.note-title {
  margin: 0;
  font-size: 1.125rem;
}
.note-link {
  color: var(--gray-900);
  text-decoration: none;
}
.note-link:hover { text-decoration: underline; }
.note-actions {
  display: flex;
  gap: var(--space-2);
}
.note-content-preview {
  margin: 0;
  color: var(--gray-700);
}
.note-meta {
  font-size: .75rem;
  color: var(--gray-500);
}
</style>
