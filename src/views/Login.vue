<script setup>
import {ref} from 'vue'
import { useRouter } from 'vue-router'
const router = useRouter()
const email = ref('')
const password = ref('')
function login(){
    if(email.value === ''){
        alert('Email is Required.')
    }if(password.value === ''){
        alert('Password is Required.')
    }
}
function gotoregister(){
    router.push('/register')
}
</script>

<template>
    <div class="login-container">
        <div class="login-card">
            <h2 class="text-center mb-4">Login Here!</h2>
            <form>
                <div class="mb-3">
                    <label class="form-label">Email</label>
                    <input type="email" class="form-control" v-model="email" />
                </div>  
                <div class="mb-4"> 
                    <label class="form-label">Password</label>
                    <input type="password" class="form-control" v-model="password" />
                </div>     
                <button class="btn btn-success w-100" @click="login">Login</button>
            </form>
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
