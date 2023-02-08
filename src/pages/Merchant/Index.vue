<template>
  <v-layout class="h-100">
    <!-- <NotificationDrawerVue></NotificationDrawerVue> -->

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
