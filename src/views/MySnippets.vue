<script setup>
import { useRouter } from 'vue-router';
const router = useRouter()

import { ref } from 'vue'
import SnippetCard from '../Components/Snippetcard.vue'

const snippets = ref([
  {
    id: 1,
    title: 'Array Methods',
    language: 'JavaScript',
    description: 'Useful array methods.',
    tags: ['javascript', 'array'],
    visibility: 'Public',
    createdAt: '2026-06-17'
  }
])

const viewSnippet = (id) => {
  console.log('View', id)
}

const editSnippet = (id) => {
  console.log('Edit', id)
}

const deleteSnippet = (id) => {
  console.log('Delete', id)
}

</script>

<template>
<div class="container mt-5">
    <div class="row align-items-center mb-4">
        <div class="col-md-6">
            <h2 class="fw-bold text-success">My Snippets</h2>
        </div>
        <div class="col-md-6 text-md-end">
            <router-link to="/create-snippets" class="btn btn-success btn-lg" >+ Create Snippet</router-link>
        </div>
    </div>
    <div class="card shadow-sm border-0 mb-4">
        <div class="card-body">
            <div class="row g-3">
                <div class="col-md-8">
                    <input type="text" class="form-control search-input" placeholder="Search snippets..."  />
                </div>
                <div class="col-md-4">
                    <select class="form-select search-input">
                        <option selected>All Languages</option>
                        <option value="HTML">HTML</option>
                        <option value="CSS">CSS</option>
                        <option value="JavaScript">JavaScript</option>
                        <option value="Kotlin">Kotlin</option>
                        <option value="Python">Python</option>
                        <option value="Java">Java</option>
                        <option value="SQL">SQL</option>
                        <option value="JSON">JSON</option>
                        <option value="C#">C#</option>
                    </select>
                </div>
            </div>
        </div>

    </div>
    <div class="row">
        <div
        class="col-md-4 mb-3"
        v-for="snippet in snippets"
        :key="snippet.id"
        >
            <SnippetCard
                :snippet="snippet"
                @view="viewSnippet"
                @edit="editSnippet"
                @delete="deleteSnippet"
            />
        </div>
    </div>

</div>

</template>

<style scoped>

.container{
    max-width: 1200px;
}

.card{
    border-radius: 15px;
}

.search-input{
    height: 50px;
    border-radius: 10px;
}

.btn-success{
    border-radius: 10px;
    padding: 12px 25px;
}

h2{
    margin-bottom: 5px;
}

</style>