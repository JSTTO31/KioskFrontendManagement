<template>
  <v-card
    class="w-100 pa-5 rounded-lg"
    style="overflow-y: scroll"
    id="product-container"
    color="white"
    flat
    height="650"
  >
    <div class="d-flex align-center justify-space-between">
      <h2 class="text-black font-weight-medium">Most Products</h2>
      <v-btn
        size="small"
        variant="text"
        class="font-weight-regular"
        :to="{ name: 'Product' }"
        >View All</v-btn
      >
    </div>
    <v-card
      v-for="product in products"
      class="rounded-lg px-3 d-flex align-center bg-transparent my-1"
      flat
      @click="
        router.push({
          name: 'Product.show',
          params: { product_id: product.id, category_id: product.category_id },
        })
      "
    >
      <v-avatar class="rounded-0" size="85">
        <v-img :src="product.image"></v-img>
      </v-avatar>
      <div class="mx-2 w-100">
        <h3 class="font-weight-black">
          {{ product.name }}
        </h3>
        <h5 class="font-weight-medium text-grey-darken-1">
          {{ categories.find((item) => item.id == product.category_id)?.name }}
        </h5>
      </div>
      <h3>&#8369;{{ (product.order_items_sum_quantity * product.price).toFixed(2) }}</h3>
    </v-card>
    <v-spacer></v-spacer>
    <v-btn
      v-if="products.length > 0"
      flat
      block
      class="text-white"
      color="#B20600"
      :to="{ name: 'Product' }"
      >See more</v-btn
    >
  </v-card>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { storeToRefs } from "pinia";
import { useRouter } from "vue-router";
import categoryStore from "../store/category";
import { Product } from "../store/Product";
const { categories } = storeToRefs(categoryStore());
const props = defineProps<{ products: Product[] }>();
const router = useRouter();
</script>

<style scoped>
.see-more:active {
  transform: scale(0.9);
}
#product-container {
  overflow-y: scroll;
}
#product-container::-webkit-scrollbar {
  width: 0;
}
#product-container::-webkit-scrollbar-thumb {
  height: 8px;
  background-color: #ff6f00;
  border-radius: 5px;
}
</style>
