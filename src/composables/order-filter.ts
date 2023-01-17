import { reactive, ref } from "vue"
import { useRoute, useRouter } from "vue-router";


export default () => {
    const router = useRouter();
    const route = useRoute()
    const showMenu = ref(false)
    const search = reactive({
        orderId: '',
        total: {
            min: '',
            max: ''
        },
        item: {
            min: '',
            max: ''
        },
    })

    const submit = () => {
        const { orderId, total, item} = search
        return router.push({query: {...route.query, orderId, "total[min]": total.min, "total[max]": total.max, "item[min]": item.min, "item[max]": item.max}}).then(() => {
            showMenu.value = false
        })
    }

    const reset = () => {
        const query : any = {}
        if(route.query.status) {
            query.status = route.query.status || ''
        }
        if(route.query.orderBy) {
            query.orderBy = route.query.orderBy
        }
        if(route.query.order){
            query.order = route.query.order
        }
        
        return router.push({query}).then(() => {
            showMenu.value = false
        })
    }

    return { search, submit, reset, showMenu }
}