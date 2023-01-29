<template>
  <v-container
    class="pt-15 d-flex flex-column h-100"
    style="padding-right: 250px; margin-top: -120px"
    v-if="product"
  >
    <h1>Product Information</h1>
    <v-row class="px-10 py-5">
      <v-col cols="3">
        <label for="">Product Image</label>
      </v-col>
      <v-col class="d-flex">
        <v-card
          v-if="!edit.image"
          @click="showDialog"
          id="image-container"
          height="150"
          width="150"
          class="d-flex align-center justify-center bg-transparent"
          flat
        >
          <v-icon color="amber-darken-4" size="45" dense>mdi-plus-circle-outline</v-icon>
        </v-card>
        <v-card
          v-else
          height="150"
          width="150"
          class="border bg-transparent d-flex align-center justify-center"
          flat
          @click="showDialog"
        >
          <v-img :src="edit.image"></v-img>
        </v-card>
      </v-col>
    </v-row>
    <v-row class="px-10 py-5">
      <v-col cols="3">
        <label for="">Product category</label>
      </v-col>
      <v-col>
        <v-select
          v-model="edit.category_id"
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
          v-model="edit.name"
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
          v-model="edit.price"
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
          type="number"
          v-model="edit.stocks"
          label="Input"
          variant="outlined"
          density="compact"
          single-line
        ></v-text-field>
      </v-col>
    </v-row>
    <v-row class="px-10 d-flex py-5">
      <v-col cols="3">
        <label for="">Product Status</label>
      </v-col>
      <v-col>
        <v-radio-group v-model="edit.status">
          <v-radio color="success" value="available" label="available"></v-radio>
          <v-radio color="error" value="disable" label="disable"></v-radio>
        </v-radio-group>
      </v-col>
    </v-row>
    <v-row class="px-10">
      <v-alert
        density="comfortable"
        type="success"
        variant="tonal"
        :model-value="showAlert"
      >
        Update Successfully. You have successfully updated
        <strong>{{ product.name }}</strong>
      </v-alert>
    </v-row>
    <div id="actions">
      <v-btn color="while" class="border mr-5" flat size="large" :to="{ name: 'Product' }"
        >Cancel</v-btn
      >
      <v-btn
        color="amber-darken-2"
        flat
        size="large"
        @click="update()"
        :loading="isLoading"
        >Update</v-btn
      >
    </div>
    <div style="height: 0px; overflow: hidden">
      <v-file-input accept=".png" @change="setImage" ref="file"></v-file-input>
    </div>
  </v-container>
</template>

<script setup lang="ts">
import { showError } from "../../../composables/utils";
import { storeToRefs } from "pinia";
import { onBeforeRouteLeave, useRouter } from "vue-router";
import { ref, onMounted, inject } from "vue";
import productStore, { Product } from "../../../store/Product";
import categoryStore from "../../../store/category";
import productEdit from "../../../composables/product-edit";
const { product } = storeToRefs(productStore());
const { categories } = storeToRefs(categoryStore());
const file = ref();
const router = useRouter();
const { edit, $v, setImage, update, isLoading, showAlert } = productEdit(product.value);
const showDialog = () => {
  file.value.click();
};
const showAppBar: any = inject("showAppBar");
onMounted(() => {
  showAppBar.value = false;
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
