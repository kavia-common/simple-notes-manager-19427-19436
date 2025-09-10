<template>
  <form class="form" @submit.prevent="onSubmit">
    <div class="row">
      <label class="label" for="title">Title</label>
      <input
        id="title"
        v-model.trim="local.title"
        type="text"
        class="input"
        placeholder="Note title"
        :disabled="submitting"
        required
      />
    </div>

    <div class="row">
      <label class="label" for="content">Content</label>
      <textarea
        id="content"
        v-model="local.content"
        class="textarea"
        placeholder="Write your note..."
        :disabled="submitting"
        rows="10"
        required
      />
    </div>

    <div class="actions">
      <button type="submit" class="btn btn-primary" :disabled="submitting">
        {{ submitLabel }}
      </button>
      <NuxtLink to="/" class="btn btn-secondary">Cancel</NuxtLink>
      <button v-if="canDelete" type="button" class="btn btn-danger" :disabled="submitting" @click="$emit('delete')">
        Delete
      </button>
    </div>

    <p v-if="error" class="error">Error: {{ error }}</p>
  </form>
</template>

<script setup lang="ts">
import { reactive, computed } from 'vue'

const props = defineProps<{
  modelValue?: { title: string; content: string } | null
  submitting?: boolean
  error?: string | null
  mode?: 'create' | 'edit'
}>()

const emit = defineEmits<{
  (e: 'submit', value: { title: string; content: string }): void
  (e: 'delete'): void
}>()

const local = reactive({
  title: props.modelValue?.title ?? '',
  content: props.modelValue?.content ?? '',
})

const submitLabel = computed(() => (props.mode === 'edit' ? 'Save Changes' : 'Create Note'))
const canDelete = computed(() => props.mode === 'edit')

function onSubmit() {
  if (!local.title || !local.content) return
  emit('submit', { title: local.title, content: local.content })
}
</script>

<style scoped>
.form {
  background: white;
  border: 1px solid var(--gray-200);
  border-radius: .5rem;
  padding: 1rem;
  display: grid;
  gap: 1rem;
}
.row { display: grid; gap: .5rem; }
.label { font-size: .875rem; color: var(--gray-700); }
.input, .textarea {
  border: 1px solid var(--gray-200);
  border-radius: .375rem;
  padding: .5rem .75rem;
  font-size: 1rem;
}
.textarea { min-height: 180px; }
.actions { display: flex; gap: .5rem; align-items: center; }
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
.btn-secondary { background: var(--gray-100); color: var(--gray-700); }
.btn-secondary:hover { background: var(--gray-200); }
.btn-danger { background: #ef4444; color: white; }
.btn-danger:hover { background: #dc2626; }
.error { color: #b91c1c; }
</style>
