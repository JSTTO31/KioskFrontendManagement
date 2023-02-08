<template>
  <v-app>
    <v-navigation-drawer
      class="pt-10 pb-10 border-0"
      width="300"
      v-if="route.meta.requireAuth"
    >
      <v-card flat style="border-right: 1px solid #e0e0e0" class="h-100 rounded-0">
        <div class="d-flex align-end justify-center mb-10">
          <v-avatar class="rounded-0" size="25">
            <v-img src="/src/assets/k.png"></v-img>
          </v-avatar>
          <h3 class="mb-n2 font-weight-black text-grey-darken-4">IOSK MANAGEMENT</h3>
        </div>
        <div class="d-flex flex-column align-center mt-15">
          <v-avatar size="105">
            <v-img src="/src/assets/Joel-Lamb.png"></v-img>
          </v-avatar>
          <h4 class="font-weight-medium text-capitalize mt-2 text-grey-darken-4">
            {{ user.name }}
          </h4>
          <h5 class="font-weight-regular text-grey-darken-1">Vendor</h5>
        </div>
        <v-list class="mt-10">
          <v-list-item
            v-ripple="false"
            variant="plain"
            class="my-2 text-center rounded-lg text-h6"
            v-for="item in navItems"
            size="large"
            @click="router.push({ name: item.routeName })"
            >{{ item.name }}</v-list-item
          >
          <v-divider></v-divider>
          <v-list-item
            variant="plain"
            class="my-2 text-center rounded-lg text-h6"
            size="large"
            >Profile</v-list-item
          >
          <v-list-item
            variant="plain"
            class="my-2 text-center rounded-lg text-h6"
            size="large"
            @click="$user.logout()"
            >Logout</v-list-item
          >
          <!-- <v-list-item
            color="amber-darken-4"
            class="my-2 rounded-lg text-h6"
            size="large"
            @click="$user.logout()"
            prepend-icon="mdi-logout"
            >Logout</v-list-item
          > -->
        </v-list>
      </v-card>
    </v-navigation-drawer>
    <!-- <v-navigation-drawer
      location="right"
      width="350"
      v-if="showNavigationRight && route.meta.requireAuth"
    ></v-navigation-drawer> -->
    <v-app-bar flat class="px-8 pt-5" v-if="route.meta.requireAuth && showAppbar">
      <div id="app-bar" class="w-100" @vnode-mounted="isMounted = true"></div>
    </v-app-bar>
    <v-main>
      <router-view
        v-slot="{ Component }"
        v-if="isMounted || !showAppbar || !route.meta.requireAuth"
      >
        <Transition name="fade" mode="out-in">
          <component :is="Component"></component>
        </Transition>
      </router-view>
    </v-main>
    <NotificationContainer v-if="route.meta.requireAuth"></NotificationContainer>
  </v-app>
</template>

<script lang="ts" setup>
import { ref, provide } from "vue";
import { navItems } from "./composables/utils";
import { storeToRefs } from "pinia";
import NotificationContainer from "./components/NotificationContainer.vue";
import userStore from "./store/user";
import { useRoute, useRouter } from "vue-router";
import orderStore from "./store/order";
const isMounted = ref(false);
const $user = userStore();
const { user } = storeToRefs($user);
const router = useRouter();
const $order = orderStore();
const showNavigationRight = ref(false);
const showAppbar = ref(true);
const flat = ref(false);
const route = useRoute();
provide("showAppbar", showAppbar);
provide("showNavigationRight", showNavigationRight);
</script>
<style scoped>
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
