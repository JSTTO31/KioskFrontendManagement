<template>
  <v-dialog v-model="showDialog" persistent>
    <v-card class="rounded-x" width="450" elevation="0">
      <v-card-title class="d-flex align-center"
        ><span class="text-amber-accent-4">{{ cat.name }}</span
        >&nbsp;&middot; Add Product <v-spacer></v-spacer
        ><v-btn
          @click="emits('update:showDialog', false)"
          variant="text"
          icon="mdi-close"
        ></v-btn
      ></v-card-title>
      <v-card-text>
        <v-text-field
          @blur="$v.name.$touch()"
          :error-messages="showError($v.name)"
          v-model="product.name"
          prepend-icon="mdi-text"
          density="compact"
          label="Product Name"
          variant="outlined"
        ></v-text-field>
        <v-text-field
          @blur="$v.price.$touch()"
          :error-messages="showError($v.price)"
          v-model="product.price"
          type="number"
          density="compact"
          label="Product Price"
          variant="outlined"
        >
          <template #prepend>
            <span class="mr-2 font-weight-bold text-h5 text-grey-darken-1">&#8369;</span>
          </template>
        </v-text-field>
        <v-file-input
          label="Product image"
          variant="outlined"
          prepend-icon="mdi-camera"
          accept="image/png"
          show-size
          file
          :error-messages="showError($v.image)"
          @change="setImage"
          @click:clear="(url = ''), (product.image = '')"
        ></v-file-input>
        <v-card
          flat
          class="border d-flex justify-center py-4 rounded-xl"
          v-if="url.length > 0"
        >
          <v-avatar size="150" class="mx-auto rounded-0">
            <img id="image" :src="url" class="w-100" />
          </v-avatar>
        </v-card>
      </v-card-text>
      <v-card-actions class="bg-grey-lighten-4">
        <v-spacer></v-spacer>
        <v-btn @click="emits('update:showDialog', false)">Cancel</v-btn>
        <v-btn
          @click="createProduct"
          variant="elevated"
          color="amber-accent-4"
          :loading="loading"
          >Create</v-btn
        >
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import { watch, ref } from "vue";
import productCreate from "../composables/product-create";
import { showError } from "../composables/utils";
const { setImage, product, $v, url, reset, create } = productCreate();
const props = defineProps(["showDialog", "cat"]);
const emits = defineEmits(["update:showDialog"]);
const loading = ref(false);
const createProduct = () => {
  loading.value = true;
  create(props.cat.id).then(() => {
    loading.value = false;
    emits("update:showDialog", false);
  });
};
watch(
  () => props.showDialog,
  (current) => {
    if (!current) {
      reset();
    }
  }
);
</script>

<style scoped></style>
