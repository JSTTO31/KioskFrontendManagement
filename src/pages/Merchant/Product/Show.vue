<template>
  <v-container
    class="pt-15 d-flex flex-column h-100"
    style="padding-right: 250px; margin-top: -50px"
    v-if="product"
  >
    <h1 class="mb-5">Product Information</h1>
    <v-card class="pa-5 rounded-lg pb-10 border" flat>
      <h2 class="mb-5">Basic Information</h2>
      <v-row>
        <v-col cols="3">
          <label for="">Product Image</label>
        </v-col>
        <v-col class="d-flex flex-wrap ml-n5">
          <v-col cols="2" class="mx-2">
            <ImageCard
              :persistent="true"
              v-model:image="edit.image"
              :url="product.image"
            ></ImageCard>
          </v-col>
          <v-col cols="2" class="mx-2" v-for="(image, index) in editImages">
            <SubImagesItem
              :key="image.id"
              @remove="removeImage(index)"
              @update="($event) => updateImage($event, image, index)"
              :image="image.location"
            ></SubImagesItem>
          </v-col>
          <MultipleImageCard
            :number="editImages.length"
            v-model:images="edit.subImages"
          ></MultipleImageCard>
        </v-col>
      </v-row>
      <!-- <v-row class="py-5">
        <v-col cols="3">
          <label for="">Sub Images</label>
        </v-col>
        <v-col class="d-flex flex-wrap pa-0" cols="8">
          <v-col cols="3" v-for="(image, index) in editImages">
            <SubImagesItem
              :key="image.id"
              @remove="removeImage(index)"
              @update="($event) => updateImage($event, image, index)"
              :image="image.location"
            ></SubImagesItem>
          </v-col>
          <MultipleImageCard v-model:images="edit.subImages"></MultipleImageCard>
        </v-col>
      </v-row> -->
      <v-row>
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
      <v-row>
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

      <v-row>
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
      <!-- <v-row class="px-10">
        <v-alert
          density="comfortable"
          type="success"
          variant="tonal"
          :model-value="showAlert"
        >
          Update Successfully. You have successfully updated
          <strong>{{ product.name }}</strong>
        </v-alert>
      </v-row> -->
    </v-card>

    <v-card flat class="rounded-lg border my-5 pa-5 pb-10">
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
      <v-row>
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
    </v-card>
    <v-spacer></v-spacer>
    <v-card id="actions" class="d-flex mt-4 pa-3 align-center justify-end" flat>
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
    </v-card>
  </v-container>
</template>

<script setup lang="ts">
import SubImagesItem from "../../../components/SubImagesItem.vue";
import MultipleImageCard from "../../../components/SubImagesCard.vue";
import ImageCard from "../../../components/ImageCard.vue";
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
const {
  edit,
  $v,
  update,
  isLoading,
  showAlert,
  editImages,
  removeImage,
  updateImage,
} = productEdit(product.value);
const showDialog = () => {
  file.value.click();
};
const showAppBar: any = inject("showAppbar");
onMounted(() => {
  showAppBar.value = false;
});

onBeforeRouteLeave(() => {
  showAppBar.value = true;
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
</style>
