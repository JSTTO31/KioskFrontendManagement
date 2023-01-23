<template>
  <v-app>
    <v-main>
      <router-view></router-view>
    </v-main>
    <NotificationContainer></NotificationContainer>
  </v-app>
</template>

<script lang="ts" setup>
import NotificationContainer from "./components/NotificationContainer.vue";
</script>
<style scoped></style>
