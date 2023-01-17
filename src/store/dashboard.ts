import { defineStore } from "pinia"
import { Order } from "./order"
import { Product } from "./Product";
import { authApi } from "./user";




interface dashboardState {
    recentOrders: Order[],
    totalOrders: number;
    totalSales: number;
    totalProducts: number
    mostProducts: Product[],
    profit: number
}


const dashboardStore = defineStore('dashboard', {
    state: () : dashboardState  => ({
        recentOrders: [],
        totalOrders: 0,
        totalSales: 0,
        mostProducts: [],
        totalProducts: 0,
        profit: 0,
    }),
    actions: {
        getRecentOrders(){
            return authApi.get('/orders/show/order-recent').then(({data}) => {
                this.recentOrders = data
            })
        },
        getTotalOrders(){
            return authApi.get('/statistics/orders_total').then(({data}) => {
                this.totalOrders = data
            })
        },
        getTotalSales(){
            return authApi.get('/statistics/sales_total').then(({data}) => {
                this.totalSales = data
            })
        },
        getTotalProduct(){
            return authApi.get('/statistics/products_total').then(({data}) => {
                this.totalProducts = data
            })
        },
        getMostProducts(){
            return authApi.get('/products/show/product-most').then(({data}) => {
                this.mostProducts = data
            })
        },
        getProfit(){
            return authApi.get('/statistics/profit').then(({data}) => {
                this.profit = data
            })
        },
        requestAll(){
            this.getRecentOrders();
            this.getTotalOrders();
            this.getTotalSales();
            this.getMostProducts();
            this.getTotalProduct()
            this.getProfit()
        }
    },
     getters: {
        getMostProductById: state =>( id: number) => state.mostProducts.find(product => product.id == id)
     }
})


export default dashboardStore