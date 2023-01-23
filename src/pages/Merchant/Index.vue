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
          :to="item.link"
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
    <v-app-bar :flat="scroll < 1" height="95">
      <h1 class="font-weight-black text-h3 ml-15" id="title"></h1>
      <v-spacer></v-spacer>
    </v-app-bar>
    <v-main id="main" style="overflow-y: scroll; height: 954px">
      <router-view></router-view>
    </v-main>
  </v-layout>
</template>

<script setup lang="ts">
import NotificationDrawerVue from "../../components/NotificationDrawer.vue";
import { useRoute, useRouter } from "vue-router";
import categoryStore from "../../store/category";
import userStore from "../../store/user";
import { provide, ref, onMounted } from "vue";
import { storeToRefs } from "pinia";
import notificationStore from "../../store/notification";
const route = useRoute();
const $user = userStore();
const { user } = storeToRefs($user);
const $category = categoryStore();
const scroll = ref(0);
const navItems = [
  {
    name: "Dashboard",
    icon: "mdi-view-dashboard-outline",
    link: "/dashboard",
  },
  {
    name: "Orders",
    icon: "mdi-list-status",
    link: "/orders",
  },
  {
    name: "Products",
    icon: "mdi-food-drumstick-outline",
    link: "/products",
  },
];

$category.getAll();

provide("main-scroll", scroll);
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
</style>
