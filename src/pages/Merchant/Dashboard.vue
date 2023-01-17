<template>
  <teleport to="#title" v-if="showTitle">{{ title }}</teleport>
  <v-container style="padding: 20px 80px">
    <v-row>
      <v-col cols="4">
        <StatisticCardVue
          title="Number of Orders"
          image="/src/assets/order (1).png"
          :total="totalOrders"
        ></StatisticCardVue>
      </v-col>
      <v-col cols="4">
        <StatisticCardVue
          title="Number of Products"
          image="/src/assets/shopping-bag.png"
          :total="totalProducts"
        ></StatisticCardVue>
      </v-col>
      <v-col cols="4">
        <StatisticCardVue
          title="Number of Sales"
          image="/src/assets/discount.png"
          :total="totalSales"
        ></StatisticCardVue>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="8">
        <v-col cols="12" class="">
          <div>
            <h3 class="text-grey-lighten-1 font-weight-regular">Total Profit</h3>
            <div class="d-flex w-100 justify-content-between">
              <h1 class="text-h3 text-grey-darken-4 mb-2 font-weight-black">
                &#x20B1;{{ profit.toLocaleString() }}
              </h1>
              <v-spacer></v-spacer>
              <h3 class="text-grey-darken-1">MONTHLY</h3>
            </div>
          </div>
          <BarChart :styles="{ height: '250px' }"></BarChart>
        </v-col>
        <h1 class="text-grey-darken-3 mt-3">Recent Orders</h1>
        <v-row>
          <v-col>
            <div class="w-100 d-flex flex-column">
              <v-card
                v-for="order in recentOrders"
                class="rounded-lg my-1 bg-transparent"
                flat
                :to="{ name: 'Order', query: { order: order.id } }"
              >
                <v-container>
                  <v-row>
                    <v-col>{{ order.id }}</v-col>
                    <v-col
                      ><v-chip
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
                        >{{ order.status }}</v-chip
                      ></v-col
                    >

                    <v-col>x{{ order.order_items_count }}</v-col>
                    <v-col>&#x20B1;{{ order.total }}</v-col>
                    <v-col>{{ new Date(order.created_at).toDateString() }}</v-col>
                  </v-row>
                </v-container>
              </v-card>
            </div>
          </v-col>
        </v-row>
      </v-col>
      <v-col cols="4">
        <ProductListNavigatorDrawerVue
          :products="mostProducts"
        ></ProductListNavigatorDrawerVue>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import StatisticCardVue from "../../components/StatisticCard.vue";
import BarChart from "../../components/BarChart";
import ProductListNavigatorDrawerVue from "../../components/ProductListNavigatorDrawer.vue";
import { storeToRefs } from "pinia";
import { computed, ref, onMounted } from "vue";
import productStore from "../../store/Product";
import dashboardStore from "../../store/dashboard";
const title = "Dashboard";
const $dashboard = dashboardStore();
const {
  recentOrders,
  totalOrders,
  totalSales,
  totalProducts,
  mostProducts,
  profit,
} = storeToRefs(dashboardStore());
const { page: product_page } = storeToRefs(productStore());
const showTitle = ref(false);
onMounted(() => {
  showTitle.value = true;
});

$dashboard.requestAll();
</script>

<style scoped>
table tbody tr:hover {
  background-color: white !important;
  border-radius: 25px !important;
}
</style>
