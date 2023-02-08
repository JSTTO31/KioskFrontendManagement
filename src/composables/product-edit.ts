import { reactive, ref, Ref, toRaw } from "vue"
import productStore, { Product, SubImages } from "../store/Product"
import { minLength, required, numeric } from "@vuelidate/validators"
import useVuelidate from "@vuelidate/core"
import { onBeforeRouteLeave } from "vue-router"
import { storeToRefs } from "pinia"
import { authApi } from "../store/user"
import axios from "axios"

export default (product: Product) => {
    const $product = productStore()
    const edit :  {name: string, image: any, subImages: [], price: number, category_id: any, stocks: number, status: string} = reactive({
        'category_id' : product.category_id,
        'name' : product.name,
        'price' : product.price,
        'stocks' : product.stocks,
        'image' : '',
        'subImages' : [],
        'status' : product.status,
    })
    const editImages = ref([...product.sub_images]);
    const showAlert = ref(false )
    const isLoading = ref(false);
    const stringId = ref('')
    const toUpdate : Ref<SubImages[]> = ref([]);
    const removeImage = (index: number) => {
        if(stringId.value.length < 1){
            stringId.value = editImages.value[index].id.toString()
        }else{
            stringId.value += ',' + editImages.value[index].id.toString()
        }
        editImages.value.splice(index, 1)
    }

    const updateImage = (e: any, image: SubImages, index: number) => {
        if(e.type == 'image/png'){
            const reader = new FileReader();

            reader.onload = () => {
                //@ts-ignore
                image.location = reader.result
            }
            reader.readAsDataURL(e)
        }
        //@ts-ignore
        toUpdate.value.push({...image, file: e});
    }
    const rules = {
        'name' : {required, min: minLength(2)},
        'price' : {required, numeric},
        'stocks' :{required, numeric},
    }

    const update = () => {
        const container = []
        console.log(editImages.value);
        
        if($v.value.$invalid){
            $v.value.$touch();

            return;
        }
        isLoading.value = true
        //@ts-ignore
        if(edit.image instanceof File){
            container.push($product.updateImage(product.id, edit.image));
        }

        if(stringId.value.length > 0){
            container.push($product.removeSubImage(product.id, stringId.value))
        }

        toUpdate.value.forEach(item => container.push($product.updateSubImage(product.id, item)))
        //@ts-ignore
        edit.subImages.forEach(item => container.push($product.addSubImage(item, product.id)))

        //@ts-ignore
        container.push($product.update(product.id, edit));
        
        return Promise.all(container).then((data) => {
            isLoading.value = false 
            $v.value.$reset()
            showAlert.value = true;
            setTimeout(() => {
                showAlert.value = false
            }, 5000)
            
        }).catch(err => {
            console.log(err);
            
        })
    }

    const $v = useVuelidate(rules, edit);


    onBeforeRouteLeave((to, from, next) => {
        if($v.value.$anyDirty){
            if (window.confirm("Discard changes?")) {
                next();
            }
            return
        }
        next();
      });

    

    return {$v, edit, update, isLoading, showAlert, editImages, removeImage, updateImage}
}