<script setup>
defineProps({
  snippet: {
    type: Object,
    required: true
  }
})

defineEmits(['view', 'edit', 'delete'])
</script>


<template>
  <div class="card shadow-sm h-100">
    <div class="card-body">
      <h5 class="card-title fw-bold">
        {{ snippet.title }}
      </h5>
      <span class="badge bg-success mb-2">
        {{ snippet.language }}
      </span>
      <p class="card-text mt-2">
        {{ snippet.description }}
      </p>
      <div class="mb-2">
        <span
          v-for="tag in snippet.tags"
          :key="tag"
          class="badge bg-secondary me-1"
        >
          #{{ tag }}
        </span>
      </div>
      <p class="mb-1">
        <strong>Visibility:</strong>
        {{ snippet.visibility }}
      </p>
      <p class="text-muted small">
        Created: {{ snippet.createdAt }}
      </p>

    </div>
    <div class="card-footer bg-white">
      <div class="d-flex justify-content-between">
        <button
          class="btn btn-outline-primary btn-sm"
          @click="$emit('view', snippet.id)"
        >
          View
        </button>

        <button
          class="btn btn-outline-warning btn-sm"
          @click="$emit('edit', snippet.id)"
        >
          Edit
        </button>

        <button
          class="btn btn-outline-danger btn-sm"
          @click="$emit('delete', snippet.id)"
        >
          Delete
        </button>

      </div>
    </div>

  </div>
</template>

