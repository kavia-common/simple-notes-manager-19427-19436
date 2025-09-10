import { ref, computed } from 'vue'
import { apiFetchJson } from './useApi'

export type Note = {
  id: string
  title: string
  content: string
  created_at?: string
  updated_at?: string
}

const notesState = ref<Note[] | null>(null)
const loadingState = ref(false)
const errorState = ref<string | null>(null)

/**
 * PUBLIC_INTERFACE
 * useNotes
 * Provides reactive state for list of notes and CRUD operations against backend.
 * Methods:
 *  - fetchNotes(): Load all notes
 *  - getNote(id): Load a single note
 *  - createNote(payload): Create and append to state
 *  - updateNote(id, payload): Update note in state
 *  - deleteNote(id): Remove note from state
 */
export function useNotes() {
  const notes = computed(() => notesState.value)
  const isLoading = computed(() => loadingState.value)
  const error = computed(() => errorState.value)

  async function fetchNotes() {
    loadingState.value = true
    errorState.value = null
    try {
      const data: Note[] = await apiFetchJson('/notes', { method: 'GET' })
      notesState.value = Array.isArray(data) ? data : []
    } catch (e: any) {
      errorState.value = e?.message || 'Failed to load notes'
      notesState.value = []
    } finally {
      loadingState.value = false
    }
  }

  async function getNote(id: string): Promise<Note | null> {
    loadingState.value = true
    errorState.value = null
    try {
      const data: Note = await apiFetchJson(`/notes/${encodeURIComponent(id)}`, { method: 'GET' })
      // Optionally sync into list state
      if (notesState.value) {
        const idx = notesState.value.findIndex(n => n.id === data.id)
        if (idx >= 0) notesState.value[idx] = data
      }
      return data
    } catch (e: any) {
      errorState.value = e?.message || 'Failed to load note'
      return null
    } finally {
      loadingState.value = false
    }
  }

  async function createNote(payload: Pick<Note, 'title' | 'content'>): Promise<Note | null> {
    loadingState.value = true
    errorState.value = null
    try {
      const created: Note = await apiFetchJson('/notes', {
        method: 'POST',
        body: JSON.stringify(payload),
      })
      if (!notesState.value) notesState.value = []
      notesState.value.unshift(created)
      return created
    } catch (e: any) {
      errorState.value = e?.message || 'Failed to create note'
      return null
    } finally {
      loadingState.value = false
    }
  }

  async function updateNote(id: string, payload: Partial<Pick<Note, 'title' | 'content'>>): Promise<Note | null> {
    loadingState.value = true
    errorState.value = null
    try {
      const updated: Note = await apiFetchJson(`/notes/${encodeURIComponent(id)}`, {
        method: 'PUT',
        body: JSON.stringify(payload),
      })
      if (notesState.value) {
        const idx = notesState.value.findIndex(n => n.id === updated.id)
        if (idx >= 0) notesState.value[idx] = updated
      }
      return updated
    } catch (e: any) {
      errorState.value = e?.message || 'Failed to update note'
      return null
    } finally {
      loadingState.value = false
    }
  }

  async function deleteNote(id: string): Promise<boolean> {
    loadingState.value = true
    errorState.value = null
    try {
      await apiFetchJson(`/notes/${encodeURIComponent(id)}`, { method: 'DELETE' })
      if (notesState.value) {
        notesState.value = notesState.value.filter(n => n.id !== id)
      }
      return true
    } catch (e: any) {
      errorState.value = e?.message || 'Failed to delete note'
      return false
    } finally {
      loadingState.value = false
    }
  }

  return { notes, isLoading, error, fetchNotes, getNote, createNote, updateNote, deleteNote }
}
