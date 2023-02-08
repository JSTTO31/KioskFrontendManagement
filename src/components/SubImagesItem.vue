<template>
  <v-hover v-slot="{ isHovering, props }">
    <div
      v-bind="props"
      style="
        width: 150px;
        height: 150px;
        position: relative;
        cursor: move;
        position: relative;
      "
      class="border bg-transparent align-center flex-column justify-center"
      flat
    >
      <v-img :src="url"></v-img>
      <v-card v-if="isHovering" flat class="w-100 rounded-0 d-flex" id="action">
        <v-btn
          @click.stop="showDialog"
          flat
          size="small"
          color="amber-darken-4"
          class="rounded-0 w-50"
          >edit</v-btn
        >
        <v-btn
          @click.stop="emits('remove')"
          flat
          size="small"
          color="amber-darken-4"
          class="rounded-0 w-50"
          >Delete</v-btn
        >
      </v-card>
    </div>
  </v-hover>
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
  if (props.image instanceof File) {
    const reader = new FileReader();
    console.log("triggered");

    reader.onload = () => {
      url.value = reader.result;
    };

    reader.readAsDataURL(props.image);
  } else {
    url.value = props.image;
  }
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
#action {
  position: absolute;
  bottom: 0;
}
</style>
