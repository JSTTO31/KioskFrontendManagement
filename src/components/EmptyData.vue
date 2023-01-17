<template>
  <span
    v-bind="$attrs"
    class="d-flex flex-column align-center mt-16 justify-center pt-16"
  >
    <v-avatar size="150" class="rounded-0">
      <v-img src="/src/assets/undraw_no_data_re_kwbl.svg"></v-img>
    </v-avatar>
    <h2 class="font-weight-regular text-grey-darken-1">No data</h2>
  </span>
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  inheritAttrs: true,
  setup() {},
});
</script>

<style scoped></style>
