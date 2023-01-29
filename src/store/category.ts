import { defineStore } from "pinia";
import { authApi } from "./user";

export interface Category{
    id: number
    name: string;
    image: string;
    created_at: string;
    updated_at: string;
}

interface CategoryState{
    categories: Category[],
    stockCreateProgress: number;
}


const categoryStore = defineStore('category', {
    state: () : CategoryState => ({
        categories: [],
        stockCreateProgress: -1,
    }),
    actions: {
        getAll(){
            return authApi.get('/categories').then((response) => {
                this.categories = response.data;
                
                return response
            });
        },
        addCategory(category: any){
            const formData = new FormData();
            formData.append('image', category.image);
            formData.append('name', category.name);
            
            return authApi.post('/categories', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }).then(res => {
                this.categories.push(res.data);
            });
        },
        removeCategory(category: Category){
            return authApi.delete('/categories/' + category.id).then(res => {
                this.categories = this.categories.filter(item => item.id != category.id);
            })
        }
        
    },
    getters: {
       getFirstCategoryId: state =>  state.categories[0].id
    }
})


export default categoryStore;