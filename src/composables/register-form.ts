import { computed, reactive } from "vue"
import {required, sameAs, email, minValue, minLength} from '@vuelidate/validators'
import useVuelidate from "@vuelidate/core"
import userStore, { authApi } from "../store/user"


export default () => {
    const user = reactive({
        name: '',
        email: '',
        password: '',
        confirmation_password: '',
    })

    const rules = {
        name: {required},
        email: {required, email},
        password: {required, min: minLength(8)},
        confirmation_password: {required, same: sameAs(computed(() => user.password), "Password")},
    }

    const $v = useVuelidate(rules, user);

    const submit = () => {
        if($v.value.$invalid){
            $v.value.$touch()

            return
        }
        return authApi.get('http://192.168.254.133:8000/sanctum/csrf-cookie').then(() => {
            return authApi.post('/register', {
                name: user.name,
                email: user.email,
                password: user.password,
                confirmation_password: user.confirmation_password
            }).then(({data}) => {
                const $user = userStore();
                $user.setUser(data);
                localStorage.setItem('userData', JSON.stringify(data));
            })
        })
    }   

    return {user, $v, submit};
}