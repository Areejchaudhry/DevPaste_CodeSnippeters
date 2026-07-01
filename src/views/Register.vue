<script setup>
import {ref} from 'vue'
const name = ref('')
const email = ref('')
const password = ref('')
const cpassword = ref('')

function register(){
    if(name.value === ''){
        alert('Name is Required.')
        return
    }
    if(email.value === ''){
        alert('Email is Required.')
        return
    }
    if(!email.value.includes('@')){
        alert('Incorrect Email Format.')
        return
    }
    if(password.value === ''){
        alert('Password is Required.')
        return
    }
    if(password.value.length < 8){
        alert('Password must be at least 8 characters.')
        return
    }
    if(cpassword.value === ''){
        alert('Confirm Password is Required.')
        return
    }
    if(password.value !== cpassword.value){
        alert('Passwords do not match.')
        return
    }
    alert('Registration Successful!')
}
</script>

<template>
    <div class="register-container">
        <div class="register-card">
            <h2 class="text-center mb-4">Register Here!</h2>
            <form @submit.prevent = "register">
                <div class="mb-3">
                    <label class="form-label">Name</label>
                    <input type="text" class="form-control" v-model="name" />
                </div>
                <div class="mb-3">
                    <label class="form-label">Email</label>
                    <input type="email" class="form-control" v-model="email" />
                </div>  
                <div class="mb-4"> 
                    <label class="form-label">Password</label>
                    <input type="password" class="form-control" v-model="password" />
                </div>  
                <div class="mb-4"> 
                    <label class="form-label">Confirm Password</label>
                    <input type="password" class="form-control" v-model="cpassword" />
                </div>   
                <button class="btn btn-success w-100">Register</button>
            </form>
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
