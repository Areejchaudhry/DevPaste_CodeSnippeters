import { defineStore } from "pinia";
import api from "../services/api";

export const useSnippetStore = defineStore("snippet", {

    state: () => ({

        snippets: [],
        mySnippets: [],
        currentSnippet: null,
        loading: false,
        error: null,
        search: "",
        language: "",
        favorites: []

    }),

    getters: {

        filteredPublicSnippets(state) {
            return state.snippets.filter(snippet =>
            snippet.title
                .toLowerCase()
                .includes(state.search.toLowerCase())

            );

        },

        filteredMySnippets(state) {

            return state.mySnippets.filter((snippet) => {

                const searchMatch =

                    snippet.title
                        .toLowerCase()
                        .includes(state.search.toLowerCase())

                    ||

                    snippet.description
                        .toLowerCase()
                        .includes(state.search.toLowerCase());

                const languageMatch =

                    state.language === ""

                    ||

                    snippet.language === state.language;

                return searchMatch && languageMatch;

            });

        },

        isFavorite: (state) => {

            return (id) =>

                state.favorites.some(

                    snippet => snippet._id === id

                );

        }

    },

    actions: {

        // ==========================
        // Get All Public Snippets
        // ==========================

        async fetchSnippets() {

            this.loading = true;
            this.error = null;

            try {

                const { data } = await api.get("/snippets");

                this.snippets = data;

            } catch (error) {

                this.error =
                    error.response?.data?.message ||
                    "Unable to load snippets";

            } finally {

                this.loading = false;

            }

        },

        // ==========================
        // Get My Snippets
        // ==========================

        async fetchMySnippets() {

            this.loading = true;

            try {

                const { data } = await api.get("/snippets/my");

                this.mySnippets = data;

            } catch (error) {

                this.error = error.response?.data?.message;

            } finally {

                this.loading = false;

            }

        },

        // ==========================
        // Create Snippet
        // ==========================

        async createSnippet(snippetData) {

            this.loading = true;

            try {

                const { data } = await api.post("/snippets", snippetData);

                this.mySnippets.unshift(data);

                return true;

            } catch (error) {

                this.error = error.response?.data?.message;

                return false;

            } finally {

                this.loading = false;

            }

        },

        // ==========================
        // Get Single Snippet
        // ==========================

        async getSnippet(id) {

            this.loading = true;

            try {

                const { data } = await api.get(`/snippets/${id}`);

                this.currentSnippet = data;

            } catch (error) {

                this.error = error.response?.data?.message;

            } finally {

                this.loading = false;

            }

        },

        // ==========================
        // Update Snippet
        // ==========================

        async updateSnippet(id, snippetData) {

            this.loading = true;

            try {

                const { data } = await api.put(`/snippets/${id}`, snippetData);

                const index = this.mySnippets.findIndex(
                    snippet => snippet._id === id
                );

                if (index !== -1) {

                    this.mySnippets[index] = data;

                }

                return true;

            } catch (error) {

                this.error = error.response?.data?.message;

                return false;

            } finally {

                this.loading = false;

            }

        },

        // ==========================
        // Delete Snippet
        // ==========================

        async deleteSnippet(id) {

            try {

                await api.delete(`/snippets/${id}`);

                this.mySnippets = this.mySnippets.filter(
                    snippet => snippet._id !== id
                );

                return true;

            } catch (error) {

                this.error = error.response?.data?.message;

                return false;

            }

        },

        async fetchFavorites() {

            this.loading = true;

            try {

                const { data } = await api.get("/snippets/favorites");

                this.favorites = data;

            } catch (error) {

                this.error = error.response?.data?.message;

            } finally {

                this.loading = false;

            }

        },

        async toggleFavorite(id) {

            try {

                const { data } = await api.post(`/snippets/${id}/favorite`);

                await this.fetchFavorites();

                return data;

            } catch (error) {

                this.error = error.response?.data?.message;

            }

        }

    }

});