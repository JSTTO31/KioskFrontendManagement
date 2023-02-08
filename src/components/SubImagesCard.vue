<template>
  <v-col cols="2" class="mx-2" v-for="(image, index) in fileItems">
    <SubImagesItem
      @update="($event) => updateItem($event, index)"
      @remove="($event) => removeItem(index)"
      :image="image"
      :key="image.name"
    ></SubImagesItem>
  </v-col>
  <v-col cols="2" class="mx-2">
    <v-card
      @click="showDialog"
      id="image-container"
      height="150"
      width="150"
      class="d-flex align-center justify-center flex-column bg-transparent"
      flat
      v-if="images.length + number < 8"
    >
      <v-icon color="amber-darken-4" size="45" dense>mdi-image</v-icon>
      <span class="text-amber-darken-4">Add sub image </span>
      <span class="text-amber-darken-4">({{ images.length + number }}/8)</span>
    </v-card>
  </v-col>
  <input
    id="file"
    type="file"
    @change="setImage"
    hidden
    ref="file"
    accept=".png"
    multiple
  />
</template>

<script setup lang="ts">
import SubImagesItem from "./SubImagesItem.vue";
import { ref, Ref, watchEffect } from "vue";
const props = defineProps({
  images: {
    type: Array,
    required: true,
  },
  number: { default: 0 },
});
const emits = defineEmits(["update:images"]);
const file = ref();
const fileItems: any = ref([]);
const showDialog = () => {
  file.value.click();
};
const setImage = (e: any) => {
  if (e.target.files.length > 0) {
    fileItems.value.push(...e.target.files);
    if (fileItems.value.length + props.number > 8) {
      fileItems.value.splice(8 - props.number);
      // console.log(props);
    }
    //@ts-ignore
    document.getElementById("file").value = "";
    emits("update:images", fileItems.value);
  }
};
const removeItem = (index: number) => {
  fileItems.value.splice(index, 1);
  emits("update:images", fileItems.value);
};
const updateItem = (file: Object, index: number) => {
  fileItems.value.splice(index, 1, file);
  emits("update:images", fileItems.value);
};
</script>

<style scoped>
#image-container {
  border: 2px dashed #ff6f00;
}
#remove {
  position: absolute;
  top: 0;
  right: 0;
  z-index: 10000;
}
</style>
