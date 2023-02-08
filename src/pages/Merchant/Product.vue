<template>
  <v-container class="pt-5 px-15 h-100">
    <router-view v-slot="{ Component }">
      <component :is="Component"></component>
    </router-view>
  </v-container>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import productStore from "../../store/Product";
import { onBeforeRouteUpdate, onBeforeRouteLeave } from "vue-router";
const $product = productStore();
const fixed = ref(true);
onMounted(() => {
  const main = document.getElementById("product-main");
  //@ts-ignore
  const scrollHeight = main?.scrollHeight - main?.clientHeight;
  main?.addEventListener("scroll", () => {
    fixed.value = scrollHeight - 118 <= main.scrollTop ? false : true;
  });
});
onBeforeRouteUpdate((to, from) => {
  if (
    from.name == "Product" &&
    !(to.name == "Product.create") &&
    !(to.name == "Product.show")
  ) {
    const query = to.fullPath.match(/\?.*/gi)?.join("");
    $product.getAll(query);
  }
});
</script>

<style scoped>
#children-container::-webkit-scrollbar {
  width: 4px;
}
#children-container::-webkit-scrollbar-thumb {
  background-color: #ff6f00;
}
#product-main::-webkit-scrollbar {
  width: 5px;
}
#product-main::-webkit-scrollbar-thumb {
  height: 8px;
  background-color: #ff6f00;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s, transform 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateX(-5%);
}
</style>
