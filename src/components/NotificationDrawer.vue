<template>
  <v-navigation-drawer
    width="450"
    location="right"
    class="py-5 px-3 bg-white"
    style="overflow-y: hidden"
  >
    <h1 class="mb-5 d-flex align-center mx-2">
      Notifications <v-icon size="25" class="ml-2">mdi-bell</v-icon>
    </h1>

    <v-card id="notification-list-container" height="865" class="" flat>
      <NotificationListVue
        v-for="notification in notifications"
        :notification="notification"
      ></NotificationListVue
    ></v-card>
  </v-navigation-drawer>
</template>

<script setup lang="ts">
import NotificationListVue from "../components/NotificationList.vue";
import { storeToRefs } from "pinia";
import notificationStore from "../store/notification";
import userStore from "../store/user";
const $notification = notificationStore();
const { user } = storeToRefs(userStore());
const { notifications } = storeToRefs(notificationStore());
$notification.getAll();

//@ts-ignore
window.Echo.private("App.Models.User.1").notification((notification) => {
  //@ts-ignore
  notifications.value.unshift(notification);
});
</script>

<style scoped>
#notification-list-container {
  overflow-y: scroll;
}
#notification-list-container::-webkit-scrollbar {
  width: 0;
}
</style>
