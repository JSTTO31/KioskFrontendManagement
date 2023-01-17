import axios from "axios";
import { defineStore } from "pinia";
import { Page } from "../composables/interfaces";
import { authApi } from "./user";

export interface OrderItem{
    id: number,
    order_id: number,
    created_at: string,
    updated_at: string,
    product_id: number,
    quantity: number,
    product_name: string,
    product_price: number,
    product_image: string,
    total: number,
}

export interface Order{
    id: number;
    status: string;
    order_items: OrderItem[],
    order_items_count: number;
    created_at: string;
    updated_at: string;
    order: Order,
    total: number
}

export interface paginateOrder{
    current_page: number;
    data: Order[],
    from: number;
    last_page: number;
    last_page_url: string;
    next_page_url: string;
    path: string;
    per_page: number;
    prev_page_url: string | null
    to: number;
    total: number;
}

interface OrderState{
    orders: Order[],
    order: Order,
    page: Page,
    recent: Order[]
}

const orderStore = defineStore('order', {
    state: () : OrderState => ({
        orders:  [],
        order: {} as Order,
        page: {} as Page,
        recent: []
    }),
    actions: {
        getOrders(filter = ""){
            return authApi.get('/orders' + filter).then(({data}) => {
                const {pageOptions, orders} = data
                this.orders = orders;
                this.page = pageOptions
            });
        },
        getOrder(id: number){
            const exists = this.orders.find((order) => order.id == id)
            
            if(!exists){
                return authApi.get(`/orders/${id.toString()}`).then(({data}) => {
                    this.order = data
                })
            }
            this.order = exists;

            return this.order
        },
        prevOrders(id: number){
            const exists = this.orders.find((order) => order.id == id)
            if(!exists){
                return authApi.get('orders/' + id).then(({data}) => {
                    this.order = data
                });
            }

            return exists;
        },
        getNextOrders(){
            return authApi.get('orders').then(({data}) => {
                this.orders = data
            });
        },
        changeStatus(order: Order, status: string){
            return authApi.put(`orders/${order.id}/status_update`, {status}).then(() => {
                order.status = status
                this.orders.map(item => item.id == order.id ? order : item)
            })
        }
    },
    getters: {
        // getTotal: state => (order: Order) => order.group_order_item.reduce((sum, item) => sum += (item.price * item.order_items.length), 0),
        // numberOfOrders: state  => state.orders.total,
        // numberOfPending: state  => state.orders.data.reduce((sum, item) => sum += item.status == 'pending' ? 1 : 0 ,0),
        // numberOfCompleted: state  => state.orders.data.reduce((sum, item) => sum += item.status == 'completed' ? 1 : 0 ,0),
        // numberOfCancelled: state  => state.orders.data.reduce((sum, item) => sum += item.status == 'cancelled' ? 1 : 0 ,0),
        // numberOfOrderInMonth: state => (monthNumber: number) => {
        //     return state.orders.data.reduce((sum, item) => sum += new Date(item.created_at).getMonth() == monthNumber ? 1 : 0, 0);
        // }
    }
})

export default orderStore;




// getAll(){
//     return authApi.get('orders').then(({data}) => {
//         let productId : any | number = null;
        
//         this.orders = data.map((order : any) => {
//             let container : any = []
            
//             order.order_items.forEach((item : any) => {
//                 if(productId == null){
//                     productId = item.product.id
//                     container.push({...item.product, order_items: [item]});
//                 }else if(productId == item.product.id){
//                     //@ts-ignore
//                     const product = container.find(product => product.id == item.product.id);
//                     product.order_items.push(item)
//                 }else{
//                     productId = item.product.id;
//                     container.push({...item.product, order_items: [item]});
//                 }
//             });

//             return {
//                 id: order.id,
//                 status: order.status,
//                 group_order_item: container,
//                 created_at: order.created_at,
//                 updated_at: order.updated_at,
//             }
//         })

//     });
// },