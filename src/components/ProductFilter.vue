<template>
  <v-card class="rounded-lg pa-5 px-10 border" flat>
    <div class="w-100 d-flex">
      <div class="w-50 d-flex align-center">
        <h3 class="font-weight-regular w-25">Product name</h3>
        <v-text-field
          v-model="search.name"
          variant="outlined"
          density="compact"
          hide-details
          single-line
          label="Input product name"
          class="rounded-lg px-2"
        ></v-text-field>
      </div>
      <span class="mx-5"></span>
      <div class="w-50 d-flex align-center">
        <h3 class="font-weight-regular w-25">Category</h3>
        <v-select
          v-model="search.category"
          :items="categories"
          item-value="id"
          item-title="name"
          class="px-2"
          density="compact"
          hide-details
          variant="outlined"
          label="Select"
        ></v-select>
      </div>
    </div>
    <div class="w-100 d-flex mt-5">
      <div class="w-50 d-flex align-center">
        <h3 class="font-weight-regular w-25 mr-5">Stock</h3>
        <v-text-field
          v-model="search.stocks.min"
          variant="outlined"
          density="compact"
          hide-details
          type="number"
          single-line
          label="Min"
          class="rounded-lg px-2"
        ></v-text-field>
        &minus;
        <v-text-field
          v-model="search.stocks.max"
          variant="outlined"
          density="compact"
          hide-details
          type="number"
          single-line
          label="Max"
          class="rounded-lg px-2"
        ></v-text-field>
      </div>
      <span class="mx-5"></span>
      <div class="w-50 d-flex align-center">
        <h3 class="font-weight-regular w-25 mr-5">Sales</h3>
        <v-text-field
          v-model="search.sales.min"
          variant="outlined"
          density="compact"
          hide-details
          type="number"
          single-line
          label="Min"
          class="rounded-lg px-2"
        ></v-text-field>
        &minus;
        <v-text-field
          v-model="search.sales.max"
          variant="outlined"
          density="compact"
          hide-details
          type="number"
          single-line
          label="Max"
          class="rounded-lg px-2"
        ></v-text-field>
      </div>
    </div>
    <div class="mt-5">
      <v-btn color="amber-darken-1" flat class="my-2 mr-2" @click="submit">Search</v-btn>
      <v-btn color="" flat class="my-2 border" @click="reset">Reset</v-btn>
    </div>
  </v-card>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import productFilter from "../composables/product-filter";
import categoryStore from "../store/category";
const { categories } = storeToRefs(categoryStore());
const { search, submit, reset } = productFilter();
</script>

<style scoped></style>
