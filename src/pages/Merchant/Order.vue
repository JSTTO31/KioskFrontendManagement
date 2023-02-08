<template>
  <v-container class="bg-transparent px-15 pt-10">
    <teleport to="#app-bar">
      <h1 class="text-h3 px-10 roboto font-weight-bold text-blue-grey-darken-4">
        My Orders
      </h1>
    </teleport>
    <v-row>
      <v-col cols="8">
        <OrderFilterVue></OrderFilterVue>
        <v-card flat class="rounded-lg">
          <OrderTableHeadVue></OrderTableHeadVue>
          <OrderRowVue v-for="order in orders.slice(0, 7)" :order="order"></OrderRowVue>
          <OrderFooterBoxVue v-if="page.last_page > 1"></OrderFooterBoxVue>
        </v-card>
      </v-col>
      <!-- <v-col :cols="Object.keys(order).length > 0 ? '7' : '12'">
        <OrderFilterVue></OrderFilterVue>
        <OrderTableHeadVue></OrderTableHeadVue>
        <EmptyDataVue v-if="page.total < 1"></EmptyDataVue>
        <OrderRowVue v-for="order in orders" :order="order"></OrderRowVue>
        
      </v-col> -->
      <v-col>
        <OrderViewVue></OrderViewVue>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import StatisticCard from "../../components/StatisticCard.vue";
import EmptyDataVue from "../../components/EmptyData.vue";
import OrderFooterBoxVue from "../../components/OrderFooterBox.vue";
import OrderTableHeadVue from "../../components/OrderTableHead.vue";
import OrderFilterVue from "../../components/OrderFilter.vue";
import OrderViewVue from "../../components/OrderView.vue";
import { ref, onBeforeMount, inject } from "vue";
import { storeToRefs } from "pinia";
import OrderRowVue from "../../components/OrderRow.vue";
import orderStore from "../../store/order";
import { onBeforeRouteLeave, onBeforeRouteUpdate, useRoute } from "vue-router";
const $order = orderStore();
const { orders, order, page } = storeToRefs(orderStore());
const fixed = ref(false);
const showTitle = ref(false);
const showNavigationRight: any = inject("showNavigationRight");
$order.getOrders();
onBeforeRouteUpdate((to, from, next) => {
  if (to.query.order == from.query.order) {
    const query = to.fullPath.match(/\?.*/gi)?.join("");
    $order.getOrders(query);
  }

  next();
});
onBeforeRouteLeave(() => {
  //@ts-ignore
  order.value = {};
  showNavigationRight.value = true;
});

onBeforeMount(() => {
  showNavigationRight.value = false;
});

//@ts-ignore
window.Echo.private("order")
  //@ts-ignore
  .listen(".order.created", ({ order }) => {
    orders.value.unshift(order);
  });
</script>

<style scoped>
#main {
  overflow-y: scroll;
}
#main::-webkit-scrollbar {
  width: 8px;
}
#main::-webkit-scrollbar-thumb {
  height: 8px;
  background-color: #ff6f00;
}
.toFixed {
  top: 0;
  width: 82% !important;
  position: fixed;
  z-index: 1000;
}
.mark-complete:hover {
  cursor: pointer;
  color: rgba(50, 162, 214, 0.637) !important;
  text-decoration: underline;
}
.mark-cancel:hover {
  cursor: pointer;
  color: rgba(214, 50, 50, 0.637) !important;
  text-decoration: underline;
}
</style>
