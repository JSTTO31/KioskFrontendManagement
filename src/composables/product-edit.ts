import { reactive, ref } from "vue"
import productStore, { Product } from "../store/Product"
import { minLength, required, numeric } from "@vuelidate/validators"
import useVuelidate from "@vuelidate/core"
import { onBeforeRouteLeave } from "vue-router"

export default (product: Product) => {
    const $product = productStore()
    const edit :  {name: string, image:string, subImages: [], price: string, category_id: any, stocks: string, status: string} = reactive({
        'category_id' : product.category_id,
        'name' : product.name,
        'price' : product.price,
        'stocks' : product.stocks,
        'image' : product.image,
        'file': '',
        'status' : product.status
    })
    const showAlert = ref(false)
    const isLoading = ref(false);


    const rules = {
        'category_id' : {required},
        'name' : {required, min: minLength(2)},
        'price' : {required, numeric},
        'stocks' :{required, numeric},
        'file' : {},
    }

    const setImage = (e: any) => {
        const file = e.target.files[0];
        
        if(file){
            edit.file = file;
            const reader = new FileReader();
            reader.onload = () => {
                //@ts-ignore
                edit.image = reader.result;
            }
            reader.readAsDataURL(file);

            return;
        }
        edit.image = product.image
    }

    const update = () => {
        const container : any = []
        isLoading.value = true
        if(edit.file){
            container.push($product.updateImage(product.id, edit.file));
        }

        if(!$v.value.$invalid){
            //@ts-ignore
            
            container.push($product.update(product.id, edit));
        }
        
        if($v.value.$invalid){
            $v.value.$touch();
        }
        
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

    return {$v, edit, setImage, update, isLoading, showAlert}
}