<template>
  <v-container class="pt-10 px-15 h-100 ">
  <teleport to="#app-bar">
    <h1 class="text-h3 px-10 roboto font-weight-bold text-blue-grey-darken-4">Overview</h1>
  </teleport>
    <v-row>
      <v-col cols="9">
        <v-col cols="12" class="">
          <v-row>
            <v-col cols="4">
              <StatisticCardVue
                title="Total Orders"
                image="/src/assets/order (1).png"
                :total="totalOrders"
              ></StatisticCardVue>
            </v-col>
            <v-col cols="4">
              <StatisticCardVue
                title="Total Products"
                image="/src/assets/shopping-bag.png"
                :total="totalProducts"
              ></StatisticCardVue>
            </v-col>
            <v-col cols="4">
              <StatisticCardVue
                title="Total Sales"
                image="/src/assets/discount.png"
                :total="totalSales"
              ></StatisticCardVue>
            </v-col>
          </v-row>
          <div class="py-3">
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
      </v-col>
      <v-col cols="3">
        <!-- <ProductListNavigatorDrawerVue
          :products="mostProducts"
        ></ProductListNavigatorDrawerVue> -->
        <h2 class="text-grey-darken-3 mt-3 mb-2">Recent Orders</h2>
        <v-row>
          <v-col>
            <div class="w-100 d-flex flex-column">
              <v-card
                v-for="order in recentOrders.slice(0, 3)"
                class="rounded-xl my-1 bg-transparent"
                flat
                :to="{ name: 'Order', query: { order: order.id } }"
              >
                <v-container>
                  <v-row>
                    <v-col cols="12" class="d-flex align-center justify-space-between">
                      <span class="text-h4 font-weight-bold">&#x20B1{{ order.total }}</span>
                         
                      <v-avatar class="pa-5 bg-grey-lighten-4" size="65">
                        <span class="font-weight-medium">{{ order.order_number }}</span>
                      </v-avatar>
                    </v-col>
                    <v-col class="d-flex align-center mt-n5" cols="12">
                      <v-chip
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
                      >
                      <v-spacer></v-spacer>
                   
                    </v-col>
                    <!-- <v-col>&#x20B1;{{ order.total }}</v-col>
                    <v-col>{{ new Date(order.created_at).toDateString() }}</v-col> -->
                  </v-row>
                </v-container>
              </v-card>
            </div>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
    <v-row class="h-100 px-5" v-if="mostProducts.length > 0">
      <div  id="most-product" class="w-100 mt-5 rounded-xl px-8 py-5 d-flex">
          <v-col cols="3" class=" h-100 d-flex flex-column mt-n8 justify-center ">
            <h1 class="font-weight-regular">Most Products</h1>
            <h3 class="font-weight-medium">Here is your most product statistcs.</h3>
          
          </v-col>
          <v-col cols="2" class="py-10" v-for="product in mostProducts.slice(0, 4)">
            <div class="h-100 bg-white d-flex flex-column align-center rounded-xl" flat>
              <v-avatar size="105" class="mx-auto rounded-0 mt-n10">
                <v-img :src="product.image" :lazy-src="product.image"></v-img>
              </v-avatar>
              <v-card-title>{{ product.name   }}</v-card-title>
              <h1>+{{ (Math.random() * 20).toFixed(0)  }}</h1>
            </div>
          </v-col>
          <v-col cols="1" class="d-flex flex-column justify-center h-100 py-10 justify-center ">
            <v-card @click="" class="h-100 bg-amber-darken-4 justify-center pa-5  d-flex align-center  rounded-xl" flat>
               <v-icon size="50">mdi-chevron-right</v-icon>
            </v-card>
          </v-col>
      </div>
      <v-col>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import StatisticCardVue from "../../components/StatisticCard.vue";
import BarChart from "../../components/BarChart";
import { storeToRefs } from "pinia";
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
$dashboard.requestAll();
</script>

<style scoped>
table tbody tr:hover {
  background-color: white !important;
  border-radius: 25px !important;
}

#most-product{
  background-color: #ff6f003b !important;
  height: 305px;
  position: relative;
}

#show-more{
  position: absolute;
  right: -25px;
  top: 45%;
}
</style>
