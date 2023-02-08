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

export interface SubImages{
    id: number;
    product_id: number;
    location: string;
    created_at: string;
    updated_at: string;
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
    sub_images: SubImages[];
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
    total_stocks: number,
    total_available: number,
    total_disable: number,
    total_sales: number,
    total_draft: number
}


const productStore = defineStore('product', {
    state: () : ProductState => ({
        products: [],
        product: {} as Product,
        page: {} as Page,
        total_stocks: 0,
        total_available:  0,
        total_disable:  0,
        total_draft:  0,
        total_sales: 0
    }),
    actions: {
        getAll(filter = ""){
            this.page.query = filter
            return authApi.get(`/products` + filter).then(({data}) => {
                const {products, pageOptions, total_stocks, total_available, total_disabled, total_sales, total_draft} = data;
                this.products = products;
                this.page = pageOptions;
                this.total_available = total_available;
                this.total_stocks = total_stocks;
                this.total_disable = total_disabled;
                this.total_sales = total_sales
                this.total_draft = total_draft
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
                }).then((response) => {
                    this.products.unshift(response.data)
                    this.products.pop();

                    return response
                })
        },
        addSubImage(image: string, product_id: string){
            const formData = new FormData();
            formData.append('image', image)
            return authApi.post(`/product/${product_id}/sub-images`, formData, {
                headers: {
                    'Content-type' : 'multipart/form-data'
                }
            }).then(({data}) => {
                this.product.sub_images.push(data)
            });
        },
        remove(product_id: number){
            return authApi.delete('/products/' + product_id).then(() => {
                this.products = this.products.filter(item => item.id != product_id);
            });
        },
        removeSubImage(product_id: number, image_id: string){
            return authApi.delete('/product/' + product_id + '/sub-images/' + image_id).then((response) => {
                this.product.sub_images = this.product.sub_images.filter(item => item.id != parseInt(image_id))
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
                this.products = this.products.map(product => product.id == product_id ? {...product, name: data.name, price: data.price, stocks: data.stocks, category_id: data.category_id, status: data.status} : product)
            });
        },
        updateSubImage(product_id: number, image: SubImages){
            const formData = new FormData();
            //@ts-ignore
            formData.append('image', image.file);
            return authApi.post('/product/' + product_id + '/sub-images/' + image.id + '/update', formData, {headers: {'Content-type': 'multipart/form-data',}}).then((response) => {
                this.product.sub_images = this.product.sub_images.map(item => item.id == image.id ? {...item, location: response.data} : item)
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
                    product.image = data
                }
            }).catch((err) => {
                console.log(err);
            })
        },
    },
    getters: {
        getProductById: state => (id: number) => state.products.find(product => product.id == id),
        getTotalProduct: state => state.products.length,
    
    }
})

export default productStore;