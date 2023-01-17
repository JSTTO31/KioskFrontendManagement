import useVuelidate from "@vuelidate/core"
import { required } from "@vuelidate/validators"
import { reactive, ref } from "vue"
import categoryStore from "../store/category"


export default (externalCategory :any | null = "") => {
    const $category = categoryStore()
    const category = reactive({
        name: externalCategory.name,
        image: externalCategory
    })
    const url = ref("");

    const setImage = (e: any) => {
        const file = e.target.files[0];
        $v.value.image.$touch();
        if(file){
            const reader = new FileReader();
            category.image = file;
            reader.onload = () => {
                const result = reader.result
                //@ts-ignore
                url.value = result;
            }
            reader.readAsDataURL(file)
            return;
        }
        
        url.value = "";
    }

    const reset = () => {
        category.image = ""
        category.name = ""
        url.value = ""
        $v.value.$reset();
    }

    const create = () => {
        if($v.value.$invalid){
            $v.value.$touch();
            return
        }
        
        return $category.addCategory(category).then(() => {
            reset()
        })
    }

    const rules = {
        name: {required},
        image: {required}
    }

    const $v = useVuelidate(rules, category);

    return {category, setImage, url, $v, create,reset};
} 