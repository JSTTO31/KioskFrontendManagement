import { computed, reactive } from "vue"
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

    const submit = () => {
        if($v.value.$invalid){
            $v.value.$touch();
            return 
        }
        return authApi.get('http://localhost:8000/sanctum/csrf-cookie').then(res => {
            const $user = userStore();
            return authApi.post('/login', {
                email: user.email,
                password: user.password
            }).then(({data}) => {
                $user.setUser(data);
                localStorage.setItem('userData', JSON.stringify(data));
            })
        })
    }

    return {user, $v, submit};
}