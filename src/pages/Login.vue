<template>
  <v-layout class="h-100">
    <v-main class="pt-15">
      <v-card width="550" class="rounded-lg mx-auto">
        <v-card-title>Login</v-card-title>
        <v-card-text>
          <v-text-field
            v-model="user.email"
            @blur="$v.email.$touch()"
            :error-messages="showError($v.email)"
            variant="underlined"
            label="Email Address"
          ></v-text-field>
          <v-text-field
            v-model="user.password"
            @blur="$v.password.$touch()"
            :error-messages="showError($v.password)"
            :type="!showPassword ? 'password' : 'text'"
            variant="underlined"
            label="Password"
            @click:append-inner="showPassword = !showPassword"
            :append-inner-icon="!showPassword ? 'mdi-eye-off' : 'mdi-eye'"
          ></v-text-field>
          <div class="d-flex align-center">
            <router-link to="/register">Don't have an account?</router-link>
            <v-spacer></v-spacer>
            <v-btn
              color="primary"
              @click="submit()?.then((res) => router.push({ name: 'Home' }))"
              >submit</v-btn
            >
          </div>
        </v-card-text>
      </v-card>
    </v-main>
  </v-layout>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import { showError } from "../composables/utils";
import loginForm from "../composables/login-form";
import { useRouter } from "vue-router";
const { user, $v, submit } = loginForm();
const router = useRouter();
const showPassword = ref(false);
</script>

<style scoped></style>
