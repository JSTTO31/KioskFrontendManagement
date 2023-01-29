<template>
  <v-layout class="h-100">
    <v-navigation-drawer class="px-3 pt-15" width="400">
      <div class="d-flex align-end py-15 justify-center mb-10">
        <v-avatar class="rounded-0" size="35">
          <v-img src="/src/assets/k.png"></v-img>
        </v-avatar>
        <h1 class="mb-n2 font-weight-black text-grey-darken-4">IOSK MANAGEMENT</h1>
      </div>
      <div class="d-flex flex-column align-center mt-15">
        <v-avatar size="155">
          <v-img src="/src/assets/Joel-Lamb.png"></v-img>
        </v-avatar>
        <h1 class="font-weight-bold text-capitalize mt-5 text-grey-darken-4">
          {{ user.name }}
        </h1>
        <h3 class="font-weight-regular text-grey-darken-1">Vendor</h3>
      </div>
      <v-list class="mt-15">
        <v-list-item
          color="amber-darken-4"
          class="my-2 rounded-lg text-h6"
          v-for="item in navItems"
          size="large"
          :prepend-icon="item.icon"
          :to="{ name: item.routeName }"
          >{{ item.name }}</v-list-item
        >
        <v-list-item
          color="amber-darken-4"
          class="my-2 rounded-lg text-h6"
          size="large"
          @click="$user.logout()"
          prepend-icon="mdi-logout"
          >Logout</v-list-item
        >
      </v-list>
    </v-navigation-drawer>
    <!-- <NotificationDrawerVue></NotificationDrawerVue> -->
    <v-app-bar
      @vnode-mounted="isMounted = true"
      :flat="scroll < 1"
      height="95"
      v-show="showAppBar"
    >
      <h1 class="font-weight-black text-h3 ml-15" id="title"></h1>
      <v-spacer></v-spacer>
    </v-app-bar>
    <v-main id="main" style="overflow-y: scroll; height: 965px">
      <router-view v-slot="{ Component }" v-if="isMounted">
        <transition name="fade" mode="out-in">
          <component :is="Component"></component
        ></transition>
      </router-view>
    </v-main>
  </v-layout>
</template>

<script setup lang="ts">
import categoryStore from "../../store/category";
import userStore from "../../store/user";
import { provide, ref, onMounted } from "vue";
import { storeToRefs } from "pinia";
import orderStore from "../../store/order";
import { useRouter } from "vue-router";
const $user = userStore();
const $order = orderStore();
const { user } = storeToRefs($user);
const $category = categoryStore();
const scroll = ref(0);
const isMounted = ref(false);
const showAppBar = ref(true);
const router = useRouter();
const navItems = [
  {
    name: "Dashboard",
    icon: "mdi-view-dashboard-outline",
    routeName: "Dashboard",
  },
  {
    name: "Orders",
    icon: "mdi-list-status",
    routeName: "Order",
  },
  {
    name: "Products",
    icon: "mdi-food-drumstick-outline",
    routeName: "Product.index",
  },
];

$category.getAll();
$order.getOrders();
provide("main-scroll", scroll);
provide("showAppBar", showAppBar);
onMounted(() => {
  const main = document.getElementById("main");
  main?.addEventListener("scroll", () => {
    scroll.value = main.scrollTop;
  });
});
</script>

<style scoped>
#main::-webkit-scrollbar {
  width: 5px;
}
#main::-webkit-scrollbar-thumb {
  height: 8px;
  background-color: #ff6f00;
}
#main {
  scroll-behavior: smooth;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s, transform 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateX(-5%);
}
</style>
