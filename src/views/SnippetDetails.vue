
<script setup>
import { ref } from 'vue'

const snippet = ref({
  id: 1,
  title: 'Array Methods',
  language: 'JavaScript',
  description: 'Useful array methods with examples.',
  tags: ['javascript', 'array'],
  visibility: 'Public',
  createdAt: '17 June 2026',
  code: `const numbers = [1,2,3,4]

const doubled = numbers.map(num => num * 2)

console.log(doubled)`
})

const copyCode = () => {
  navigator.clipboard.writeText(snippet.value.code)
  alert('Code copied!')
}
</script>

<template>
    <div class="container mt-5">
        <div class="card shadow">
            <div class="card-body">
                <h2 class="fw-bold mb-3">{{ snippet.title }}</h2>
                <span class="badge bg-primary mb-3">
                {{ snippet.language }}
                </span>
                <h5>Description</h5>
                <p>{{ snippet.description }}</p>
                <h5>Tags</h5>
                <div class="mb-3">
                <span
                    v-for="tag in snippet.tags"
                    :key="tag"
                    class="badge bg-secondary me-2"
                >
                    #{{ tag }}
                </span>
                </div>
                <p>
                <strong>Visibility:</strong>
                {{ snippet.visibility }}
                </p>
                <p>
                <strong>Created:</strong>
                {{ snippet.createdAt }}
                </p>
                <h5 class="mt-4">Code</h5>

                <pre class="bg-dark text-light p-3 rounded">
                    <code>{{ snippet.code }}</code>
                </pre>
                <div class="mt-3">
                <button class="btn btn-success me-2" @click="copyCode"  > Copy Code </button>
                <button class="btn btn-secondary" @click="$router.back()">Back</button>
                </div>
            </div>

        </div>
    </div>
</template>
