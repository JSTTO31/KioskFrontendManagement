<template>
  <v-container class="bg-grey-lighten-4 px-5" fluid>
    <h2 class="d-flex font-weight-light text-grey-darken-1 mb-5">
      <span>Our Categories</span>
      <v-spacer></v-spacer>
      <v-btn
        v-if="!showEdit"
        variant="text"
        @click="showEdit = true"
        prependIcon="mdi-cog"
        >Edit Categories</v-btn
      >
      <v-btn
        v-else
        variant="text"
        @click="showEdit = false"
        prependIcon="mdi-close"
        color="error"
        >Close Edit</v-btn
      >
    </h2>
    <v-row>
      <v-col cols="2">
        <div @click="showCreateDialog = true" style="cursor: pointer">
          <v-card
            class="d-flex flex-column justify-center align-center rounded-xl py-5 card-outline"
            flat
          >
            <v-avatar class="rounded-0" size="150">
              <v-img src="/src/assets/plus-sign.png"></v-img>
            </v-avatar>
            <h2>Add Category</h2>
          </v-card>
        </div>
      </v-col>
      <v-col cols="2" v-for="cat in categories">
        <CategoryListItemVue
          class="card-outline"
          :showEdit="showEdit"
          :cat="cat"
        ></CategoryListItemVue>
      </v-col>
    </v-row>
  </v-container>
  <CreateCategoryDialogVue
    v-model:showDialog="showCreateDialog"
  ></CreateCategoryDialogVue>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { storeToRefs } from "pinia";
import categoryStore from "../store/category";
import CreateCategoryDialogVue from "./CreateCategoryDialog.vue";
import CategoryListItemVue from "./CategoryListItem.vue";
// const $category = categoryStore();
// $category.getAll();
const { categories } = storeToRefs(categoryStore());
const showCreateDialog = ref(false);
const showEdit = ref(false);
</script>

<style scoped>
.card-outline {
  border: 1px solid transparent;
}
.card-outline:hover {
  border: 1px solid #ff6f00;
  box-sizing: none !important;
}
</style>
