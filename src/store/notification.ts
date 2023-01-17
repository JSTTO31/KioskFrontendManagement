import { defineStore } from "pinia";
import { authApi } from "./user";


const notificationStore = defineStore("notification", {
    state: () => ({
        notifications: [],
    }),
    actions: {
        getAll(){
            return authApi.get("/notifications").then(({data}) => {
                this.notifications = data;
            })
        }
    }
})

export default notificationStore;