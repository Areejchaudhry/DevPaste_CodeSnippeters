<script setup>
import { onMounted } from "vue";
import { useRouter } from "vue-router";
import { useSnippetStore } from "../stores/snippetStore";
import SnippetCard from "../Components/Snippetcard.vue";

const router = useRouter();
const snippetStore = useSnippetStore();

onMounted(async () => {
    await snippetStore.fetchFavorites();
});

const viewSnippet = (id) => {
    router.push(`/snippets/${id}`);
};

const editSnippet = (id) => {
    router.push(`/edit-snippet/${id}`);
};

const deleteSnippet = async (id) => {

    if (confirm("Delete this snippet?")) {

        const success = await snippetStore.deleteSnippet(id);

        if (success) {
            await snippetStore.fetchFavorites();
        }

    }

};
</script>

<template>

<div class="container mt-5">

    <h2 class="fw-bold text-success mb-4">
        My Favorite Snippets
    </h2>

    <div
        v-if="snippetStore.loading"
        class="text-center"
    >
        Loading...
    </div>

    <div
        v-else-if="snippetStore.favorites.length === 0"
        class="alert alert-info"
    >
        No favorite snippets yet.
    </div>

    <div
        v-else
        class="row"
    >

        <div
            class="col-md-4 mb-4"
            v-for="snippet in snippetStore.favorites"
            :key="snippet._id"
        >

            
            <SnippetCard
                :snippet="snippet"
                :showEditDelete="false"
                @view="viewSnippet"
            />

        </div>

    </div>

</div>

</template>

<style scoped>

.container{
    max-width:1200px;
}

</style>