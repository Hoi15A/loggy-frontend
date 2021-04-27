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
      <v-card-title> {{ titleMessage }}</v-card-title>
      <v-card-actions>
        <v-btn
            text
            rounded
            color="red"
            width="150"
            v-on:click="onClickNo()"
        >
          No
        </v-btn>
        <v-spacer/>
        <v-btn
            text
            rounded
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

export default Vue.extend({
  data: () => ({
    dialog: false,
  }),

  methods: {
    onClickNo() {
      this.dialog = false;
    },

    onClickYes() {
      this.dialog = false;
      this.$emit("confirmCancel");
    },
  },

  props: {
    buttonName: {
      type: String,
    },
    titleMessage: {
      type: String,
    },
  },
});
</script>

<style scoped>

</style>