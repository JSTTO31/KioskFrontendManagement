<template>
  <v-card class="h-100 rounded-lg px-8 py-5">
    <h1>Overrall</h1>
    <div>
      <v-img
        src="https://www.tibco.com/sites/tibco/files/media_entity/2022-01/doughnut-chart-example.svg"
      ></v-img>
      <v-row>
        <v-col cols="6" class="px-0">
          <v-card class="rounded-lg d-flex align-start mx-n3 h-100" flat>
            <template #prepend>
              <v-card color="success" variant="tonal" class="rounded-lg pa-4">
                <v-icon class="rounded-0" size="35"> mdi-check </v-icon>
              </v-card>
            </template>
            <template #title><h5 class="font-weight-medium">Completed</h5></template>
            <template #subtitle><h3 class="text-h4 font-weight-black">523</h3></template>
          </v-card>
        </v-col>
        <v-col cols="6" class="px-0">
          <v-card class="rounded-lg d-flex align-start mx-n3 h-100" flat>
            <template #prepend>
              <v-card color="warning" variant="tonal" class="rounded-lg pa-4">
                <v-icon class="rounded-0" size="35"> mdi-reload </v-icon>
              </v-card>
            </template>
            <template #title><h5 class="font-weight-medium">Pending</h5></template>
            <template #subtitle><h3 class="text-h4 font-weight-black">523</h3></template>
          </v-card>
        </v-col>
        <v-col cols="6" class="px-0">
          <v-card class="rounded-lg d-flex align-start mx-n3 h-100" flat>
            <template #prepend>
              <v-card color="primary" variant="tonal" class="rounded-lg pa-4">
                <v-icon class="rounded-0" size="35"> mdi-account-hard-hat </v-icon>
              </v-card>
            </template>
            <template #title><h5 class="font-weight-medium">Working</h5></template>
            <template #subtitle><h3 class="text-h4 font-weight-black">523</h3></template>
          </v-card>
        </v-col>
        <v-col cols="6" class="px-0">
          <v-card class="rounded-lg d-flex align-start mx-n3 h-100" flat>
            <template #prepend>
              <v-card color="error" variant="tonal" class="rounded-lg pa-4">
                <v-icon class="rounded-0" size="35"> mdi-cancel </v-icon>
              </v-card>
            </template>
            <template #title><h5 class="font-weight-medium">Cancelled</h5></template>
            <template #subtitle><h3 class="text-h4 font-weight-black">523</h3></template>
          </v-card>
        </v-col>
      </v-row>
    </div>
  </v-card>
</template>

<script setup lang="ts"></script>

<style scoped></style>
