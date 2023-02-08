<template>
  <v-card class="mt-2 px-3 d-flex align-center" flat>
    <div>
      <span>Page {{ page }}/{{ paginate.last_page }}</span>
    </div>
    <v-spacer></v-spacer>
    <v-btn
      icon="mdi-chevron-left"
      variant="text"
      class="rounded-lg mx-1"
      :disabled="page < 2"
      @click="page--"
    ></v-btn>
    <v-btn
      icon="mdi-chevron-right"
      variant="text"
      class="rounded-lg mx-1"
      :disabled="paginate.last_page <= page"
      @click="page++"
    ></v-btn>
  </v-card>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import { storeToRefs } from "pinia";
import orderStore from "../store/order";
import { useRoute, useRouter } from "vue-router";
const route = useRoute();
const router = useRouter();
const { page: paginate } = storeToRefs(orderStore());
const page = ref(paginate.value.current_page);
watch(
  () => page.value,
  () => {
    router.push({ query: { ...route.query, page: page.value } });
  }
);
</script>

<style scoped></style>
