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
  gap: var(--space-3);
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--space-4);
}
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: var(--space-3);
}
</style>
