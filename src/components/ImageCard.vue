<template>
  <v-card
    v-if="!url.length"
    @click="showDialog"
    id="image-container"
    height="150"
    width="150"
    class="d-flex align-center justify-center bg-transparent"
    flat
  >
    <v-icon color="amber-darken-4" size="45" dense>mdi-plus</v-icon>
  </v-card>
  <v-hover v-else v-slot="{ props, isHovering }">
    <div
      v-bind="props"
      style="width: 150px; height: 150px; position: relative"
      class="border bg-transparent align-center justify-center"
      flat
      @click="showDialog"
    >
      <v-img :src="url"></v-img>
      <v-btn
        v-if="!persistent || (beforeUrl.length > 0 && beforeUrl != url)"
        id="remove"
        icon="mdi-close"
        size="x-small"
        class="mt-n4 mr-n4"
        color="grey-lighten-2"
        @click.stop="removeImage"
      ></v-btn>
      <v-card color="grey-darken-1" id="footer" class="w-100 rounded-0">
        <h4 class="text-center font-weight-medium">Main</h4>
      </v-card>
    </div>
  </v-hover>

  <input id="file" type="file" @change="setImage" hidden ref="file" accept=".png" />
</template>

<script setup lang="ts">
import { ref } from "vue";
const props = defineProps({
  image: {},
  url: { default: "", type: String },
  persistent: { default: false },
});
const beforeUrl = props.url;
const emits = defineEmits(["update:image", "remove", "update"]);
const url = ref(props.url);
const file = ref();
const showDialog = () => {
  file.value.click();
};
const setImage = (e: any) => {
  if (e.target.files.length > 0) {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = () => {
      //@ts-ignore
      url.value = reader.result;
      emits("update:image", file);
    };

    reader.readAsDataURL(file);
    //@ts-ignore
    document.getElementById("file").value = "";

    emits("update");
  }
};
const removeImage = () => {
  emits("update:image", "");
  url.value = beforeUrl;

  emits("remove");
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
#footer {
  position: absolute;
  bottom: 0;
}
</style>
