import { defineStore } from "pinia";
import api from "../services/api.js";

export const useAuthStore = defineStore("auth", {

    state: () => ({
        user: JSON.parse(localStorage.getItem("user")) || null,
        token: localStorage.getItem("token") || null,
        loading: false,
        error: null
    }),

    getters: {
        isAuthenticated: (state) => !!state.token
    },

    actions: {

        async register(userData) {

            this.loading = true;
            this.error = null;

            try {

                const { data } = await api.post("/users/register", userData);

                this.user = data.user;
                this.token = data.token;

                localStorage.setItem("user", JSON.stringify(data.user));
                localStorage.setItem("token", data.token);

                return true;

            } catch (error) {

                this.error = error.response?.data?.message || "Registration Failed";

                return false;

            } finally {

                this.loading = false;

            }

        },

        async login(userData) {

            this.loading = true;
            this.error = null;

            try {

                const { data } = await api.post("/users/login", userData);

                this.user = data.user;
                this.token = data.token;

                localStorage.setItem("user", JSON.stringify(data.user));
                localStorage.setItem("token", data.token);

                return true;

            } catch (error) {

                this.error = error.response?.data?.message || "Login Failed";

                return false;

            } finally {

                this.loading = false;

            }

        },

        logout() {

            this.user = null;
            this.token = null;

            localStorage.removeItem("user");
            localStorage.removeItem("token");

        },
        async getProfile() {

                this.loading = true;
                this.error = null;

                try {

                    const { data } = await api.get("/users/profile");

                    this.user = data;

                    localStorage.setItem(
                        "user",
                        JSON.stringify(data)
                    );

                    return true;

                } catch (error) {

                    this.error =
                        error.response?.data?.message ||
                        "Unable to load profile";

                    return false;

                } finally {

                    this.loading = false;

                }

        },
        async updateProfile(profileData) {

            this.loading = true;

            this.error = null;

            try {

                const { data } = await api.put(
                    "/users/profile",
                    profileData
                );

                this.user = data.user;

                localStorage.setItem(
                    "user",
                    JSON.stringify(data.user)
                );

                return true;

            } catch (error) {

                this.error =
                    error.response?.data?.message ||
                    "Update Failed";

                return false;

            } finally {

                this.loading = false;

            }

        }

    }

});