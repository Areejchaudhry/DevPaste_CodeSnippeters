<script setup>
import { onMounted, ref, computed , watch , onBeforeUnmount} from "vue";
import { useRouter } from "vue-router";
import { useSnippetStore } from "../stores/snippetStore";
import SnippetCard from "../Components/Snippetcard.vue";
import heroImage from '@/Assets/coding.jpg'
const router = useRouter();

import { useAuthStore } from "../stores/authStore";
const authStore = useAuthStore();

onBeforeUnmount(() => {
    snippetStore.search = "";
});


const popularTopics = [
    "Navbar",
    "Footer",
    "Register Form",
    "Login Form",
    "Sidebar",
    "Vue Router",
    "Product Card",
    "Interactive Cart",
    "Payment Module"
];

const searchByTopic = (topic) => {

    // Set the search text
    snippetStore.search = topic;

    // Wait for Vue to update the filtered list
    setTimeout(() => {

        const section = document.getElementById("latest-snippets");

        if (section) {
            section.scrollIntoView({
                behavior: "smooth"
            });
        }

    }, 100);

};

const exploreSnippets = () => {

    const section = document.getElementById("latest-snippets");

    if (section) {
        section.scrollIntoView({
            behavior: "smooth"
        });
    }

};

const getStarted = () => {

    if (authStore.isAuthenticated) {
        router.push("/create-snippets");
    } else {
        router.push("/register");
    }

};



const viewSnippet = (id)=>{

    router.push(`/snippets/${id}`);

}
const snippetStore = useSnippetStore();

const currentPage = ref(1);
const snippetsPerPage = 6;

const totalPages = computed(() => {
  return Math.ceil(
    snippetStore.filteredPublicSnippets.length / snippetsPerPage
  );
});

const paginatedSnippets = computed(() => {
  const start = (currentPage.value - 1) * snippetsPerPage;
  const end = start + snippetsPerPage;

  return snippetStore.filteredPublicSnippets.slice(start, end);
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

    await snippetStore.fetchSnippets();

    await snippetStore.fetchFavorites();

});
</script>

<template>
    <div class="container-fluid mt-4 div-main">
      <div class="row">
            <!-- Sidebar for lists of snippets to select from -->
            <div class="col-lg-3">
                <div class="snippet-sidebar">
                    <h4>Popular Snippets</h4>
                    <ul class="list-group">
                        <li
                            v-for="topic in popularTopics"
                            :key="topic"
                            class="list-group-item"
                            @click="searchByTopic(topic)"
                        >
                            {{ topic }}
                        </li>
                    </ul>
                </div>
            </div>
            <div class="col-lg-9">
                <div class="hero-section" :style="{ backgroundImage: `url(${heroImage})` }">
                    <div class="overlay">
                        <h1>Save, Organize & Share Code</h1>
                        <p>DevPaste helps students manage code snippets and share with others.</p>
                        <button class="btn btn-success me-2" @click="exploreSnippets">Explore Snippets</button>
                        <button class="btn btn-outline-light" @click="getStarted">Get Started</button>
                    </div>
                </div>
            </div>
        </div>
        <div
            id="latest-snippets"
            class="container mt-5"
        >
            <h2 class="mb-4">

                Latest Public Snippets

            </h2>

            <div
            v-if="snippetStore.loading"
            class="text-center">

                Loading...

            </div>

            <div
            v-else
            class="row">

                <div
                    class="col-md-4 mb-4"
                    v-for="snippet in paginatedSnippets"
                    :key="snippet._id"
                >

                    <SnippetCard
                        :snippet="snippet"
                        :showEditDelete="false"
                        @view="viewSnippet"
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

    </div>
</template>

<style scoped>
.hero-section {

  height: 500px;
  background-size: cover;
  background-position: center;

  border-radius: 15px;

  position: relative;

  overflow: hidden;
}

.overlay {

  background: rgba(0,0,0,0.55);

  height: 100%;

  display: flex;
  flex-direction: column;
  justify-content: center;

  padding: 50px;

  color: white;
}

.overlay h1 {

  font-size: 3rem;
  font-weight: bold;
}

.overlay p {

  font-size: 1.2rem;
  max-width: 600px;
}

.snippet-sidebar {

  background: white;

  border-radius: 15px;

  padding: 20px;

  box-shadow:
  0 2px 10px rgba(0,0,0,0.1);
}

.list-group-item {

  cursor: pointer;
  transition: 0.3s;
}

.list-group-item:hover {

  background: #198754;
  color: white;
}
.div-main{
  padding-bottom: 30px;
}
</style>