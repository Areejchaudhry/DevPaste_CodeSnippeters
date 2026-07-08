<script setup>
import { useAuthStore } from "../stores/authStore.js";
import { useSnippetStore } from "../stores/snippetStore";
import { useThemeStore } from "../stores/themeStore";
import { useRouter } from "vue-router";
import { useNotificationStore } from "../stores/notificationStore";
const notification = useNotificationStore();
const authStore = useAuthStore();
const snippetStore = useSnippetStore();
const router = useRouter();
const themeStore = useThemeStore();

const logout = () => {

    authStore.logout();

    notification.notify(
        "Logged out successfully!",
        "success"
    );

    router.push("/login");

};

const searchSnippets = async () => {

    await router.push("/");

    setTimeout(() => {

        const section = document.getElementById("latest-snippets");

        if (section) {
            section.scrollIntoView({
                behavior: "smooth"
            });
        }

    }, 100);

};
</script>

<template>
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm">
        <div class="container">
            <router-link class="navbar-brand fw-bold" to="/" >DevPaste </router-link>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" >
                <span class="navbar-toggler-icon"></span>
            </button>
            <div>
                <form
                    class="d-flex search-form"
                    @submit.prevent="searchSnippets"
                >
                    <input
                        class="form-control me-2"
                        type="search"
                        placeholder="Search snippets..."
                        v-model="snippetStore.search"
                    >

                    <button
                        class="btn btn-success"
                        type="submit"
                    >
                        Search
                    </button>
                </form>
            </div>
            <div class="collapse navbar-collapse" id="navbarNav" >
                <ul class="navbar-nav ms-auto">
                    <li class="nav-item">
                        <router-link  class="nav-link" to="/">Home</router-link>
                    </li>
                    <li
                        v-if="authStore.isAuthenticated"
                        class="nav-item"
                    >
                            <router-link
                                class="nav-link"
                                to="/myprofile"
                            >
                                My Profile
                            </router-link>
                    </li>
                    <li
                        v-if="authStore.isAuthenticated"
                        class="nav-item"
                    >
                        <router-link
                            class="nav-link"
                            to="/MySnippets"
                        >
                            My Snippets
                        </router-link>
                    </li>
                    <li
                        v-if="authStore.isAuthenticated"
                        class="nav-item"
                    >
                        <router-link
                            class="nav-link"
                            to="/favorites"
                        >
                            Favorites
                        </router-link>
                    </li>
                    <li class="nav-item">

                        <router-link
                            v-if="!authStore.isAuthenticated"
                            class="nav-link"
                            to="/login"
                        >
                            Login
                        </router-link>

                        <a
                            v-else
                            class="nav-link"
                            href="#"
                            @click.prevent="logout"
                        >
                            Logout
                        </a>

                    </li>
                    <li>
                        <button
                            class="btn btn-outline-light ms-3"
                            @click="themeStore.toggleTheme"
                        >
                            {{ themeStore.isDark ? "☀️ Light" : "🌙 Dark" }}
                        </button>
                    </li>
                </ul>
            </div>
        </div>
        
    </nav>


</template>


<style scoped>

.navbar {
    padding-top: 30px;
    padding-bottom: 30px;
}

.navbar-brand {
  font-size: 1.6rem;
  letter-spacing: 1px;
}

.nav-link {
  font-size: 1rem;
  margin: 0 8px;
  transition: 0.3s;
}

.nav-link:hover {
  color: #28a745 !important;
}

.search-form {
  min-width: 280px;
}

.form-control {
  border-radius: 8px;
}

.btn-success {
  border-radius: 8px;
}

</style>
