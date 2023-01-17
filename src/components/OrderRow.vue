<template>
  <v-card
    class="rounded-0 border-b bg-transparent"
    flat
    :to="{ query: { ...route.query, order: order.id } }"
    :class="{ active: order.id.toString() == route.query.order }"
  >
    <v-row class="py-3 px-3 border-b">
      <v-col cols="4" class="px-2">
        <div class="d-flex align-center ml-1">
          <div class="text-grey-darken-1 font-weight-regular">#{{ order.id }}</div>
        </div>
      </v-col>
      <v-col cols="2">
        <div class="d-flex align-center h-100 ml-1">{{ date }}</div>
      </v-col>
      <v-col cols="2">
        <div class="d-flex align-center h-100 ml-1">
          <v-chip
            size="small"
            class="rounded-lg text-capitalize"
            :color="
              order.status == 'completed'
                ? 'success'
                : order.status == 'pending'
                ? 'warning'
                : 'error'
            "
            :prepend-icon="
              order.status == 'completed'
                ? 'mdi-check'
                : order.status == 'pending'
                ? 'mdi-reload'
                : 'mdi-cancel'
            "
          >
            {{ order.status }}</v-chip
          >
        </div>
      </v-col>

      <v-col cols="2">
        <div class="d-flex align-center h-100 ml-1">{{ order.order_items.length }}x</div>
      </v-col>
      <v-col cols="2">
        <div class="d-flex align-center h-100 ml-1">&#8369;{{ order.total }}</div>
      </v-col>
    </v-row>
  </v-card>
</template>

<script setup lang="ts">
import { computed, onMounted } from "vue";
import { useRoute } from "vue-router";
import orderStore, { Order } from "../store/order";
const $order = orderStore();
const route = useRoute();
const props = defineProps<{ order: Order }>();
const date = computed(() => {
  return route.query.order
    ? new Date(props.order.created_at).toLocaleTimeString()
    : new Date(props.order.created_at).toLocaleTimeString();
});
</script>

<style scoped>
.active {
  box-sizing: border-box;
  border-left: 3px solid #ff6f00 !important;
}
</style>
