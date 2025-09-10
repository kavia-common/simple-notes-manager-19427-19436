<template>
  <section>
    <h1 class="title">Edit Note</h1>

    <div v-if="loading" class="state">Loading…</div>
    <div v-else-if="error" class="state error">Error: {{ error }}</div>
    <div v-else-if="!note" class="state">Note not found.</div>
    <NoteEditor
      v-else
      :model-value="{ title: note.title, content: note.content }"
      :submitting="submitting"
      :error="error"
      mode="edit"
      @submit="onSave"
      @delete="onDelete"
    />
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useNotes, type Note } from '~/composables/useNotes'
import NoteEditor from '~/components/NoteEditor.vue'

useHead({ title: 'Simple Notes - Edit Note' })

const route = useRoute()
const id = String(route.params.id)
const { getNote, updateNote, deleteNote } = useNotes()

const note = ref<Note | null>(null)
const loading = ref(true)
const error = ref<string | null>(null)
const submitting = ref(false)

async function onSave(payload: { title: string; content: string }) {
  if (!note.value) return
  submitting.value = true
  error.value = null
  try {
    const updated = await updateNote(note.value.id, payload)
    if (updated) {
      await navigateTo(`/notes/${updated.id}`)
    }
  } catch (e: any) {
    error.value = e?.message || 'Failed to update note'
  } finally {
    submitting.value = false
  }
}

async function onDelete() {
  if (!note.value) return
  if (!confirm('Delete this note?')) return
  const ok = await deleteNote(note.value.id)
  if (ok) await navigateTo('/')
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
.title { font-size: 1.5rem; margin-bottom: 1rem; }
.state { color: var(--gray-700); }
.state.error { color: #b91c1c; }
</style>
