import { createRouter, createWebHistory } from "vue-router";
// Authentication Pages Below
import Login from '../pages/Auth/Login.vue'
import Register from '../pages/Auth/Register.vue'
// Mechant Pages Below
import Index from '../pages/Merchant/Index.vue'
import Dashboard from '../pages/Merchant/Dashboard.vue'
import Order from '../pages/Merchant/Order.vue'
// Merchant - Product Pages
import ProductIndex from '../pages/Merchant/Product/Index.vue'
import Product from '../pages/Merchant/Product.vue'
import ShowProduct from '../pages/Merchant/Product/Show.vue'
import CreateProduct from '../pages/Merchant/Product/Create.vue'

// Utilities
import { storeToRefs } from "pinia";
import categoryStore from "../store/category";
import productStore from "../store/Product";
import userStore from "../store/user";
//@ts-ignore
import nprogress from 'nprogress' 
import orderStore from "../store/order";
import dashboardStore from "../store/dashboard";


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
        path: '',
        name: 'Dashboard',
        component: Dashboard,
        meta: {
            requireAuth: true,
        }
    },
    {
        path: '/products',
        name: 'Product',
        redirect: {name: 'Product.index'},
        component: Product,
        //@ts-ignore
        beforeEnter: (to, from, next) => {
            const $product = productStore();
            const {products} = storeToRefs($product)
            if(products.value.length > 0){
                return next();
            }
            $product.getAll(to.fullPath.match(/\?.*/gi)?.join("")).then(() => {
                return next();
            })
        },
        children: [
            {
                path: '',
                name: 'Product.index',
                component: ProductIndex,
                meta: {
                    requireAuth: true,
                },
            },
            {
                path: ':product_id',
                name: 'Product.show',
                component: ShowProduct,
                meta: {
                    requireAuth: true,
                },
                //@ts-ignore
                props: route => ({product: route.params.product}),
                //@ts-ignore
                beforeEnter: (to, from, next) => {
                    const $product = productStore();
                    const { getMostProductById } = storeToRefs(dashboardStore())
                    const { product, getProductById } = storeToRefs(productStore());
                    
                    //@ts-ignore
                    product.value = getProductById.value(to.params.product_id) || getMostProductById.value(to.params.product_id)
                    if(product.value){
                        return next()
                    }
                    $product.get(to.params.product_id).then(() => {
                        return next()
                    })
                }
            }, 
            {
                path: 'create',
                name: 'Product.create',
                component: CreateProduct,
                meta: {
                    requireAuth: true,
                },
            }
        ],
        meta: {
            requireAuth: true,
        }
    }, 
    {
        path: '/orders',
        name: 'Order',
        component: Order,
        meta: {
            requireAuth: true,
        },
    }
    
]
    
const router = createRouter({
    history: createWebHistory(),
    routes,
})

router.beforeEach((to, from, next) => {
    const {isLogin} = storeToRefs(userStore())
    nprogress.start();
    if(to.meta.requireAuth && !isLogin.value){
        return next({
            name: 'Login'
        })
    }
    
    return next();
})

router.afterEach(() => {
    nprogress.done()
})

export default router