<template>
  <div class="text-center" @click="snackbar = false">
    <v-snackbar
        v-model="snackbar"
        :multi-line="multiLine"
        :timeout="timeout"
        color="red"
    >
      {{ errorMessage }}
    </v-snackbar>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import {Component, Prop} from "vue-property-decorator";

@Component
export default class ErrorSnackbar extends Vue {
  @Prop(Boolean) snackbar = false;
  @Prop(String) errorMessage!: string
  multiLine = true;
  timeout = 4000;

}

</script>