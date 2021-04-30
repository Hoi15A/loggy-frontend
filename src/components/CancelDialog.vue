<template>
  <v-dialog v-model="dialog"
            persistent
            max-width="380"
  >
    <template v-slot:activator="{ on, attrs }">
      <v-btn
          color="error"
          rounded
          small
          text
          v-bind="attrs"
          v-on="on"
      >
        {{ buttonName }}
      </v-btn>
    </template>
    <v-card>
      <v-card-title class="headline">
        {{ titleMessage }}
      </v-card-title>
      <v-card-text>
        {{ message }}
      </v-card-text>

      <v-divider></v-divider>
      <v-card-actions>
        <v-btn
            text
            rounded
            width="150"
            v-on:click="onClickNo()"
        >
          No
        </v-btn>
        <v-spacer/>
        <v-btn
            text
            rounded
            color="red"
            width="150"
            v-on:click="onClickYes()"
        >
          Yes
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import Vue from "vue";
import {Prop, Component} from "vue-property-decorator";

@Component
export default class CancelDialog extends Vue {
  @Prop(String) buttonName: string | undefined
  @Prop(String) titleMessage: string | undefined
  @Prop(String) message: string | undefined

  dialog = false;

  onClickNo() {
    this.dialog = false;
  }

  onClickYes() {
    this.dialog = false;
    this.$emit("confirmCancel");
  }
}
</script>