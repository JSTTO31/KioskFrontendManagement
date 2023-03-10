<template>
  <!-- <CategoryContainerVue></CategoryContainerVue> -->
  <!-- <ProductFilterVue></ProductFilterVue> -->
  <v-row>
    <v-col cols="9">
      <ProductTitleBoxVue v-model:mode="mode"></ProductTitleBoxVue>
      <div class="rounded-lg">
        <ProductTableHeadVue :mode="mode"></ProductTableHeadVue>
        <v-row>
          <teleport to="#app-bar">
            <div class="w-100 d-flex align-center">
              <h1 class="text-h3 px-8 roboto font-weight-bold text-blue-grey-darken-4">
                Products
              </h1>
            </div>
          </teleport>
          <v-col
            :cols="mode == 'list' ? '12' : '4'"
            class="pa-0 px-3 ma-0"
            v-for="product in products.slice(0, 9)"
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
      </div>
    </v-col>
    <v-col cols="3">
      <v-card class="py-10 mt-5 rounded-lg">
        <div class="d-flex flex-column align-center">
          <span class="font-weight-regular text-h6 text-grey-darken-1"
            >Remaining stocks</span
          >
          <span class="text-h2">{{ total_stocks }}</span>
        </div>
        <v-divider class="my-10 mx-4"></v-divider>
        <div class="w-100 d-flex">
          <v-progress-circular
            rotate="360"
            size="250"
            width="25"
            color="amber-darken-4"
            class="mx-auto"
            :model-value="100 - (total_stocks / (total_stocks + total_sales)) * 100"
          >
            <div class="d-flex flex-column align-center">
              <h1 class="text-h3">
                {{
                  (100 - (total_stocks / (total_stocks + total_sales)) * 100).toFixed(2)
                }}
                %
              </h1>
              <!-- <span class="text-h2">{{ total_stocks }}</span>
              <span class="font-weight-medium">Remaining stocks</span> -->
            </div>
          </v-progress-circular>
        </div>
      </v-card>
      <v-card class="rounded-lg border d-flex align-start mt-2">
        <template #prepend>
          <v-card color="success" variant="tonal" class="rounded-lg pa-4">
            <v-icon class="rounded-0" size="25"> mdi-circle </v-icon>
          </v-card>
        </template>
        <template #title><h5 class="font-weight-medium">Available</h5></template>
        <template #subtitle
          ><h3 class="text-h4 font-weight-black">{{ total_available }}</h3></template
        >
      </v-card>
      <v-card class="rounded-lg borderd-flex align-start mt-2">
        <template #prepend>
          <v-card color="grey" variant="tonal" class="rounded-lg pa-4">
            <v-icon class="rounded-0" size="25"> mdi-circle </v-icon>
          </v-card>
        </template>
        <template #title><h5 class="font-weight-medium">Disabled</h5></template>
        <template #subtitle
          ><h3 class="text-h4 font-weight-black">{{ total_disable }}</h3></template
        >
      </v-card>
      <v-card class="rounded-lg d border-flex align-start mt-2">
        <template #prepend>
          <v-card color="warning" variant="tonal" class="rounded-lg pa-4">
            <v-icon class="rounded-0" size="25"> mdi-circle </v-icon>
          </v-card>
        </template>
        <template #title><h5 class="font-weight-medium">Draft</h5></template>
        <template #subtitle
          ><h3 class="text-h4 font-weight-black">{{ total_draft }}</h3></template
        >
      </v-card>
    </v-col>
  </v-row>
</template>

<script setup lang="ts">
import OrderView from "../../../components/OrderView.vue";
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
const {
  products,
  page,
  total_stocks,
  total_sales,
  total_available,
  total_disable,
  total_draft,
} = storeToRefs($product);
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
