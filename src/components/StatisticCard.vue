<template>
  <v-card class="pa-5 rounded-lg d-flex align-end h-100" color="#EEEEEE" flat>
    <template #prepend>
      <v-avatar class="rounded-0" size="85">
        <v-img :src="image"></v-img>
      </v-avatar>
    </template>
    <template #title>{{ title }}</template>
    <template #subtitle
      ><h1 class="text-h2 font-weight-bold">
        {{ number }}
      </h1></template
    >
  </v-card>
</template>

<script setup lang="ts">
import { onMounted, ref, watch } from "vue";
const number = ref(0);
const props = defineProps(["title", "image", "total"]);
let timer: any = null;
onMounted(() => {
  if (props.total != number.value) {
    timer = setInterval(() => {
      number.value += 2;
      if (number.value >= props.total) {
        number.value = props.total;
        clearInterval(timer);
      }
    }, 10);
  }
});
watch(
  () => props.total,
  () => {
    timer = setInterval(() => {
      number.value += parseInt(props.total.toString().length);
      if (number.value >= props.total) {
        number.value = props.total;
        clearInterval(timer);
      }
    }, 10);
  }
);
</script>

<style scoped></style>
