<template>
  <v-container
    class="pt-15 d-flex flex-column h-100"
    style="padding-right: 250px; margin-top: -120px"
  >
    <h1>Product Information</h1>
    <v-row class="py-5 mt-3">
      <v-col cols="3">
        <label for="">Product Image</label>
      </v-col>
      <v-col>
        <div class="d-flex">
          <ImageCard v-model:image="product.image"></ImageCard>
          <ul class="ml-10 text-red">
            <li v-for="error in $v.image.$errors">{{ error.$message }}</li>
          </ul>
        </div>
      </v-col>
    </v-row>
    <v-row class="py-5">
      <v-col cols="3">
        <label for="">Sub Images</label>
      </v-col>
      <v-col>
        <div class="d-flex">
          <MultipleImageCard v-model:images="product.subImages"></MultipleImageCard>
        </div>
      </v-col>
    </v-row>
    <v-row class="py-5">
      <v-col cols="3">
        <label for="">Product category</label>
      </v-col>
      <v-col>
        <v-select
          v-model="product.category_id"
          :items="categories"
          item-title="name"
          item-value="id"
          label="Select"
          variant="outlined"
          density="compact"
          single-line
        ></v-select>
      </v-col>
    </v-row>
    <v-row class="py-5">
      <v-col cols="3">
        <label for="">Product name</label>
      </v-col>
      <v-col>
        <v-text-field
          @blur="$v.name.$touch()"
          :error-messages="showError($v.name)"
          v-model="product.name"
          label="Input"
          variant="outlined"
          density="compact"
          single-line
        ></v-text-field>
      </v-col>
    </v-row>
    <v-row class="py-5">
      <v-col cols="3">
        <label for="">Product price</label>
      </v-col>
      <v-col>
        <v-text-field
          @blur="$v.price.$touch()"
          :error-messages="showError($v.price)"
          type="number"
          v-model="product.price"
          prepend-icon=""
          label="Input"
          variant="outlined"
          density="compact"
          single-line
        >
          <template #prepend-inner>
            <span>&#x20B1;</span>
          </template>
        </v-text-field>
      </v-col>
    </v-row>
    <v-row class="py-5">
      <v-col cols="3">
        <label for="">Product stocks</label>
      </v-col>
      <v-col>
        <v-text-field
          @blur="$v.stocks.$touch()"
          :error-messages="showError($v.stocks)"
          v-model="product.stocks"
          type="number"
          label="Input"
          variant="outlined"
          density="compact"
          single-line
        ></v-text-field>
      </v-col>
    </v-row>
    <v-spacer></v-spacer>

    <div id="actions-bar" class="w-100 d-flex justify-end pb-4">
      <v-btn color="while" class="border mr-5" flat size="large" :to="{ name: 'Product' }"
        >Cancel</v-btn
      >
      <v-btn color="amber-darken-2" flat size="large" @click="create" :loading="isLoading"
        >Create</v-btn
      >
    </div>
  </v-container>
  <v-card
    id="floating-actions-bar"
    class="d-flex border align-center py-2 justify-end mb-5"
    flat
  >
    <v-btn color="while" class="border mr-5" flat size="large" :to="{ name: 'Product' }"
      >Cancel</v-btn
    >
    <v-btn color="amber-darken-2" flat size="large" @click="create" :loading="isLoading"
      >Create</v-btn
    >
  </v-card>
  <v-dialog :model-value="isLoading" class="rounded bg-transparent" persistent>
    <v-card width="500" class="py-5 pt-10 pb-10 px-10 pb-5 rounded-xl" flat>
      <v-progress-circular
        color="amber-darken-2"
        size="110"
        width="10"
        class="my-5 mx-auto"
        :model-value="percent"
      ></v-progress-circular>
      <h1 class="font-weight-medium text-grey-darken-3 text-center mt-3">
        Product Creating
      </h1>
      <h3 class="text-grey-darken-1 text-center font-weight-regular">
        Please wait, this action take a few seconds.
      </h3>
    </v-card>
  </v-dialog>
  <v-dialog
    :model-value="success"
    @click:outside="router.push({ name: 'Product.index' })"
    class="rounded bg-transparent"
    persistent
  >
    <v-card width="500" class="py-5 pt-10 px-10 pb-5 rounded-xl" flat>
      <v-icon size="110" color="amber-darken-3" class="mx-auto">
        mdi-check-circle
      </v-icon>
      <h1 class="font-weight-medium text-grey-darken-3 text-center mt-3">Successful</h1>
      <h3 class="text-grey-darken-1 text-center font-weight-regular">
        The product is successfully created!
      </h3>
      <v-divider class="my-5"></v-divider>
      <v-btn
        block
        flat
        class="rounded-xl"
        color="amber-darken-3"
        :to="{ name: 'Product.index' }"
        >Ok</v-btn
      >
      <span id="close">
        <v-btn variant="text" icon="mdi-close" :to="{ name: 'Product.index' }"></v-btn>
      </span>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import MultipleImageCard from "../../../components/SubImagesCard.vue";
import { showError } from "../../../composables/utils";
import { storeToRefs } from "pinia";
import { onBeforeRouteLeave, useRoute, useRouter } from "vue-router";
import { ref, onMounted, inject, watch } from "vue";
import ImageCard from "../../../components/ImageCard.vue";
import categoryStore from "../../../store/category";
import productCreate from "../../../composables/product-create";
import productStore from "../../../store/Product";
const $product = productStore();
const { categories } = storeToRefs(categoryStore());
const router = useRouter();
const showAppBar: any = inject("showAppBar");
const { $v, create, product, reset, isLoading, success, percent } = productCreate();
const submit = () => {
  create()?.then(() => {
    reset();
  });
};
const setFloatingBar = () => {
  const actionsbar = document.getElementById("actions-bar");
  const floatingbar = document.getElementById("floating-actions-bar");
  if (actionsbar) {
    const getBoundingRectActionBar = actionsbar?.getBoundingClientRect();
    if (floatingbar) {
      const getBoundingRectActionBarFloating = floatingbar.getBoundingClientRect();
      floatingbar.style.position = "fixed";
      floatingbar.style.left = getBoundingRectActionBar.left + "px";
      floatingbar.style.bottom = 0 + "px";
      floatingbar.style.width = getBoundingRectActionBar.width + "px";
      floatingbar.style.transition = "transform .2s linear";
      if (getBoundingRectActionBarFloating.bottom >= getBoundingRectActionBar.top) {
        floatingbar.style.transform = "translateY(200%)";
      } else {
        floatingbar.style.transform = "translateY(0%)";
      }
    }
  }
};
const mainScroll: any = inject("main-scroll");
onBeforeRouteLeave((to, from, next) => {
  if ($v.value.$anyDirty && !success.value) {
    if (confirm("You have started creating product, do you want to discard it?")) {
      next();
    }
    return;
  }
  showAppBar.value = true;
  next();
});
onMounted(() => {
  showAppBar.value = false;
  setFloatingBar();
});

watch(
  () => mainScroll.value,
  () => {
    setFloatingBar();
  }
);
</script>

<style scoped>
#close {
  position: absolute;
  top: 0;
  right: 0;
  padding: 5px;
}
#actions {
  position: absolute;
  bottom: 15px;
  right: 15px;
}
</style>
