<template>
  <section>
    <h1 class="title">Create Note</h1>
    <NoteEditor
      :model-value="{ title, content }"
      :submitting="submitting"
      :error="error"
      mode="create"
      @submit="onCreate"
    />
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useNotes } from '~/composables/useNotes'
import NoteEditor from '~/components/NoteEditor.vue'

useHead({ title: 'Simple Notes - New Note' })

const { createNote } = useNotes()
const title = ref('')
const content = ref('')
const submitting = ref(false)
const error = ref<string | null>(null)

async function onCreate(payload: { title: string; content: string }) {
  submitting.value = true
  error.value = null
  try {
    const created = await createNote(payload)
    if (created) {
      await navigateTo(`/notes/${created.id}`)
    }
  } catch (e: any) {
    error.value = e?.message || 'Failed to create note'
  } finally {
    submitting.value = false
  }
}
</script>

<style scoped>
.title { font-size: 1.5rem; margin-bottom: 1rem; }
</style>
