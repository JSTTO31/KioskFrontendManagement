import { defineStore } from "pinia";
import axios from 'axios'
export const authApi = axios.create({
    baseURL: 'http://192.168.254.133:8000/api',
    withCredentials: true,
    headers: {
        Accept: 'application/json',
        'Content-type': 'application/json',
    }
})

export interface User{
    id: string;
    name: string;
    email: string;
    created_at: string;
    updated_at: string;
}

export interface UserState{
    user: User
}

const userStore = defineStore('user', {
    state: () : UserState => ({
        user: {} as User
    }),
    actions: {
        setUser(data: {user:User, token: string}){
            this.user = data.user,
            authApi.defaults.headers.common['Authorization'] = `Bearer ${data.token}`;
        },
        logout(){
            return authApi.post('/logout').then(() => {
                localStorage.clear();
                location.reload();
            })
        }
    },
    getters:{
        isLogin: state => Object.keys(state.user).length > 0,
    }
})


export default userStore;