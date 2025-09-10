<template>
  <section>
    <div class="list-header">
      <input
        v-model="q"
        type="text"
        placeholder="Search notes..."
        class="input"
        @keydown.escape="q = ''"
      />
      <NuxtLink to="/new" class="btn btn-primary">+ New</NuxtLink>
    </div>

    <div v-if="isLoading" class="state">Loading notes…</div>
    <div v-else-if="error" class="state error">Error: {{ error }}</div>
    <div v-else-if="!items?.length" class="state">No notes found.</div>
    <div v-else class="grid">
      <NoteItem
        v-for="n in filtered"
        :key="n.id"
        :note="n"
        @delete="onDelete"
      />
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useNotes } from '~/composables/useNotes'
import NoteItem from './NoteItem.vue'

const { notes, isLoading, error, fetchNotes, deleteNote } = useNotes()

const q = ref('')
const items = notes

const filtered = computed(() => {
  const s = q.value.trim().toLowerCase()
  if (!s) return items.value || []
  return (items.value || []).filter(n =>
    (n.title || '').toLowerCase().includes(s) ||
    (n.content || '').toLowerCase().includes(s)
  )
})

async function onDelete(id: string) {
  if (!confirm('Delete this note?')) return
  await deleteNote(id)
}

onMounted(() => {
  if (!items.value || items.value.length === 0) {
    fetchNotes()
  }
})
</script>

<style scoped>
.list-header {
  display: flex;
  gap: .75rem;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}
.input {
  width: 100%;
  border: 1px solid var(--gray-200);
  background: white;
  border-radius: .375rem;
  padding: .5rem .75rem;
}
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
.state {
  color: var(--gray-700);
  padding: 1rem 0;
}
.state.error { color: #b91c1c; }
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: .75rem;
}
</style>
