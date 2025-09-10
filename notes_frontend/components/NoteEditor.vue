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
  composes: card card-pad from global;
  background: white;
  border: 1px solid var(--gray-200);
  border-radius: var(--radius-lg);
  display: grid;
  gap: var(--space-4);
}
.row { display: grid; gap: var(--space-2); }
.label { font-size: .875rem; color: var(--gray-700); }
.actions { display: flex; gap: var(--space-2); align-items: center; }
.error { color: var(--red-600); }
</style>
