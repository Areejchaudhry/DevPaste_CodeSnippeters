<script setup>

import { reactive } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "../stores/authStore";

const router = useRouter();
const authStore = useAuthStore();

const form = reactive({
    name: "",
    email: "",
    password: "",
    confirmpassword : ""
});

const errors = reactive({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
});
//regex checking
const isValidEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
};

const validateForm = () => {
    errors.name = "";
    errors.email = "";
    errors.password = "";
    errors.confirmPassword = "";

    let isValid = true;
//check if Name is written
    if (!form.name.trim()) {
        errors.name = "Name is required.";
        isValid = false;
    }

    // check email
    if (!form.email.trim()) {
        errors.email = "Email is required.";
        isValid = false;
    }
    else if (!isValidEmail(form.email)) {
        errors.email = "Please enter a valid email.";
        isValid = false;
    }

    // Password
    if (!form.password) {
        errors.password = "Password is required.";
        isValid = false;
    }
    else if (form.password.length < 6) {
        errors.password = "Password must be at least 6 characters.";
        isValid = false;
    }

    // Confirm Password
    if (!form.confirmpassword) {
        errors.confirmPassword = "Please confirm your password.";
        isValid = false;
    }
    else if (form.password !== form.confirmpassword) {
        errors.confirmPassword = "Passwords do not match.";
        isValid = false;
    }

    return isValid;
};

const register = async () => {

    if (!validateForm()) return;

    const success = await authStore.register({
        name: form.name,
        email: form.email,
        password: form.password
    });

    if (success) {
        router.push("/");

    }

};
</script>

<template>
    <div class="register-container">
        <div class="register-card">
            <h2 class="text-center mb-4">Register Here!</h2>
            <form @submit.prevent = "register">
                <div class="mb-3">
                    <label class="form-label">Name</label>
                    <input type="text" class="form-control" v-model="form.name" />
                    <small class="text-danger">{{ errors.name }}</small>
                </div>
                <div class="mb-3">
                    <label class="form-label">Email</label>
                    <input type="email" class="form-control" v-model="form.email" />
                    <small class="text-danger">{{ errors.email }}</small>
                </div>  
                <div class="mb-4"> 
                    <label class="form-label">Password</label>
                    <input type="password" class="form-control" v-model="form.password" />
                    <small class="text-danger">{{ errors.password }}</small>
                </div>  
                <div class="mb-4"> 
                    <label class="form-label">Confirm Password</label>
                    <input type="password" class="form-control" v-model="form.confirmpassword" />
                    <small class="text-danger">
                        {{ errors.confirmPassword }}
                    </small>
                </div>   
                <button type="submit" class="btn btn-success w-100">
                    Register
                </button>
            </form>


            <div
                v-if="authStore.error"
                class="alert alert-danger mt-3"
            >
                {{ authStore.error }}
            </div>
        </div>   
    </div>     
</template>

<style scoped>

.register-container {

    min-height: 80vh;

    display: flex;

    justify-content: center;

    align-items: center;

    background-color: #f8f9fa;

    margin-top: 20px;
}

.register-card {

    width: 100%;

    max-width: 450px;

    background: white;

    padding: 40px;

    border-radius: 15px;

    box-shadow: 0 4px 20px rgba(0,0,0,0.1);
}

h2 {

    font-weight: bold;

    color: #198754;
}

.form-control {

    height: 50px;

    border-radius: 10px;
}

.btn {

    height: 50px;

    font-size: 1.1rem;

    border-radius: 10px;
}

</style>
