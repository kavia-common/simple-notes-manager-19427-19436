<template>
  <section v-if="loading" class="state">Loading…</section>
  <section v-else-if="error" class="state error">Error: {{ error }}</section>
  <section v-else-if="!note" class="state">Note not found.</section>
  <section v-else class="note-view">
    <header class="note-header">
      <h1 class="title">{{ note.title }}</h1>
      <div class="actions">
        <NuxtLink :to="`/notes/${note.id}/edit`" class="btn btn-primary">Edit</NuxtLink>
        <button class="btn btn-danger" @click="onDelete">Delete</button>
      </div>
    </header>
    <article class="content">
      <pre class="pre-wrap">{{ note.content }}</pre>
    </article>
    <p class="meta" v-if="note.updated_at || note.created_at">
      <span v-if="note.updated_at">Updated: {{ formatDate(note.updated_at) }}</span>
      <span v-else-if="note.created_at">Created: {{ formatDate(note.created_at) }}</span>
    </p>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useNotes, type Note } from '~/composables/useNotes'

const route = useRoute()
const id = String(route.params.id)
const { getNote, deleteNote } = useNotes()

const note = ref<Note | null>(null)
const loading = ref(true)
const error = ref<string | null>(null)

useHead({ title: 'Simple Notes - View Note' })

function formatDate(d: string) {
  try {
    return new Date(d).toLocaleString()
  } catch {
    return d
  }
}

async function onDelete() {
  if (!note.value) return
  if (!confirm('Delete this note?')) return
  const ok = await deleteNote(note.value.id)
  if (ok) {
    await navigateTo('/')
  }
}

onMounted(async () => {
  try {
    note.value = await getNote(id)
  } catch (e: any) {
    error.value = e?.message || 'Failed to load note'
  } finally {
    loading.value = false
  }
})
</script>

<style scoped>
.note-view {
  composes: card card-pad from global;
}
.note-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: var(--space-3);
}
.title { margin: 0; font-size: 1.5rem; }
.actions { display: flex; gap: var(--space-2); }
.content { margin-top: var(--space-4); }
.meta { margin-top: var(--space-2); font-size: .75rem; color: var(--gray-500); }
</style>
