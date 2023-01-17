<template>
  <v-container fluid class="h-100">
    <v-card-title>Product Information</v-card-title>
    <v-row class="px-10 py-5">
      <v-col cols="3">
        <label for="">Product Image</label>
      </v-col>
      <v-col>
        <div class="d-flex">
          <v-card
            v-if="!url.length"
            @click="showDialog"
            id="image-container"
            height="150"
            width="150"
            class="d-flex align-center justify-center bg-transparent"
            flat
          >
            <v-icon color="amber-darken-4" size="45" dense
              >mdi-plus-circle-outline</v-icon
            >
          </v-card>
          <v-card
            v-else
            height="150"
            width="150"
            class="border bg-transparent d-flex align-center justify-center"
            flat
            @click="showDialog"
          >
            <v-img :src="url"></v-img>
          </v-card>
          <ul class="ml-10 text-red">
            <li v-for="error in $v.image.$errors">{{ error.$message }}</li>
          </ul>
        </div>
      </v-col>
    </v-row>
    <v-row class="px-10 py-5">
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
    <v-row class="px-10 py-5">
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
    <v-row class="px-10 py-5">
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
    <v-row class="px-10 py-5">
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

    <div id="actions">
      <v-btn color="while" class="border mr-5" flat size="large" :to="{ name: 'Product' }"
        >Cancel</v-btn
      >
      <v-btn color="amber-darken-2" flat size="large" @click="submit" :loading="isLoading"
        >Create</v-btn
      >
    </div>
    <div style="height: 0px; overflow: hidden">
      <v-file-input @change="setImage" ref="file" accept=".png"></v-file-input>
    </div>

    <span id="exit-button">
      <v-btn icon="mdi-close" @click="router.push({ name: 'Product' })"></v-btn>
    </span>
  </v-container>
</template>

<script setup lang="ts">
import { showError } from "../../../composables/utils";
import { storeToRefs } from "pinia";
import { onBeforeRouteLeave, useRouter } from "vue-router";
import { ref } from "vue";
import categoryStore from "../../../store/category";
import productCreate from "../../../composables/product-create";
import productStore from "../../../store/Product";
const $product = productStore();
const { categories } = storeToRefs(categoryStore());
const file = ref();
const router = useRouter();
const showDialog = () => {
  file.value.click();
};
const { $v, create, product, setImage, url, isLoading, success } = productCreate();
const submit = () => {
  if ($v.value.$invalid) {
    $v.value.$touch();
    return;
  }
  create().then(() => {
    $v.value.$reset();
    $product.getAll().then(() => {
      router.push({ name: "Product" });
    });
  });
};
onBeforeRouteLeave((to, from, next) => {
  if ($v.value.$anyDirty && !success.value) {
    if (confirm("You have started creating product, do you want to discard it?")) {
      next();
    }
    return;
  }
  next();
});
</script>

<style scoped>
#exit-button {
  position: absolute;
  top: 15px;
  right: 15px;
}
#image-container {
  border: 2px dashed #ff6f00;
}
#actions {
  position: absolute;
  bottom: 15px;
  right: 15px;
}
</style>
