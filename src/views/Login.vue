<script setup>
import { reactive } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "../stores/authStore";

const router = useRouter();

const authStore = useAuthStore();

const form = reactive({

    email:"",
    password:""

});

const errors = reactive({
    email: "",
    password: ""
});

const isValidEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
};

const validateForm = () => {

    errors.email = "";
    errors.password = "";

    let isValid = true;

    // Email
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

    return isValid;
};

const login = async () => {

    if (!validateForm()) return;

    const success = await authStore.login({
        email: form.email.trim(),
        password: form.password
    });

    if (success) {
        router.push("/");
    }
};

function gotoregister(){
    router.push('/register');

}
</script>

<template>
    <div class="login-container">
        <div class="login-card">
            <h2 class="text-center mb-4">Login Here!</h2>
            <form @submit.prevent="login">
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
                <button type="submit" class="btn btn-success w-100">
                    Login
                </button>
            </form>

             <div
                v-if="authStore.error"
                class="alert alert-danger mt-3"
            >
                {{ authStore.error }}
            </div>
            <br>
            <h6>Don't have an Account? </h6>
            <button class="btn btn-success w-100" @click="gotoregister">Register here</button>
        </div>   
    </div>     
</template>

<style scoped>

.login-container {

    min-height: 80vh;

    display: flex;

    justify-content: center;

    align-items: center;

    background-color: #f8f9fa;

    margin-top: 20px;
}

.login-card {

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
