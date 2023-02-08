import { useRouter } from "vue-router"

export function showError(validator: any){
    if(validator.$invalid && validator.$dirty){
        return validator.$errors[0].$message
    }

    return ""
}

export const navItems = [
    {
      name: "Dashboard",
      icon: "mdi-view-dashboard-outline",
      routeName: "Dashboard",
    },
    {
      name: "Orders",
      icon: "mdi-list-status",
      routeName: "Order",
    },
    {
      name: "Products",
      icon: "mdi-food-drumstick-outline",
      routeName: "Product.index",
    },
  ];

