<script setup>
import { ref } from 'vue';
const name = ref('Areej')
const email = ref('')
const password = ref('')
const cpassword = ref('')
const joined_date = ref('3/4/2022')
const totalsnippets = ref('23')
const fav = ref('4')

</script>

<template>
    <div class="container mt-5 main-form">
        <div class="row">
            <div class="col-lg-4">
                <div class='profile-card'>
                    <img src='../Assets/profile.webp' alt='Profile Image' class="profile-img">
                    <h1>{{name}}</h1>
                    <p class='title'>Joined on : {{ joined_date }}</p>
                    <p>Total Snippets: {{ totalsnippets }}</p>
                    <p>Favourites: {{ fav }}</p>
                </div>               
            </div>
            <div class="col-lg-8">
                <form class="row g-3 ">
                    <h3>Edit Your Profile</h3>
                    <div class="col-md-6">
                        <label  class="form-label">Name</label>
                        <input type="text" class="form-control" v-model="name">
                    </div>
                    <div class="col-md-6">
                        <label  class="form-label">Email</label>
                        <input type="email" class="form-control" v-model="email">
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