<template>
  <v-list-item @click="" class="pa-0">
    <v-hover v-slot="{ isHovering, props }">
      <v-alert
        variant="tonal"
        color="amber-darken-4"
        v-bind="props"
        density="compact"
        class="border-left py-4 text-white"
      >
        <template #prepend>
          <v-icon size="35">mdi-information</v-icon>
        </template>
        <h3 class="text-capitalize d-flex align-center">
          You have new order <v-icon class="ml-2">mdi-party-popper</v-icon>
          <v-spacer></v-spacer><v-icon>mdi-chevron-down</v-icon>
        </h3>
        <h4>from: {{ notification.data.order.id }}</h4>
        <div class="d-flex" v-for="item in notification.data.order.order_items">
          <span>{{ item.product_name }} x {{ item.quantity }}</span>
          <v-spacer></v-spacer>
          <span>{{ item.total }}</span>
        </div>
        <div class="d-flex mt-3 align-center">
          <span class="font-weight-medium">Total</span>
          <v-spacer></v-spacer>
          <span>{{ notification.data.order.total }}</span>
        </div>
      </v-alert>
    </v-hover>
  </v-list-item>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import notificationStore from "../store/notification";
import { onUnmounted } from "vue";
const props = defineProps(["notification"]);
const { quickNotifications } = storeToRefs(notificationStore());
let timeout = setTimeout(() => {
  quickNotifications.value = quickNotifications.value.filter(
    (item: any) => item.id != props.notification.id
  );
}, 5000);

onUnmounted(() => {
  clearTimeout(timeout);
});
</script>

<style scoped></style>
