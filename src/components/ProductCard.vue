<template>
  <v-card v-bind="props" class="rounded-lg pa-0 mb-4" v-if="product && mode == 'block'">
    <v-row class="py-3">
      <v-col cols="6" class="d-flex bg-grey-lighten-4 align-center justify-center">
        <v-avatar size="90" class="mx-auto my-5 rounded-0">
          <v-img :src="product.image"></v-img>
        </v-avatar>
      </v-col>
      <v-col cols="6">
        <div class="px-1">
          <div
            class="d-flex font-weight-medium text-grey-darken-2 h-100 align-center w-100"
          >
            <v-chip
              class="text-capitalize"
              size="small"
              :color="
                product.status == 'available'
                  ? 'success'
                  : product.status == 'disable'
                  ? 'grey'
                  : 'warning'
              "
            >
              <template #prepend>
                <v-icon size="10">mdi-circle</v-icon>
              </template>
              {{ product.status }}</v-chip
            >
          </div>
          <h3 class="py-2 text-capitalize">
            {{ product.name }} <v-spacer></v-spacer>
            <span class="font-weight-medium text-amber-darken-4 text-h6"
              >&#x20B1;{{ product.price }}</span
            >
          </h3>
          <v-progress-linear
            class="rounded-lg"
            color="amber-darken-4"
            :model-value="(product.stocks / (product.sales + product.stocks)) * 100"
          ></v-progress-linear>
          <!-- <h3 class="font-weight-medium text-grey-darken-2 d-flex align-center">
            <v-icon size="24" class="mr-2" color="grey-darken-2"> mdi-package</v-icon>
            {{ product.stocks }}
          </h3>
          <h3 class="font-weight-medium text-grey-darken-2 d-flex align-center">
            <v-icon size="24" class="mr-2" color="grey-darken-2">mdi-sale</v-icon>
            {{ product.sales || 0 }}
            <v-spacer></v-spacer>
            <v-icon size="24" class="mr-2" color="grey-darken-2">mdi-calendar</v-icon>
            {{ product.created_at }}
          </h3> -->
        </div>
      </v-col>
      <div class="w-100 d-flex">
        <v-btn
          class="w-50 rounded-0"
          variant="text"
          color="grey-darken-2"
          flat
          icon="mdi-dots-horizontal"
        ></v-btn>
        <v-btn
          size="small"
          class="w-50 rounded-0"
          variant="text"
          color="grey-darken-2"
          flat
          icon="mdi-delete"
        ></v-btn>
      </div>
    </v-row>

    <span id="select"
      ><v-checkbox
        :model-value="select"
        @click.stop="change"
        color="amber-darken-2"
      ></v-checkbox
    ></span>
  </v-card>
  <v-card
    v-if="product && mode == 'list'"
    flat
    class="border-b"
    :to="{ name: 'Product.show', params: { product_id: product.id } }"
  >
    <v-row>
      <v-col cols="4" class="ma-0">
        <div class="d-flex align-center py-2">
          <div class="ml-n1 mr-5">
            <v-checkbox
              :model-value="select"
              @click.stop="change"
              color="amber-darken-2"
              hide-details
            ></v-checkbox>
          </div>
          <v-avatar class="rounded-0 mr-5" size="58">
            <v-img :src="product.image"></v-img>
          </v-avatar>
          <div class="d-flex w-100 flex-column pr-5">
            <h3>{{ product.name }}</h3>
            <v-progress-linear
              class="rounded-lg"
              color="amber-darken-4"
              :model-value="(product.stocks / (product.sales + product.stocks)) * 100"
            ></v-progress-linear>
          </div>
        </div>
      </v-col>
      <!-- <v-col cols="2" class="pa-0 ma-0">
        <div
          class="d-flex font-weight-medium text-grey-darken-2 h-100 align-center w-100"
        >
          {{ product.created_at }}
        </div>
      </v-col> -->
      <v-col cols="2" class="pa-0 ma-0 pl-3">
        <div
          class="d-flex font-weight-medium text-grey-darken-2 h-100 align-center w-100"
        >
          <v-chip
            :color="
              product.status == 'available'
                ? 'success'
                : product.status == 'disable'
                ? 'grey'
                : 'warning'
            "
            class="rounded-lg"
          >
            <template #prepend>
              <v-icon size="10">mdi-circle</v-icon>
            </template>
            {{ product.status }}</v-chip
          >
        </div>
      </v-col>
      <v-col cols="2" class="pa-0 ma-0 pl-3">
        <div
          class="d-flex font-weight-medium text-grey-darken-2 h-100 align-center w-100"
        >
          {{ product.stocks }}
        </div>
      </v-col>
      <v-col cols="2" class="pa-0 ma-0 pl-3">
        <div
          class="d-flex font-weight-medium text-grey-darken-2 h-100 align-center w-100"
        >
          {{ product.sales || 0 }}
        </div>
      </v-col>
      <v-col cols="2" class="pa-0 ma-0 pl-3">
        <div
          class="d-flex font-weight-medium pr-5 text-grey-darken-2 h-100 align-center w-100"
        >
          &#x20B1;{{ product.price }}
        </div>
      </v-col>
    </v-row>
  </v-card>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { Product } from "../store/Product";
const props = defineProps<{ product: Product; selected: Set<any>; mode: string }>();
const select = computed(() => {
  const arr = [...props.selected];

  return (
    arr.filter((item) => item.id == props.product.id).length > 0 ||
    props.selected.has(props.product)
  );
});
const date = computed(() =>
  new Date(props.product.created_at).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  })
);
const emits = defineEmits(["update:selected"]);
const change = (e: any) => {
  if (!select.value) {
    props.selected.add(props.product);
    emits("update:selected", props.selected);
  } else {
    if (!props.selected.delete(props.product)) {
      props.selected.forEach((item) =>
        item.id == props.product.id ? props.selected.delete(item) : ""
      );
    }

    emits("update:selected", props.selected);
  }
};
</script>

<style scoped>
#select {
  position: absolute;
  top: 2%;
  left: 2%;
}
</style>
