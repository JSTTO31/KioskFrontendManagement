<template>
  <div
    style="width: 150px; height: 150px; position: relative; cursor: pointer"
    class="border bg-transparent align-center justify-center"
    flat
    v-ripple
    @click="showDialog"
  >
    <v-img :src="url"></v-img>
    <v-btn
      id="remove"
      icon="mdi-close"
      size="x-small"
      class="mt-n4 mr-n4"
      color="grey-lighten-2"
      @click.stop="emits('remove')"
    ></v-btn>
  </div>
  <input id="file" type="file" @change="changeImage" ref="file" hidden accept=".png" />
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
const props = defineProps(["image"]);
const emits = defineEmits(["remove", "update"]);
const file = ref();
const url = ref();
const showDialog = () => {
  file.value.click();
};

const changeImage = (e: any) => {
  if (e.target.files.length > 0) {
    const file = e.target.files[0];
    const reader = new FileReader();
    emits("update", file);
    reader.onload = () => {
      url.value = reader.result;
    };

    reader.readAsDataURL(file);
  }
};

const removeImage = () => {};

onMounted(() => {
  const reader = new FileReader();
  reader.onload = () => {
    url.value = reader.result;
  };

  reader.readAsDataURL(props.image);
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
