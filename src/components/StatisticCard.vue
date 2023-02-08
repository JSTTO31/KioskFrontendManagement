<template>
  <v-card class="rounded-lg d-flex align-start mx-n3 h-100" flat>
    <template #prepend>
      <v-card variant="tonal" class="rounded-lg pa-4">
        <v-avatar class="rounded-0" size="75">
          <v-img :src="image"></v-img>
        </v-avatar>
      </v-card>
    </template>
    <template #title
      ><h5 class="font-weight-medium">{{ title }}</h5></template
    >
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
