<template>
  <transition name="slide">
    <div class="toFix" v-if="Object.keys(order).length > 0">
      <v-card
        class="rounded-lg border mr-10 px-8 px-5 py-8 h-100 bg-white d-flex flex-column"
        flat
      >
        <div>
          <div class="">
            <h3 class="font-weight-medium text-grey-darken-3">{{ now }}</h3>
            <h1 class="text-h2 font-weight-medium text-grey-darken-4">
              &#8369;{{ order.total }}
              <v-chip
                size="large"
                :color="
                  order.status == 'completed'
                    ? 'success'
                    : order.status == 'pending'
                    ? 'warning'
                    : 'error'
                "
                class="text-capitalize"
                :prepend-icon="
                  order.status == 'completed'
                    ? 'mdi-check'
                    : order.status == 'pending'
                    ? 'mdi-reload'
                    : 'mdi-cancel'
                "
              >
                {{ order.status }}
              </v-chip>
            </h1>
          </div>
          <div class="mt-8">
            <v-card class="pa-0 rounded-lg my-3 bg-grey-lighten-4" flat>
              <v-card-title
                class="font-weight-regular d-flex align-center text-grey-darken-3"
              >
                Order Id: {{ order.id }}
                <v-spacer></v-spacer>
                <v-icon>mdi-chevron-down</v-icon>
              </v-card-title>
            </v-card>
            <v-hover v-slot="{ isHovering, props }">
              <v-card
                v-bind="props"
                class="rounded-lg font-weight-regular align-center px-2"
                flat
                :class="{ 'order-list': isHovering && order.order_items_count > 7 }"
              >
                <div
                  v-for="item in order.order_items"
                  class="w-100 d-flex align-center py-2 my-2 border-b"
                >
                  <v-avatar class="rounded-0 mr-5">
                    <v-img :src="item.product_image"></v-img>
                  </v-avatar>
                  <div class="d-flex flex-column">
                    <span> {{ item.product_name }} x {{ item.quantity }} </span>
                    <span>&#8369;{{ item.product_price }}</span>
                  </div>
                  <v-spacer></v-spacer>

                  <span class=""
                    >&#8369;{{ (item.product_price * item.quantity).toFixed(2) }}</span
                  >
                </div>
              </v-card>
            </v-hover>
            <v-spacer></v-spacer>
          </div>
        </div>
        <v-spacer></v-spacer>
        <div class="mt-5 d-flex align-end">
          <div class="w-75">
            <v-btn
              flat
              size="large"
              color="amber-accent-4"
              @click="$order.changeStatus(order, 'completed')"
              prepend-icon="mdi-check-circle-outline"
              block
              :disabled="order.status == 'completed'"
              >Confirm</v-btn
            >
          </div>
          <div class="w-25">
            <v-btn
              class="rounded-lg ml-1"
              color="error"
              variant="tonal"
              size="large"
              prepend-icon="mdi-cancel"
              block
              :disabled="order.status == 'cancelled'"
              @click="$order.changeStatus(order, 'cancelled')"
              >Cancel</v-btn
            >
          </div>
        </div>
      </v-card>
      <v-btn
        id="close"
        icon="mdi-close"
        :to="{ query: {} }"
        variant="text"
        color="error"
      ></v-btn>
    </div>
  </transition>
</template>

<script setup lang="ts">
import orderStore, { Order } from "../store/order";
import { computed, ref } from "vue";
import { onBeforeRouteUpdate, useRoute } from "vue-router";
import { storeToRefs } from "pinia";
const route = useRoute();
const $order = orderStore();
const { order } = storeToRefs($order);
const now = computed(() =>
  new Date(order.value.created_at).toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
    day: "numeric",
  })
);
const showAlert = ref(true);
if (route.query.order) {
  //@ts-ignore
  $order.getOrder(route.query.order);
}
onBeforeRouteUpdate((to, from, next) => {
  const orderId = to.query.order;

  if (to.query.order != from.query.order && orderId) {
    //@ts-ignore
    $order.getOrder(parseInt(orderId));
  }

  if (!to.query.order) {
    //@ts-ignore
    order.value = {};
  }

  next();
});
</script>

<style scoped>
#alert {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.281);
}
#alert-close-button {
  position: absolute;
  top: 0;
  right: 0;
}
#close {
  position: absolute;
  top: 10px;
  right: 50px;
  z-index: 1000;
}
.toFix {
  position: fixed;
  width: 594px;
  transition: width 1s linear !important;
}
.toFix::-webkit-scrollbar {
  width: 0px;
}
#order-view::-webkit-scrollbar {
  width: 0px;
}
.order-list {
  overflow-y: scroll;
}
.order-list::-webkit-scrollbar {
  width: 5px;
  background-color: #eeeeee;
}
.order-list::-webkit-scrollbar-thumb {
  background-color: #a8a8a8;
  border-radius: 5px;
}

.slide-enter-active,
.slide-leave-active {
  transition: transform 0.2s ease-in;
}

.slide-enter-from,
.slide-leave-to {
  transform: translateX(100%);
}
</style>
