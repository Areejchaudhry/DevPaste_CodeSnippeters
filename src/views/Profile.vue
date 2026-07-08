<script setup>

import { onMounted, ref } from "vue";
import { useAuthStore } from "../stores/authStore";
import { useSnippetStore } from "../stores/snippetStore";

const authStore = useAuthStore();
const snippetStore = useSnippetStore();

import { reactive } from "vue";

const form = reactive({

    name: "",
    email: "",
    password: "",
    confirmPassword: ""

});
const joinedDate = ref("");
const totalSnippets = ref(0);

onMounted(async () => {

    await authStore.getProfile();

    await snippetStore.fetchMySnippets();

    form.name = authStore.user.name;

    form.email = authStore.user.email;

    totalSnippets.value =
        snippetStore.mySnippets.length;

    joinedDate.value =
        new Date(authStore.user.createdAt)
            .toLocaleDateString();

});

const saveProfile = async () => {

    if (

        form.password &&
        form.password !== form.confirmPassword

    ) {

        notification.notify(
            "Passwords do not match.",
            "danger"
        );

        return;

    }

    const success = await authStore.updateProfile({

        name: form.name,
        email: form.email,
        password: form.password

    });

    if (success) {

        notification.notify("Profile updated successfully!", "success")

        form.password = "";
        form.confirmPassword = "";

    }

};
</script>



<template>
    <div class="container mt-5 main-form">
        <div class="row">
            <div class="col-lg-4">
                <div class='profile-card'>
                    <img src='../Assets/profile.webp' alt='Profile Image' class="profile-img">
                    <h1>{{form.name}}</h1>
                    <p class='title'>Joined on : {{ joinedDate }}</p>
                    <p>Total Snippets: {{ totalSnippets }}</p>
                    <p>Favourites: 0</p>
                </div>               
            </div>
            <div class="col-lg-8">
                <form class="row g-3 " @submit.prevent="saveProfile">
                    <h3>Edit Your Profile</h3>
                    <div class="col-md-6">
                        <label  class="form-label">Name</label>
                        <input type="text" class="form-control"  v-model="form.name">
                    </div>
                    <div class="col-md-6">
                        <label  class="form-label">Email</label>
                        <input type="email" class="form-control"  v-model="form.email">
                    </div>
                    <div class="col-12">
                        <label  class="form-label">Password</label>
                        <input type="password" class="form-control" v-model="password">
                    </div>
                    <div class="col-12">
                        <label  class="form-label">Confirm Password</label>
                        <input type="password" class="form-control" v-model="cpassword">
                    </div>
                    <div class="col-12">
                        <button type="submit" class="btn btn-success w-100">Save Changes</button>
                    </div>
                </form>

            </div>

        </div>
    </div>
</template>

<style scoped>
.main-form{
    margin-bottom: 30px;
}
.profile-card {

    border-radius: 15px;

    box-shadow:
    0 4px 15px rgba(0,0,0,0.1);

    padding: 25px;

    text-align: center;
}
.profile-img {

    width: 150px;

    height: 150px;

    border-radius: 50%;

    object-fit: cover;

    margin-bottom: 20px;
}
</style>