import { computed, reactive, ref } from "vue"
import {required, sameAs, email, minValue, minLength} from '@vuelidate/validators'
import useVuelidate from "@vuelidate/core"
import userStore, { authApi } from "../store/user"
import { useRouter } from "vue-router"


export default () => {
    const user = reactive({
        email: '',
        password: '',
    })

    const rules = {
        email: {required},
        password: {required},
    }

    const $v = useVuelidate(rules, user);

    const loading = ref(false)

    const submit = () => {
        if($v.value.$invalid){
            $v.value.$touch();
            return 
        }
        loading.value = true
        return authApi.get('http://192.168.254.133:8000/sanctum/csrf-cookie').then(res => {
            const $user = userStore();
            const router = useRouter()
            return authApi.post('/login', {
                email: user.email,
                password: user.password
            }).then(({data}) => {
                $user.setUser(data);
                localStorage.setItem('userData', JSON.stringify(data));
                location.reload()
                loading.value= false
            })
        })
    }

    return {user, $v, submit, loading}
}