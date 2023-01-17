import useVuelidate from "@vuelidate/core"
import { required, numeric, minValue } from "@vuelidate/validators"
import { storeToRefs } from "pinia"
import { reactive, ref } from "vue"
import categoryStore from "../store/category"
import productStore from "../store/Product"


export default () => {
    const { categories } = storeToRefs(categoryStore())
    const $product = productStore();
    const product = reactive({
        name: '',
        image: '',
        price: '',
        category_id: categories.value[0].id,
        stocks: ''
    })
    const isLoading = ref(false);
    const url = ref("");
    const success = ref(false);
    const rules = {
        name: {required},
        image: {required},
        price: {required, numeric, minValue: minValue(1)},
        stocks: {required, numeric, minValue: minValue(1)}
    }

    const $v = useVuelidate(rules, product);

    const setImage = (e: any) => {
        const file = e.target.files[0];
        
        $v.value.image.$touch();
        if(file){
            product.image = file;
            const reader = new FileReader();
            reader.onload = () => {
                //@ts-ignore
                url.value = reader.result;
            }
            reader.readAsDataURL(file);

            return;
        }
        product.image = ""
        url.value = ""
    }

    const create = () => {
        isLoading.value = true
        return $product.add(product).then(() => {
            reset()
            isLoading.value = false
            success.value =true
        });
    }

    const reset = () => {
        product.name = ""
        product.price = "";
        product.image = "";
        url.value = ""
        $v.value.$reset();
    }

    return {product, $v, setImage, url, reset, create, isLoading, success}
}