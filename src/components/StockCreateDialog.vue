<template>
  <v-dialog :model-value="showProduct" @click:outside="close" :persistent="true">
    <v-card width="450" flat elevation="0" v-if="stockCreateProgress == -1">
      <v-card-title class="d-flex align-center"
        >Add Stocks <v-spacer></v-spacer>
        <v-btn
          icon="mdi-close"
          variant="text"
          size="small"
          @click="emits('update:showProduct', false)"
        ></v-btn>
      </v-card-title>
      <v-card-text>
        <v-text-field
          @blur="$v.number.$touch()"
          :error-messages="showError($v.number)"
          v-model="number"
          type="number"
          variant="outlined"
          label="Number of stocks"
        ></v-text-field>
      </v-card-text>
      <v-card-actions class="bg-grey-lighten-4">
        <v-spacer></v-spacer>
        <v-btn class="mx-2" @click="emits('update:showProduct', false)">Cancel</v-btn>
        <v-btn variant="elevated" color="amber-darken-1" @click="createStock">Add</v-btn>
      </v-card-actions>
    </v-card>
    <v-card
      v-else
      width="450"
      class="d-flex px-5 flex-col align-center justify-center"
      height="150px"
    >
      <h3 class="font-weight-regular text-grey-darken-2">
        Creating Stocks, please wait...
      </h3>
      <v-progress-linear
        :model-value="stockCreateProgress"
        height="20"
        striped
        color="amber-accent-4"
        >{{ stockCreateProgress.toFixed(1) }}%</v-progress-linear
      >
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import { minValue, required } from "@vuelidate/validators";
import { showError } from "../composables/utils";
import useVuelidate from "@vuelidate/core";
import { ref } from "vue";
import categoryStore from "../store/category";
import { storeToRefs } from "pinia";
const number = ref();
const $rules = { number: { required, min: minValue(1) } };
const $v = useVuelidate($rules, { number });
const props = defineProps(["showProduct", "product"]);
const emits = defineEmits(["update:showProduct"]);
const $category = categoryStore();
const { stockCreateProgress } = storeToRefs(categoryStore());
const persistent = ref(true);
const createStock = () => {
  persistent.value = true;
};
const close = () => {
  if (persistent.value) {
    return;
  }
  emits("update:showProduct", false);
};
</script>

<style scoped></style>
