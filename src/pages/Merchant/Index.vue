<template>
  <v-layout class="h-100">
    <v-navigation-drawer width="105" class="px-3" color="#00092C">
      <v-list
        nav
        class="text-grey-darken-1 bg-transparent d-flex flex-column h-100"
        style="overflow: hidden"
      >
        <v-avatar class="rounded-0 mb-10 mt-5" size="60">
          <v-img src="/src/assets/k.png"></v-img>
        </v-avatar>
        <v-btn
          class="mt-5"
          size="large"
          icon="mdi-view-dashboard-outline"
          to="/dashboard"
          color="amber-accent-4"
          :variant="route.name == 'Dashboard' ? 'elevated' : 'tonal'"
        ></v-btn>
        <v-btn
          class="mt-5"
          size="large"
          :to="{ name: 'Order' }"
          icon="mdi-order-bool-descending-variant"
          color="amber-accent-4"
          :variant="route.name == 'Order' ? 'elevated' : 'tonal'"
        ></v-btn>
        <v-btn
          class="mt-5"
          size="large"
          :to="{ name: 'Product' }"
          icon="mdi-food-drumstick-outline"
          color="amber-accent-4"
          :variant="route.name == 'Product' ? 'elevated' : 'tonal'"
        ></v-btn>
        <v-spacer></v-spacer>
        <v-btn
          size="large"
          @click="$user.logout()"
          icon="mdi-logout"
          color="amber-accent-4"
          variant="tonal"
        ></v-btn>
      </v-list>
    </v-navigation-drawer>
    <NotificationDrawerVue></NotificationDrawerVue>
    <v-app-bar flat class="border-b" height="95">
      <h1 class="font-weight-black text-h3 ml-15" id="title"></h1>
      <v-spacer></v-spacer>
      <div class="px-5 d-flex px-5 align-center">
        <v-avatar size="65">
          <v-img src="/src/assets/Joel-Lamb.png"></v-img>
        </v-avatar>
        <div class="ml-5">
          <h2 class="text-capitalize">{{ user.name }}</h2>
          <h4 class="font-weight-regular text-grey-darken-1">{{ user.email }}</h4>
        </div>
        <v-menu>
          <template #activator="{ props }">
            <v-btn
              v-bind="props"
              class="ml-5"
              size="small"
              color="grey-lighten-3"
              variant="elevated"
              flat
              icon="mdi-chevron-down"
            ></v-btn>
          </template>
          <v-card class="rounded-xl border" elevation="0" width="350">
            <v-list>
              <v-list-item>Profile</v-list-item>
            </v-list>
          </v-card>
        </v-menu>
      </div>
    </v-app-bar>
    <v-main id="main" style="overflow-y: scroll; height: 954px" class="bg-grey-lighten-5">
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
