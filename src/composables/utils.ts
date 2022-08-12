import { useRouter } from "vue-router"

export function showError(validator: any){
    if(validator.$invalid && validator.$dirty){
        return validator.$errors[0].$message
    }

    return ""
}

