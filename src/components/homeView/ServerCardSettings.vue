<template>
  <v-row justify="center">
    <v-dialog v-model="settingsCardOpen" width="1200px">
      <template v-slot:activator="{ on, attrs }">
        <v-btn color="primary" rounded text small elevation="0" v-bind="attrs" v-on="on">Settings</v-btn>
      </template>
      <v-card>
        <v-card-title>
          <span class="headline">Server Settings</span>
        </v-card-title>
        <v-card-text>{{ "Logdirectory from db: " + logDirectory }}</v-card-text>
        <br>
        <v-card-text>{{ "logconfig from db: " + logConfig }}</v-card-text>
        <br>
        <v-card-text>{{ "location from db: " + logServiceLocation }}</v-card-text>
        <br>
        <v-card-actions>
          <v-spacer/>
          <v-btn color="primary" text rounded @click="closeCard">Close</v-btn>
          <v-btn color="primary" text rounded @click="closeCard">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  data: () => ({
    settingsCardOpen: false,
  }),

  methods: {
    closeCard() {
      this.settingsCardOpen = false;
    },
  },

  props: {
    openServiceSettings: {
      type: Boolean,
    },
    logDirectory: {
      type: String,
    },
    logServiceLocation: {
      type: String,
    },
    logConfig: {
      type: String,
    },
  },
});
</script>

<style scoped>

</style>