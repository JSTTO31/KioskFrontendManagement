<template>
  <v-hover v-slot="{ isHovering, props }">
    <v-card v-bind="props" class="pa-5 rounded-lg my-1 d-flex" flat @click="">
      <v-col cols="3">
        <v-avatar size="80">
          <v-img src="/src/assets/information.png"></v-img>
        </v-avatar>
      </v-col>
      <v-col>
        <h3 class="text-capitalize">{{ notification.data.title }}</h3>
        <v-card-title class="pa-0 ma-0 font-weight-regular text-subtitle-1"
          >from: {{ notification.data.order.id }}</v-card-title
        >
        <h4 class="font-weight-regular d-flex justify-space-between">
          Details <v-icon v-if="isHovering">mdi-chevron-down</v-icon>
          <v-icon v-else>mdi-chevron-up</v-icon>
        </h4>
        <v-list v-if="isHovering">
          <div class="d-flex" v-for="item in notification.data.order.order_items">
            <span>{{ item.product_name }} x {{ item.quantity }}</span>
            <v-spacer></v-spacer>
            <span>{{ item.total }}</span>
          </div>
          <div class="d-flex mt-3">
            <span class="font-weight-medium">Total</span>
            <v-spacer></v-spacer>
            <span>{{ notification.data.order.total }}</span>
          </div>
        </v-list>
      </v-col>
    </v-card>
  </v-hover>
</template>

<script setup lang="ts">
const props = defineProps(["notification"]);
</script>

<style scoped></style>
