import { createRouter , createWebHistory } from "vue-router";
import Home from '../src/views/Home.vue'
import MySnippets from '../src/views/MySnippets.vue'
import Login from '../src/views/Login.vue'
import Register from "../src/views/Register.vue"
import Profile from '../src/views/Profile.vue'
import createsnippets from '../src/views/CreateSnippet.vue'

const routes = [
    {
        path : '/' , 
        component: Home
    },
    {
        path : '/MySnippets' , 
        component: MySnippets
    },
    {
        path : '/login' , 
        component: Login
    },
    {
        path : '/register' , 
        component: Register
    },
    {
        path : '/myprofile' , 
        component: Profile
    },
    {
        path : '/create-snippets' , 
        component: createsnippets

    }
]

const router = createRouter({
    history : createWebHistory(),
    routes
})

export default router
