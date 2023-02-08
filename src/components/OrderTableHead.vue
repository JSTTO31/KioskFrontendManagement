<template>
  <v-card class="bg-amber-lighten-4 rounded-0 py-2" flat>
    <v-row>
      <v-col cols="4" class="d-flex align-center py-5">
        <!-- <v-btn
          variant="text"
          append-icon="mdi-menu-swap"
          flat
          :to="{ query: { ...route.query, orderBy: 'id' } }"
          >Order ID</v-btn
        > -->
      </v-col>
      <v-col cols="2" class="d-flex align-center">
        <span class="font-weight-regular"
          ><v-btn
            variant="text"
            append-icon="mdi-menu-swap"
            flat
            :to="{ query: { ...route.query, orderBy: 'time' } }"
            >Time</v-btn
          ></span
        >
      </v-col>
      <v-col cols="2" class="d-flex align-center">
        <span class="font-weight-regular">
          <v-btn
            variant="text"
            append-icon="mdi-menu-swap"
            flat
            :to="{ query: { ...route.query, orderBy: 'status' } }"
            >Status</v-btn
          >
        </span>
      </v-col>
      <v-col cols="2" class="d-flex align-center">
        <span class="font-weight-regular"
          ><v-btn
            variant="text"
            append-icon="mdi-menu-swap"
            flat
            :to="{ query: { ...route.query, orderBy: 'item' } }"
            >Items</v-btn
          ></span
        >
      </v-col>
      <v-col cols="2" class="d-flex align-center">
        <span class="font-weight-regular">
          <v-btn
            variant="text"
            append-icon="mdi-menu-swap"
            flat
            :to="{ query: { ...route.query, orderBy: 'total' } }"
            >Total</v-btn
          >
        </span>
      </v-col>
    </v-row>
  </v-card>
</template>

<script setup lang="ts">
import { useRoute } from "vue-router";

const route = useRoute();
</script>

<style scoped></style>
