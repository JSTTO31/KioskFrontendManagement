<template>
  <div @click="showCreateDialog = true" style="cursor: pointer">
    <v-card
      v-bind="{ ...$attrs }"
      class="d-flex flex-column justify-center align-center rounded-xl py-5"
      flat
      style="overflow: visible"
    >
      <v-btn
        v-if="showEdit"
        id="edit-button"
        @click.stop="example"
        icon="mdi-close"
        color="error"
        class="bg-white"
        variant="tonal"
        size="small"
        @click="showEditDialog = true"
      ></v-btn>
      <v-avatar class="rounded-0" size="150">
        <v-img eager :src="cat.image" class="w-100" />
      </v-avatar>
      <h2>{{ cat.name }}</h2>
    </v-card>
  </div>
  <CreateProductDialogVue
    v-model:showDialog="showCreateDialog"
    :cat="cat"
  ></CreateProductDialogVue>
  <EditCategoryDialogVue
    :category="cat"
    v-model:showDialog="showEditDialog"
  ></EditCategoryDialogVue>
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  inheritAttrs: true,
});
</script>

<script setup lang="ts">
import EditCategoryDialogVue from "./EditCategoryDialog.vue";
import { ref } from "vue";
import CreateProductDialogVue from "./CreateProductDialog.vue";
defineProps(["cat", "showEdit"]);
const showCreateDialog = ref(false);
const showEditDialog = ref(false);
const example = (e: Event) => {
  console.log("triggered");
};
</script>

<style scoped>
#edit-button {
  position: absolute;
  top: -10px;
  right: -10px;
}
.card-outline {
  border: 1px solid transparent;
}
.card-outline:hover {
  border: 1px solid #ff6f00;
  box-sizing: none !important;
}
</style>
