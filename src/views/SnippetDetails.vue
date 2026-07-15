<script setup>

import { onMounted } from "vue";
import { useRoute } from "vue-router";
import { useSnippetStore } from "../stores/snippetStore";
import { useNotificationStore } from "../stores/notificationStore";
const notification = useNotificationStore();

const route = useRoute();

const snippetStore = useSnippetStore();

onMounted(()=>{

    snippetStore.getSnippet(route.params.id);

});

const copyCode=()=>{

    navigator.clipboard.writeText(
        snippetStore.currentSnippet.code
    );

    notification.notify(
        "Code copied successfully!",
        "success"
    );

}

</script>

<template>

<div
v-if="snippetStore.loading"
class="container mt-5 text-center">

Loading...

</div>

<div
v-else-if="snippetStore.currentSnippet"
class="container mt-5">

<div class="card shadow">

<div class="card-body">

<h2>

{{ snippetStore.currentSnippet.title }}

</h2>

<span class="badge bg-success">

{{ snippetStore.currentSnippet.language }}

</span>

<p class="mt-3">

{{ snippetStore.currentSnippet.description }}

</p>

<div class="mb-3">

<span

v-for="tag in snippetStore.currentSnippet.tags"

:key="tag"

class="badge bg-secondary me-2">

#{{ tag }}

</span>

</div>

<p>

<strong>Visibility :</strong>

{{ snippetStore.currentSnippet.visibility }}

</p>

<p>

<strong>Created :</strong>

{{ new Date(snippetStore.currentSnippet.createdAt).toLocaleDateString() }}

</p>

<pre class="bg-dark text-light p-3 rounded">

<code>

{{ snippetStore.currentSnippet.code }}

</code>

</pre>

<button

class="btn btn-success"

@click="copyCode">

Copy Code

</button>

</div>

</div>

</div>

</template>