<template>
  <v-layout class="h-100">
    <v-main class="bg-amber-lighten-5">
      <v-container style="padding: 150px 250px">
        <v-row>
          <v-col cols="7" class="mt-10 px-5 pr-15">
            <h1 class="d-flex align-end text-h4 font-weight-bold">
              <v-avatar size="50" class="rounded-0 mr-1"
                ><v-img src="/src/assets/k.png"></v-img></v-avatar
              >iosk Management System
            </h1>
            <h2 style="line-height: 1.3" class="text-h4 font-weight-regular mt-3">
              The best Kiosk Management System That Can Help Your Business Grow
            </h2>
          </v-col>
          <v-col>
            <v-card class="rounded-lg py-5" :disabled="loading">
              <v-card-text>
                <label for="" class=""
                  ><h3 class="mb-2 font-weight-medium">Email Address:</h3></label
                >
                <v-text-field
                  v-model="user.email"
                  @blur="$v.email.$touch()"
                  :error-messages="showError($v.email)"
                  variant="outlined"
                  single-line
                  label="Email Address"
                  @keydown.enter="submit"
                ></v-text-field>
                <label for="" class=""
                  ><h3 class="mb-2 font-weight-medium my-2">Password:</h3></label
                >
                <v-text-field
                  v-model="user.password"
                  @blur="$v.password.$touch()"
                  :error-messages="showError($v.password)"
                  :type="!showPassword ? 'password' : 'text'"
                  variant="outlined"
                  single-line
                  label="Password"
                  @click:append-inner="showPassword = !showPassword"
                  :append-inner-icon="!showPassword ? 'mdi-eye-off' : 'mdi-eye'"
                  @keydown.enter="submit"
                ></v-text-field>
                <v-btn
                  flat
                  color="amber-darken-4"
                  block
                  size="large"
                  class="mt-10 font-weight-bold text-white"
                  @click="submit"
                  :loading="loading"
                  >Log in</v-btn
                >
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-layout>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import { showError } from "../../composables/utils";
import loginForm from "../../composables/login-form";
import { useRouter } from "vue-router";
const { user, $v, submit, loading } = loginForm();
const router = useRouter();
const showPassword = ref(false);
</script>

<style scoped></style>
