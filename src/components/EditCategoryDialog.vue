<template>
  <v-dialog :model-value="showDialog" persistent>
    <v-card width="450" flat elevation="0">
      <v-card-title class="d-flex align-center text-red-darken-4">
        <v-icon color="error">mdi-delete-outline</v-icon>
        Delete Category
        <v-spacer></v-spacer>
        <v-btn
          icon="mdi-close"
          variant="text"
          size="small"
          @click="emits('update:showDialog', false)"
        ></v-btn>
      </v-card-title>
      <p class="px-6 py-5">
        You are about to delete Category
        <span class="text-red-darken-4 font-weight-medium">{{ category.name }}</span
        >, Are you sure about that?
      </p>
      <v-card-actions class="bg-grey-lighten-4">
        <v-spacer></v-spacer>
        <v-btn class="mx-2" @click="emits('update:showDialog', false)">Cancel</v-btn>
        <v-btn variant="elevated" color="error" @click="remove" :loading="loading"
          >Delete</v-btn
        >
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import { ref } from "vue";
import categoryStore from "../store/category";
const props = defineProps(["showDialog", "category"]);
const emits = defineEmits(["update:showDialog"]);
const $category = categoryStore();
const loading = ref(false);
const remove = () => {
  loading.value = true;
  $category.removeCategory(props.category).then(() => {
    loading.value = false;
    emits("update:showDialog", false);
  });
};
</script>

<style scoped></style>
