<script setup>
import { onMounted, ref, computed , watch} from "vue";
import { useRouter } from "vue-router";
import { useSnippetStore } from "../stores/snippetStore";
import SnippetCard from "../Components/Snippetcard.vue";
import { useNotificationStore } from "../stores/notificationStore";
const notification = useNotificationStore();
const router = useRouter();
const snippetStore = useSnippetStore();




const currentPage = ref(1);
const snippetsPerPage = 6;

const totalPages = computed(() => {
  return Math.ceil(
    snippetStore.filteredMySnippets.length / snippetsPerPage
  );
});

const paginatedSnippets = computed(() => {
  const start = (currentPage.value - 1) * snippetsPerPage;
  const end = start + snippetsPerPage;

  return snippetStore.filteredMySnippets.slice(start, end);
});

const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++;
  }
};

const previousPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--;
  }
};

watch(
  () => [snippetStore.search, snippetStore.language],
  () => {
    currentPage.value = 1;
  }
);

onMounted(async () => {

    await snippetStore.fetchMySnippets();

    await snippetStore.fetchFavorites();

});
const viewSnippet = (id) => {
    router.push(`/snippets/${id}`);
};
const editSnippet = (id) => {

    router.push(`/edit-snippet/${id}`);
};
const deleteSnippet = async (id) => {

    const confirmDelete = confirm(
        "Are you sure you want to delete this snippet?"
    );

    if (!confirmDelete) return;

    const success = await snippetStore.deleteSnippet(id);

    if (success) {

        notification.notify(
            "Snippet deleted successfully!",
            "success"
        );

    }

};
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
                    <input class="form-control" placeholder="Search snippets..." v-model="snippetStore.search">
                </div>
                <div class="col-md-4">
                    <select class="form-select search-input" v-model="snippetStore.language">
                        <option value="">All Languages</option>
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
    <div v-if="snippetStore.loading" class="text-center">
        Loading snippets...
    </div>
    <div v-else class="row">
        <div
        class="col-md-4 mb-3"
        v-for="snippet in paginatedSnippets"
        :key="snippet._id"
        >
            <SnippetCard
                :snippet="snippet"
                :showEditDelete="true"
                @view="viewSnippet"
                @edit="editSnippet"
                @delete="deleteSnippet"
            />
        </div>
    </div>

    <nav
        v-if="totalPages > 1"
        class="d-flex justify-content-center mt-4"
        >
        <ul class="pagination">

            <li
                class="page-item"
                :class="{ disabled: currentPage === 1 }"
                >
                <button
                    class="page-link"
                    @click="previousPage"
                >
                    Previous
                </button>
            </li>

            <li
                v-for="page in totalPages"
                :key="page"
                class="page-item"
                :class="{ active: currentPage === page }"
                >
                <button
                    class="page-link"
                    @click="currentPage = page"
                >
                    {{ page }}
                </button>
            </li>

            <li
                class="page-item"
                :class="{ disabled: currentPage === totalPages }"
                >
                <button
                    class="page-link"
                    @click="nextPage"
                >
                    Next
                </button>
            </li>

        </ul>
    </nav>

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