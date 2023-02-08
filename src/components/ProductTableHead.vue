<template>
  <div class="w-100 d-flex align-center justify-end my-3" v-if="mode == 'block'">
    <v-btn
      variant="text"
      size="small"
      append-icon="mdi-menu-swap"
      :to="{ query: { ...route.query, orderBy: 'date' } }"
      >Date</v-btn
    >
    <v-btn
      variant="text"
      size="small"
      append-icon="mdi-menu-swap"
      :to="{ query: { ...route.query, orderBy: 'price' } }"
      >Price</v-btn
    >
    <v-btn
      variant="text"
      size="small"
      append-icon="mdi-menu-swap"
      :to="{ query: { ...route.query, orderBy: 'stocks' } }"
      >Stock</v-btn
    >
    <v-btn
      :to="{ query: { ...route.query, orderBy: 'sales' } }"
      variant="text"
      size="small"
      append-icon="mdi-menu-swap"
      >Sales</v-btn
    >
  </div>
  <div v-else>
    <v-card class="bg-amber-lighten-4 rounded-0 py-2" flat>
      <v-row>
        <v-col cols="4" class="px-10 pt-3 mb-5">
          <div class="h-100 d-flex align-center">
            <!-- <h4 class="font-weight-medium text-uppercase">Product name</h4> -->
          </div>
        </v-col>
        <v-col cols="2" class="pt-3 mb-5 pa-0">
          <div class="h-100 d-flex align-center">
            <v-btn
              variant="text"
              append-icon="mdi-menu-swap"
              :to="{ query: { ...route.query, orderBy: 'status' } }"
              >Status</v-btn
            >
          </div>
        </v-col>
        <v-col cols="2" class="pt-3 mb-5 pa-0">
          <div class="h-100 d-flex align-center">
            <v-btn
              variant="text"
              append-icon="mdi-menu-swap"
              :to="{ query: { ...route.query, orderBy: 'stocks' } }"
              >Stock</v-btn
            >
          </div>
        </v-col>
        <v-col cols="2" class="pt-3 mb-5 pa-0">
          <div class="h-100 d-flex align-center">
            <v-btn
              variant="text"
              append-icon="mdi-menu-swap"
              :to="{ query: { ...route.query, orderBy: 'sales' } }"
              >Sales</v-btn
            >
          </div>
        </v-col>
        <v-col cols="1" class="pt-3 mb-5 pa-0">
          <div class="h-100 d-flex align-center">
            <v-btn
              variant="text"
              append-icon="mdi-menu-swap"
              :to="{ query: { ...route.query, orderBy: 'price' } }"
              >Price</v-btn
            >
          </div>
        </v-col>
      </v-row>
    </v-card>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from "vue-router";
const props = defineProps(["mode"]);
const route = useRoute();
</script>

<style scoped></style>
