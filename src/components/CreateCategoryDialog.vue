<template>
  <v-dialog persistent flat v-model="showDialog">
    <v-card class="rounded-x" width="450" elevation="0">
      <v-card-title class="d-flex align-center"
        >Add Category <v-spacer></v-spacer
        ><v-btn
          variant="text"
          icon="mdi-close"
          @click="emits('update:showDialog', false)"
        ></v-btn
      ></v-card-title>
      <v-card-text>
        <v-text-field
          @blur="$v.name.$touch"
          :error-messages="showError($v.name)"
          v-model="category.name"
          prepend-icon="mdi-text"
          density="compact"
          label="Category Name"
          variant="outlined"
        ></v-text-field>
        <v-file-input
          :error-messages="showError($v.image)"
          label="Category image"
          variant="outlined"
          prepend-icon="mdi-camera"
          @change="setImage"
          @click:clear="url = ''"
          accept="image/png"
          show-size
          file
        ></v-file-input>
        <v-card flat class="border d-flex justify-center py-4" v-if="url.length > 0">
          <v-avatar size="150" class="mx-auto rounded-0">
            <img id="image" :src="url" class="w-100" />
          </v-avatar>
        </v-card>
      </v-card-text>
      <v-card-actions class="bg-grey-lighten-4">
        <v-spacer></v-spacer>
        <v-btn @click="emits('update:showDialog', false)">Cancel</v-btn>
        <v-btn
          @click="createCategory"
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
import categoryCreate from "../composables/category-create";
import { showError } from "../composables/utils";
const { category, setImage, url, $v, create, reset } = categoryCreate();
const loading = ref(false);
const createCategory = () => {
  loading.value = true;
  create()?.then(() => {
    loading.value = false;
    emits("update:showDialog", false);
  });
};
const props = defineProps(["showDialog"]);
const emits = defineEmits(["update:showDialog"]);
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
