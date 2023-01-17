import { createRouter, createWebHistory } from "vue-router";
// Authentication Pages Below
import Login from '../pages/Auth/Login.vue'
import Register from '../pages/Auth/Register.vue'
// Mechant Pages Below
import Index from '../pages/Merchant/Index.vue'
import Dashboard from '../pages/Merchant/Dashboard.vue'
import Order from '../pages/Merchant/Order.vue'
// Merchant - Product Pages
import Product from '../pages/Merchant/Product/Index.vue'
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
        name: 'Home',
        redirect: 'dashboard',
        component: Index,
        children: [
            {
                path: 'dashboard',
                name: 'Dashboard',
                component: Dashboard,
                meta: {
                    requireAuth: true,
                }
            }, 
            {
                path: '/products',
                name: 'Product',
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
                            const { categories } = storeToRefs(categoryStore());
                            
                            if(!categories.value || !product){
                                return next({name: 'Product'})
                            }
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
                        path: 'category',
                        name: 'Product.create',
                        component: CreateProduct,
                        meta: {
                            requireAuth: true,
                        },
                        //@ts-ignore
                        beforeEnter: (to, from, next) => {
                            const {categories} = storeToRefs(categoryStore());
                            if(categories.value.length < 1){
                                return next({name: 'Product'})
                            }
                            return next()
                        }
                    }
                ],
                meta: {
                    requireAuth: true,
                }
            }, 
            {
                path: 'orders',
                name: 'Order',
                component: Order,
                //@ts-ignore
                beforeEnter: (to, from, next) => {
                    const $order = orderStore();
                    const {orders} = storeToRefs($order)
                    if(orders.value.length > 0){
                        return next();
                    }
                    $order.getOrders().then(() => {
                        return next();
                    })
                }
            }
            
        ]
    },
    
]
    
const router = createRouter({
    history: createWebHistory(),
    routes
})

router.beforeEach((to, from, next) => {
    nprogress.start();
    const {isLogin} = storeToRefs(userStore());
    if(to.meta.requireAuth && !isLogin.value){
        return next('/login');
    }
    if((to.name == 'Login' || to.name == 'Register') && isLogin.value){
        return next('/dashboard')
    }
    
    return next();
})

router.afterEach(() => {
    nprogress.done()
})

export default router