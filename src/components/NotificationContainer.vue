<template>
  <div class="container" v-show="quickNotifications.length > 0">
    <v-list class="px-5" style="overflow-x: hidden">
      <transition-group name="slide">
        <NotificationListItem
          class="my-2"
          v-for="notification in quickNotifications"
          :key="notification.id"
          :notification="notification"
        ></NotificationListItem>
      </transition-group>
    </v-list>
  </div>
</template>

<script setup lang="ts">
import NotificationListItem from "./NotificationListItem.vue";
import { storeToRefs } from "pinia";
import { onMounted } from "vue";
import notificationStore from "../store/notification";
const $notification = notificationStore();
const { quickNotifications } = storeToRefs(notificationStore());
//@ts-ignore
window.Echo.private("App.Models.User.1").notification((notification) => {
  //@ts-ignore
  quickNotifications.value.push(notification);
});
</script>

<style scoped>
.container {
  position: fixed;
  bottom: 0%;
  right: 0%;
  z-index: 1000;
  width: 500px;
}

.slide-enter-active,
.slide-to-active {
  transition: opacity 0.1s, transform 0.2s ease-in;
}

.slide-enter-from,
.slide-to-to {
  transform: translateX(50%);
}
</style>
