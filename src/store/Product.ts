import { defineStore } from "pinia";
import { Page } from "../composables/interfaces";
import { authApi } from "./user";


export const search = {
    name: "",
    category: "",
    stocks: {
        min: null,
        max: null,
    },
}

export interface Product{
    id: number;
    category_id: number;
    name: string;
    status: string;
    stocks: number;
    image: string;
    price: number;
    created_at: string;
    updated_at: string;
    order_items_count: number;
    order_items_sum_quantity: number;
    sales: number;
    
}

export interface Stock{
    id: number;
    name: string;
    status: string;
    product_id: number;
    created_at: string;
    updated_at: string;
}



interface ProductState{
    products: Product[],
    product: Product,
    page: Page,
}


const productStore = defineStore('product', {
    state: () : ProductState => ({
        products: [],
        product: {} as Product,
        page: {} as Page,
    }),
    actions: {
        getAll(filter = ""){
            this.page.query = filter
            return authApi.get(`/products` + filter).then(({data}) => {
                const {products, pageOptions} = data;
                this.products = products;
                this.page = pageOptions;

                return this.products
            })
        },
        get(product_id: number){
            return authApi.get('/products/' + product_id).then(({data}) => {
                this.product = data
            })
        },
        add(product: any){
            const formData = new FormData();
            formData.append('image', product.image);
            formData.append('name', product.name);
            formData.append('price', product.price);
            formData.append('stocks', product.stocks);
            formData.append('category_id', product.category_id);
            return authApi.post('/products', formData, {
                    headers: {
                        'Content-type': 'multipart/form-data',
                    }
                }).then(({data}) => {
                    this.products.unshift(data)
                    this.products.pop();
                })
        },
        // add(product: any){
        //     const formData = new FormData();
        //     formData.append('image', product.image);
        //     formData.append('name', product.name);
        //     formData.append('price', product.price);
        //     formData.append('stocks', product.stocks);
        //     formData.append('category_id', product.category_id);

        //     const container : any = [];
            
        //     for (let index = 0; index < 50; index++) {
        //         container.push( authApi.post('/products', formData, {
        //             headers: {
        //                 'Content-type': 'multipart/form-data',
        //             }
        //         }).then(({data}) => {
        //             this.products.push(data)
        //         }))
        //     }

        //     return Promise.all(container);
        // },
        remove(product_id: number){
            return authApi.delete('/products/' + product_id).then(() => {
                this.products = this.products.filter(item => item.id != product_id);
            });
        },
        update(product_id: number, product: Product){
            return authApi.put('/products/' + product_id, {
                name: product.name, 
                price: product.price,
                stocks: product.stocks,
                category_id: product.category_id,
                status: product.status
            }).then(({data}) => {               
                this.products = this.products.map(product => product.id == product_id ? data : product)
            });
        },
        updateStock(product_id: number, quantity: number){
            return authApi.put(`/product/${product_id}/stocks`, {quantity}).then(({data}) => {
                console.log(data);
                
            })
        },
        updateImage(product_id: number, file: any){
            const formData = new FormData();
            formData.append('image', file);
            return authApi.post(`/products/${product_id}/image`, formData, { headers: {'Content-type': 'multipart/form-data'} }).then(({data}) => {
                let product = this.products.find(product => product.id == product_id)
                if(product){
                    product = data;
                }
            }).catch((err) => {
                console.log(err);
            })
        },
    },
    getters: {
        getProductById: state => (id: number) => state.products.find(product => product.id == id)
    }
})

export default productStore;