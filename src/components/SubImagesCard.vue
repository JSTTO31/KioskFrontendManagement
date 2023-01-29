<template>
  <v-row>
    <div class="mr-3" v-for="(image, index) in fileItems">
      <v-col cols="4">
        <SubImagesItem
          @update="($event) => updateItem($event, index)"
          @remove="($event) => removeItem(index)"
          :image="image"
          :key="image.name"
        ></SubImagesItem>
      </v-col>
    </div>
    <v-col cols="4">
      <v-card
        @click="showDialog"
        id="image-container"
        height="150"
        width="150"
        class="d-flex align-center justify-center bg-transparent"
        flat
      >
        <v-icon color="amber-darken-4" size="45" dense>mdi-plus</v-icon>
      </v-card>
    </v-col>
  </v-row>

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
import { ref, Ref, watch } from "vue";
const props = defineProps(["images"]);
const emits = defineEmits(["update:images"]);
const file = ref();
const fileItems: any = ref([]);
const showDialog = () => {
  file.value.click();
};
const setImage = (e: any) => {
  if (e.target.files.length > 0) {
    fileItems.value.push(...e.target.files);
    //@ts-ignore
    document.getElementById("file").value = "";
  }
};
const removeItem = (index: number) => {
  console.log(index);

  fileItems.value.splice(index, 1);
  console.log(fileItems.value);
};
const updateItem = (file: Object, index: number) => {
  fileItems.value.splice(index, 1, file);
};

watch(fileItems.value, () => {
  emits("update:images", fileItems.value);
});
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
