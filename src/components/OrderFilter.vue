<template>
  <v-card class="mb-5 d-flex align-center bg-transparent" flat>
    <div class="bg-grey-lighten-3 d-flex align-center pa-1 py-2 rounded-lg">
      <v-btn
        class="mx-1"
        :color="route.query.status ? 'transparent' : 'amber-darken-1'"
        flat
        @click="changeStatus('')"
        >All</v-btn
      >
      <v-btn
        class="mx-1"
        :color="route.query.status == 'pending' ? 'amber-darken-1' : 'transparent'"
        flat
        @click="changeStatus('pending')"
        >pending</v-btn
      >
      <v-btn
        class="mx-1"
        :color="route.query.status == 'completed' ? 'amber-darken-1' : 'transparent'"
        flat
        @click="changeStatus('completed')"
        >Completed</v-btn
      >
      <v-btn
        class="mx-1"
        :color="route.query.status == 'cancelled' ? 'amber-darken-1' : 'transparent'"
        flat
        @click="changeStatus('cancelled')"
        >Cancelled</v-btn
      >
    </div>
    <v-spacer></v-spacer>
    <v-menu v-model="showMenu" location="start">
      <template #activator="{ props }">
        <v-btn
          @click="showMenu = true"
          flat
          v-bind="props"
          class="rounded-lg"
          color="grey-lighten-3"
          icon="mdi-filter-outline"
        >
        </v-btn>
      </template>
      <div @click.stop>
        <v-card width="540" flat elevation="1" class="border rounded-lg mt-10 px-3 py-5">
          <v-card-title>Filter</v-card-title>
          <v-card-text>
            <div class="w-100 align-center d-flex">
              <v-text-field
                v-model="search.orderId"
                variant="outlined"
                density="compact"
                hide-details
                single-line
                prepend-inner-icon="mdi-magnify"
                label="Input Order ID"
                class="rounded-lg"
              ></v-text-field>
            </div>
            <div class="w-100 d-flex align-center my-5">
              <h3 class="font-weight-regular w-25">Item</h3>
              <v-text-field
                variant="outlined"
                density="compact"
                hide-details
                type="number"
                single-line
                label="Min"
                class="rounded-lg mr-1"
                v-model="search.item.min"
              ></v-text-field>
              &minus;
              <v-text-field
                variant="outlined"
                density="compact"
                hide-details
                type="number"
                single-line
                label="Max"
                class="rounded-lg ml-1"
                v-model="search.item.max"
              ></v-text-field>
            </div>
            <span class="mx-5"></span>
            <div class="w-100 d-flex align-center">
              <h3 class="font-weight-regular w-25">Total</h3>
              <v-text-field
                variant="outlined"
                density="compact"
                hide-details
                type="number"
                single-line
                label="Min"
                class="rounded-lg mr-1"
                v-model="search.total.min"
              ></v-text-field>
              &minus;
              <v-text-field
                variant="outlined"
                density="compact"
                hide-details
                type="number"
                single-line
                label="Max"
                class="rounded-lg ml-1"
                v-model="search.total.max"
              ></v-text-field>
            </div>
            <div class="mt-5">
              <v-btn color="amber-darken-1" flat class="my-2 mr-2" @click="submit"
                >Search</v-btn
              >
              <v-btn color="" flat class="my-2 border" @click="reset">Reset</v-btn>
            </div>
          </v-card-text>
        </v-card>
      </div>
    </v-menu>
  </v-card>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import orderFilter from "../composables/order-filter";
const router = useRouter();
const route = useRoute();
const { search, submit, reset, showMenu } = orderFilter();
const changeStatus = (status: string) => {
  delete route.query.page;
  router.push({ query: { ...route.query, status } });
};
</script>

<style scoped></style>
