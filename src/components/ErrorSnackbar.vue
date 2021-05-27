<template>
  <div class="text-center">
    <v-snackbar
        v-model="snackbar"
        :timeout="timeout"
    >
      {{ errorMessage }}

      <template v-slot:action="{ attrs }">
        <v-btn
            color="blue"
            text
            v-bind="attrs"
            @click="snackbar = false"
        >
          Close
        </v-btn>
      </template>
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
  timeout = 2000;

}

</script>