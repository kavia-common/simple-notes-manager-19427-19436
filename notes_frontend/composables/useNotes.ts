import { ref, computed } from 'vue'

export type Note = {
  id: string
  title: string
  content: string
  created_at?: string
  updated_at?: string
}

const STORAGE_KEY = 'simple-notes-demo:v1'

const notesState = ref<Note[] | null>(null)
const loadingState = ref(false)
const errorState = ref<string | null>(null)

// Load initial state from localStorage once (if available)
function loadFromStorage(): Note[] {
  try {
    const raw = typeof localStorage !== 'undefined' ? localStorage.getItem(STORAGE_KEY) : null
    if (!raw) return []
    const parsed = JSON.parse(raw)
    if (Array.isArray(parsed)) return parsed
    return []
  } catch {
    return []
  }
}

function saveToStorage() {
  try {
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(notesState.value || []))
    }
  } catch {
    // no-op for storage errors (private mode, etc)
  }
}

function ensureInit() {
  if (notesState.value === null) {
    const initial = loadFromStorage()
    // If empty, seed with a couple of friendly examples
    notesState.value = initial.length ? initial : [
      {
        id: cryptoRandomId(),
        title: 'Welcome to Simple Notes!',
        content: 'This is a frontend-only demo using in-memory data (saved in your browser). Create, edit, and delete notes freely.\n\nWhen you are ready to connect a real API, replace the mock store in useNotes.ts with your API calls.',
        created_at: new Date().toISOString(),
      },
      {
        id: cryptoRandomId(),
        title: 'Getting started',
        content: 'Click "+ New" to create a note. Use the search bar to filter. Edit or delete from the list or note view.',
        created_at: new Date().toISOString(),
      },
    ]
    saveToStorage()
  }
}

// Lightweight ID generator, uses crypto if available
function cryptoRandomId(): string {
  try {
    if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) {
      return (crypto as any).randomUUID()
    }
  } catch {}
  return 'id-' + Math.random().toString(36).slice(2) + Date.now().toString(36)
}

/**
 * PUBLIC_INTERFACE
 * useNotes
 * Provides reactive state for list of notes and in-memory CRUD operations.
 * No backend calls are made; data is stored in memory and persisted to localStorage.
 * Methods:
 *  - fetchNotes(): Initialize/load all notes
 *  - getNote(id): Return a single note
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
      ensureInit()
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
      ensureInit()
      const found = (notesState.value || []).find(n => n.id === id) || null
      return found
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
      ensureInit()
      const now = new Date().toISOString()
      const created: Note = {
        id: cryptoRandomId(),
        title: payload.title,
        content: payload.content,
        created_at: now,
        updated_at: now,
      }
      notesState.value!.unshift(created)
      saveToStorage()
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
      ensureInit()
      const list = notesState.value || []
      const idx = list.findIndex(n => n.id === id)
      if (idx < 0) {
        errorState.value = 'Note not found'
        return null
      }
      const updated: Note = {
        ...list[idx],
        ...payload,
        updated_at: new Date().toISOString(),
      }
      list[idx] = updated
      notesState.value = [...list]
      saveToStorage()
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
      ensureInit()
      const before = notesState.value?.length || 0
      notesState.value = (notesState.value || []).filter(n => n.id !== id)
      const changed = (notesState.value?.length || 0) !== before
      saveToStorage()
      return changed
    } catch (e: any) {
      errorState.value = e?.message || 'Failed to delete note'
      return false
    } finally {
      loadingState.value = false
    }
  }

  return { notes, isLoading, error, fetchNotes, getNote, createNote, updateNote, deleteNote }
}
