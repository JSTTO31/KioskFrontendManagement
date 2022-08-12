<template>
  <v-app-bar flat color="primary">
    <v-app-bar-title>Vue App</v-app-bar-title>
    <v-spacer></v-spacer>
    <v-btn variant="elevated" color="white" @click="$user.logout()">Logout</v-btn>
  </v-app-bar>
</template>

<script setup lang="ts">
import userStore from "../store/user";

const $user = userStore();
</script>

<style scoped></style>
