import useVuelidate from "@vuelidate/core"
import { required, numeric, minValue } from "@vuelidate/validators"
import { storeToRefs } from "pinia"
import { reactive, computed, ref } from "vue"
import { useRouter } from "vue-router"
import categoryStore from "../store/category"
import productStore from "../store/Product"


export default () => {
    const { getFirstCategoryId } = storeToRefs(categoryStore())
    const $product = productStore();
    const product : {name: string, image:string, subImages: [], price: string, category_id: any, stocks: string} = reactive({
        name: 'example',
        image: '',
        subImages: [],
        price: '123',
        category_id: getFirstCategoryId.value,
        stocks: '123',
        variants: [],
    })
    const isLoading = ref(false);
    const success = ref(false);
    const currentLoaded = ref(0)
    const numberOfItem = ref(0)
    const percent = computed(() => currentLoaded.value/numberOfItem.value ? ((currentLoaded.value/numberOfItem.value) * 100).toFixed(0) : 0)
    const rules = {
        name: {required},
        image: {required},
        price: {required, numeric, minValue: minValue(1)},
        stocks: {required, numeric, minValue: minValue(1)}
    }

    const $v = useVuelidate(rules, product);

    const create = () => {
        if($v.value.$invalid){
            console.log('touch');
            
            $v.value.$touch()
            return
        }
        isLoading.value = true
        numberOfItem.value = product.subImages.length
        return $product.add(product).then((response) => {
            const container : any = []
            product.subImages.forEach((item) => {
                container.push($product.addSubImage(item, response.data.id).then(() => currentLoaded.value++))
            })
        
            return Promise.all(container).then(() => {
                reset()
                isLoading.value = false
                success.value =true
            });
        })
    }

    const reset = () => {
        product.name = ""
        product.price = "";
        product.image = "";
        product.subImages = []
        $v.value.$reset();
    }

    return {product, $v, reset, create, isLoading, success, percent}
}


