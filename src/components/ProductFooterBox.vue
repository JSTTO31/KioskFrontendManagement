<template>
  <v-card class="mt-2 py-2 px-3 d-flex align-center" flat>
    <div>
      <span>Page {{ paginate }}/{{ page.last_page }}</span>
    </div>
    <v-spacer></v-spacer>
    <v-btn
      icon="mdi-chevron-left"
      variant="text"
      class="mx-1"
      :disabled="paginate < 2"
      @click="paginate--"
    ></v-btn>
    <v-btn
      icon="mdi-chevron-right"
      variant="text"
      class="mx-1"
      :disabled="page.last_page <= paginate"
      @click="paginate++"
    ></v-btn>
  </v-card>
  <v-card
    class="d-flex align-center mt-3 px-3 rounded-lg"
    height="65"
    flat
    v-if="selected.size > 0"
  >
    <v-card-title class="text-h6 d-flex px-0 align-center">
      <span
        ><v-checkbox
          indeterminate
          hide-details
          :model-value="select"
          color="amber-darken-1"
          @click="selectAll"
          :disabled="products.length < 1"
        ></v-checkbox
      ></span>
      <span>({{ selected.size }}) Selected</span>
    </v-card-title>
    <v-btn
      variant="text"
      color="error"
      prepend-icon="mdi-delete"
      v-if="selected.size"
      class="mx-5"
      @click="deleteAll"
      >Delete All</v-btn
    >
  </v-card>
</template>

<script setup lang="ts">
import { computed, ref, watch } from "vue";
import { storeToRefs } from "pinia";
import productStore from "../store/Product";
import { useRoute, useRouter } from "vue-router";
const router = useRouter();
const route = useRoute();
const $product = productStore();
const { products, page } = storeToRefs(productStore());
//@ts-ignore
const paginate = ref(parseInt(route.query.page || 1));
const props = defineProps<{
  selected: Set<any>;
  fixed: boolean;
}>();
const select = computed(() => {
  const toArr = [...props.selected];
  return products.value.every(
    (product) =>
      props.selected.has(product) ||
      toArr.filter((item) => item.id == product.id).length > 0
  );
});
const emits = defineEmits(["update:selected"]);
const selectAll = () => {
  if (select.value) {
    emits("update:selected", new Set());
  } else {
    const arr = [...props.selected];
    products.value.forEach((product) => {
      if (arr.filter((item) => item.id == product.id).length < 1) {
        props.selected.add(product);
      }
    });
    emits("update:selected", props.selected);
  }
};
const loading = ref(false);
const progress = ref(0);

const deleteAll = () => {
  const selected = props.selected;
  const count = props.selected.size;
  const container: any = [];
  let index = 0;
  loading.value = true;
  selected.forEach((item) => {
    container.push(
      $product.remove(item.id).then(() => {
        index++;
        //@ts-ignore
        progress.value = ((index / count) * 100).toFixed(2);
      })
    );
  });

  const query = route.fullPath.match(/\?.*/gi)?.join("");
  container.push($product.getAll(query));
  return Promise.all(container)
    .then(() => {
      loading.value = false;
      progress.value = 100;
      emits("update:selected", new Set());
    })
    .then(() => (progress.value = 0));
};

watch(
  () => paginate.value,
  (current) => {
    delete route.query.page;
    router.replace({ query: { ...route.query, page: current } });
  }
);
</script>

<style scoped></style>
