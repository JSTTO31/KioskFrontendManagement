import { storeToRefs } from "pinia";
import { reactive } from "vue"
import { useRoute, useRouter } from "vue-router";
import categoryStore from "../store/category";


export default () => {
    const {categories} = storeToRefs(categoryStore())
    const router = useRouter();
    const route = useRoute();
    const initialSearch = () => ({
        name: route.query.name || "",
        category:
            //@ts-ignore
            categories.value.find((item) => item.id == route.query.category)?.id,
        stocks: {
            min: route.query["stocks[min]"] || null,
            max: route.query["stocks[max]"] || null,
        },
        sales: {
          min: route.query["sales[min]"] || null,
          max: route.query["sales[max]"] || null,
      },
    });
    const search  = reactive(initialSearch());

    

    const submit = () => {
        const { name, category, stocks, sales } = search;
        delete route.query.page
        let query =  {
            ...route.query,
            name,
            category,
            "stocks[min]": stocks.min,
            "stocks[max]": stocks.max,
            "sales[min]": sales.min,
            "sales[max]": sales.max,
            
        };
        
        router.push({
          name: "Product",
            query
        });
      };

      const reset = () => {
        router.push({ query: {} }).then(() => {
          Object.assign(search, initialSearch());
        });
      };

    return {search, submit, reset};
}