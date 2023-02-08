<template>
  <v-container
    class="pt-15 d-flex flex-column h-100"
    style="margin-top: -50px; z-index: 1000"
  >
    <v-row>
      <v-col cols="10">
        <h1 class="mb-5 text-blue-grey-darken-4">Add Product</h1>
        <v-card class="pa-5 rounded-lg pb-10 border" flat>
          <h2 class="mb-5">Basic Information</h2>
          <v-row class="mt-3">
            <v-col cols="3">
              <label for="">Product Image</label>
            </v-col>
            <v-col>
              <div class="d-flex flex-wrap ml-n4">
                <v-col cols="12" class="mx-2">
                  <ImageCard v-model:image="product.image"></ImageCard>
                </v-col>
                <MultipleImageCard v-model:images="product.subImages"></MultipleImageCard>
                <ul class="ml-10 text-red">
                  <li v-for="error in $v.image.$errors">{{ error.$message }}</li>
                </ul>
              </div>
            </v-col>
          </v-row>
          <v-row>
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
          <v-row>
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
        </v-card>
        <v-card
          flat
          class="rounded-lg border my-5 pa-5 pb-10"
          :disabled="enableVariations"
        >
          <h2 class="mb-5">Sales Information</h2>
          <v-row>
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
          <v-row>
            <v-col cols="3">
              <label for="">Product stocks</label>
            </v-col>
            <v-col>
              <v-text-field
                @blur="$v.stocks.$touch()"
                :error-messages="showError($v.stocks)"
                type="number"
                v-model="product.stocks"
                label="Input"
                variant="outlined"
                density="compact"
                single-line
              ></v-text-field>
            </v-col>
          </v-row>
        </v-card>
        <v-card
          :variant="enableVariations ? 'elevated' : 'tonal'"
          flat
          class="rounded-lg border my-5 pa-5"
        >
          <div class="mb-5 d-flex align-center">
            <h2>Variation</h2>
            <v-spacer></v-spacer>
            <div>
              <v-switch
                v-model="enableVariations"
                hide-details
                color="amber-darken-4"
              ></v-switch>
            </div>
          </div>
          <v-row v-if="enableVariations">
            <v-col cols="3">
              <label for="">Product variation</label>
            </v-col>
            <v-col class="d-flex flex-column">
              <div>
                <v-btn
                  class=""
                  variant="outlined"
                  prepend-icon="mdi-plus"
                  color="amber-darken-4"
                  >Add variation</v-btn
                >
              </div>
              <!-- <v-card flat class="w-100 my-3 pa-5 rounded-lg bg-grey-lighten-4">
                <div>
                  <label for="">Variantion name</label>
                  <v-text-field
                    class="mr-2"
                    variant="outlined"
                    density="compact"
                    hide-details
                    label="price"
                  ></v-text-field>
                </div>
                <span class="mx-2"></span>
                <div>
                  <label for="">Variantion name</label>
                  <v-text-field
                    class="mr-2"
                    variant="outlined"
                    density="compact"
                    hide-details
                    label="stocks"
                  ></v-text-field>
                </div>
              </v-card> -->
            </v-col>
          </v-row>
          <v-card-actions v-if="enableVariations">
            <v-spacer></v-spacer>
            0/2
          </v-card-actions>
        </v-card>
        <v-card class="rounded-lg border my-5 pa-5 pb-10" flat>
          <h2 class="mb-5">Description</h2>
          <v-row>
            <v-col>
              <v-textarea
                v-model="product.name"
                label="Input"
                variant="outlined"
                density="compact"
                single-line
              ></v-textarea>
            </v-col>
          </v-row>
        </v-card>
        <v-spacer></v-spacer>

        <div id="actions-bar" class="w-100 d-flex justify-end pb-4 mt-5">
          <v-btn
            color="while"
            class="border mr-5"
            flat
            size="large"
            :to="{ name: 'Product' }"
            >Cancel</v-btn
          >
          <v-btn
            color="amber-darken-2"
            flat
            size="large"
            @click="create"
            :loading="isLoading"
            >Create</v-btn
          >
        </div>
      </v-col>
      <v-col></v-col>
    </v-row>
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
        Product is creating
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
const showAppBar: any = inject("showAppbar");
const enableVariations = ref(false);
const { $v, create, product, reset, isLoading, success, percent } = productCreate();
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
onBeforeRouteLeave((to, from, next) => {
  if ($v.value.$anyDirty && !success.value) {
    if (confirm("You have started creating product, do you want to discard it?")) {
      next();
    }
    return;
  }

  showAppBar.value = true;
  success.value = false;
  window.scrollTo(0, 0);
  next();
});
onMounted(() => {
  showAppBar.value = false;
  setFloatingBar();
});
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
