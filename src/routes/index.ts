import { createRouter, createWebHistory } from "vue-router";
import Login from '../pages/Login.vue'
import Register from '../pages/Register.vue'
import Home from '../pages/Home.vue'
import userStore from "../store/user";
import { storeToRefs } from "pinia";
const routes = [
    {
        path: '/login',
        name: 'Login',
        component: Login,
    },
    {
        path: '/',
        redirect: '/login'
    },
    {
        path: '/register',
        name: 'Register',
        component: Register
    },
    {
        path: '/home',
        name: 'Home',
        component: Home,
        meta: {
            requireAuth: true,
        }
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

router.beforeEach((to, from, next) => {
    const {isLogin} = storeToRefs(userStore());
    if(to.meta.requireAuth && !isLogin.value){
        return next('/login');
    }
    if((to.name == 'Login' || to.name == 'Register') && isLogin.value){
        return next('/Home')
    }
    return next();
})

export default router