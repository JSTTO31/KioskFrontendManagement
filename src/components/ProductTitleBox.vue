<template>
  <v-card class="d-flex align-center mt-3 rounded-lg bg-transparent" height="65" flat>
    <div class="bg-grey-lighten-3 d-flex align-center pa-1 py-2 rounded-lg">
      <v-btn
        class="mx-1"
        :color="route.query.status ? 'transparent' : 'amber-darken-1'"
        flat
        @click="pick('')"
        >All</v-btn
      >
      <v-btn
        class="mx-1"
        flat
        :color="route.query.status != 'available' ? 'transparent' : 'amber-darken-1'"
        @click="pick('available')"
        >Available</v-btn
      >
      <v-btn
        :color="route.query.status != 'disable' ? 'transparent' : 'amber-darken-1'"
        class="mx-1"
        flat
        @click="pick('disable')"
        >Disable</v-btn
      >
    </div>
    <v-spacer></v-spacer>
    <v-btn
      class="mr-4"
      prepend-icon="mdi-plus"
      color="amber-darken-1"
      flat
      :to="{ name: 'Product.create' }"
      >Add Product</v-btn
    >
    <v-btn
      class="mx-1"
      variant="text"
      flat
      icon="mdi-view-list"
      @click="emits('update:mode', 'list')"
      :active="mode == 'list'"
      :color="mode == 'list' ? 'amber-darken-1' : 'grey-darken-1'"
    ></v-btn>
    <v-btn
      class="mx-1"
      variant="text"
      flat
      icon="mdi-view-grid"
      @click="emits('update:mode', 'block')"
      :active="mode == 'block'"
      :color="mode == 'block' ? 'amber-darken-1' : 'grey-darken-1'"
    ></v-btn>
  </v-card>
</template>

<script setup lang="ts">
import { useRoute, useRouter } from "vue-router";
const router = useRouter();
const route = useRoute();
defineProps<{ mode: string }>();
const emits = defineEmits(["update:selected", "update:mode"]);
const pick = (status: string) => {
  delete route.query.status;
  delete route.query.page;
  router.push({ query: { status, ...route.query } });
};
</script>

<style scoped></style>
