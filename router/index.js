import { createRouter , createWebHistory } from "vue-router";
import Home from '../src/views/Home.vue'
import MySnippets from '../src/views/MySnippets.vue'
import Login from '../src/views/Login.vue'
import Register from "../src/views/Register.vue"
import Profile from '../src/views/Profile.vue'
import createsnippets from '../src/views/CreateSnippet.vue'
import { useAuthStore } from "../src/stores/authStore";
import SnippetDetails from "../src/views/SnippetDetails.vue";
import Favorites from "../src/views/Favourites.vue";

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

    },
    {
    path: "/snippets/:id",
    component: SnippetDetails
    },
    {
    path: "/edit-snippet/:id",
    component: createsnippets
    },
    {
    path: "/favorites",
    component: Favorites
    }
]

const router = createRouter({
    history : createWebHistory(),
    routes
})

router.beforeEach((to, from, next)=>{

    const authStore = useAuthStore();

    const protectedRoutes=[

        "/MySnippets",
        "/create-snippets",
        "/myprofile"

    ];

    if(

        protectedRoutes.includes(to.path)
        &&
        !authStore.isAuthenticated

    ){

        next("/login");

    }

    else{

        next();

    }

});
export default router
