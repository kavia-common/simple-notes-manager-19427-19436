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
.state { color: var(--gray-700); }
.state.error { color: #b91c1c; }
.note-view {
  background: white;
  border: 1px solid var(--gray-200);
  border-radius: .5rem;
  padding: 1rem;
}
.note-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: .75rem;
}
.title { margin: 0; font-size: 1.5rem; }
.actions { display: flex; gap: .5rem; }
.btn {
  border: 1px solid transparent;
  border-radius: .375rem;
  padding: .5rem .75rem;
  font-size: .875rem;
  cursor: pointer;
  text-decoration: none;
}
.btn-primary { background: var(--blue-600); color: white; }
.btn-primary:hover { background: var(--blue-700); }
.btn-danger { background: #ef4444; color: white; }
.btn-danger:hover { background: #dc2626; }
.content { margin-top: 1rem; }
.pre-wrap { white-space: pre-wrap; }
.meta { margin-top: .5rem; font-size: .75rem; color: var(--gray-500); }
</style>
