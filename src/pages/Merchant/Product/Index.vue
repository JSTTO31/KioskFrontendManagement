<template>
  <teleport v-if="showTitle" to="#title">
    Products <v-chip size="large">{{ page.total }}</v-chip>
  </teleport>
  <!-- <CategoryContainerVue></CategoryContainerVue> -->
  <v-container style="padding: 20px 55px" fluid>
    <ProductFilterVue></ProductFilterVue>
    <ProductTitleBoxVue v-model:mode="mode"></ProductTitleBoxVue>
    <ProductTableHeadVue :mode="mode"></ProductTableHeadVue>
    <v-row>
      <v-col
        :cols="mode == 'list' ? '12' : '3'"
        class="pa-0 px-3 ma-0"
        v-for="product in products"
      >
        <ProductCardVue
          :mode="mode"
          :key="product.id"
          v-model:selected="selected"
          :product="product"
        ></ProductCardVue>
      </v-col>
    </v-row>
    <EmptyData v-if="products.length < 1"></EmptyData>
    <ProductFooterBoxVue
      v-if="page.last_page > 0"
      :fixed="fixed"
      v-model:selected="selected"
    ></ProductFooterBoxVue>
    <v-overlay
      :model-value="loading"
      class="d-flex justify-center align-center"
      contained
    >
      <div class="lds-ellipsis">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </v-overlay>
  </v-container>

  <v-overlay
    :model-value="route.name == 'Product.show' || route.name == 'Product.create'"
    class="align-center justify-center"
    @click:outside="router.push({ name: 'Product' })"
    style="overflow-y: scroll"
  >
    <v-card
      id="children-container"
      width="1250"
      height="900"
      class="bg-grey-lighten-4 rounded-lg"
      style="overflow-y: scroll"
    >
      <router-view></router-view>
    </v-card>
  </v-overlay>
</template>

<script setup lang="ts">
import ProductTableHeadVue from "../../../components/ProductTableHead.vue";
import EmptyData from "../../../components/EmptyData.vue";
import ProductFooterBoxVue from "../../../components/ProductFooterBox.vue";
import ProductTitleBoxVue from "../../../components/ProductTitleBox.vue";
import ProductFilterVue from "../../../components/ProductFilter.vue";
import { storeToRefs } from "pinia";
import { ref, watch, onMounted } from "vue";
import productStore from "../../../store/Product";
import ProductCardVue from "../../../components/ProductCard.vue";
import { onBeforeRouteUpdate, useRoute, useRouter, onBeforeRouteLeave } from "vue-router";
const route = useRoute();
const router = useRouter();
const $product = productStore();
const { products, page } = storeToRefs($product);
const fixed = ref(true);
const selected = ref(new Set());
const loading = ref(false);
const mode = ref(localStorage.getItem("mode") || "list");
const showTitle = ref(false);
onMounted(() => {
  const main = document.getElementById("product-main");
  showTitle.value = true;
  //@ts-ignore
  const scrollHeight = main?.scrollHeight - main?.clientHeight;
  main?.addEventListener("scroll", () => {
    fixed.value = scrollHeight - 118 <= main.scrollTop ? false : true;
  });
});
onBeforeRouteLeave(() => {
  const title = document.getElementById("title");
  //@ts-ignore
  title.innerHTML = "";
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

watch(
  () => mode.value,
  (current) => {
    localStorage.setItem("mode", current);
  }
);
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
.footer-actions {
  position: fixed;
  width: 73.2% !important;
  bottom: 15px;
}
.lds-ellipsis {
  display: inline-block;
  position: relative;
  width: 80px;
  height: 80px;
}
.lds-ellipsis div {
  position: absolute;
  top: 33px;
  width: 13px;
  height: 13px;
  border-radius: 50%;
  background: white;
  animation-timing-function: cubic-bezier(0, 1, 1, 0);
}
.lds-ellipsis div:nth-child(1) {
  left: 8px;
  animation: lds-ellipsis1 0.6s infinite;
}
.lds-ellipsis div:nth-child(2) {
  left: 8px;
  animation: lds-ellipsis2 0.6s infinite;
}
.lds-ellipsis div:nth-child(3) {
  left: 32px;
  animation: lds-ellipsis2 0.6s infinite;
}
.lds-ellipsis div:nth-child(4) {
  left: 56px;
  animation: lds-ellipsis3 0.6s infinite;
}
@keyframes lds-ellipsis1 {
  0% {
    transform: scale(0);
  }
  100% {
    transform: scale(1);
  }
}
@keyframes lds-ellipsis3 {
  0% {
    transform: scale(1);
  }
  100% {
    transform: scale(0);
  }
}
@keyframes lds-ellipsis2 {
  0% {
    transform: translate(0, 0);
  }
  100% {
    transform: translate(24px, 0);
  }
}
</style>
