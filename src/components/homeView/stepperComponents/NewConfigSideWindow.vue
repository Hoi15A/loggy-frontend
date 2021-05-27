<template>
  <div class="text-center">
    <v-menu v-model="menu" :close-on-content-click="false" :nudge-width="300" offset-x>
      <template v-slot:activator="{ on, attrs }">
        <v-btn color="primary" dark v-bind="attrs" v-on="on">
          <v-icon color="white">mdi-plus</v-icon>
        </v-btn>
      </template>
      <v-card>
        <v-card-title class="headline">
          Add new Config
        </v-card-title>

        <v-row>
          <v-col>
            <v-textarea class="ma-1" rows="3" outlined name="input-7-4" label="Config JSON" v-model="newConfigJson"/>
          </v-col>
        </v-row>
        <v-card-actions>
          <v-spacer/>
          <v-btn color="primary" text v-on:click="onSave()">
            Save
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-menu>
  </div>
</template>

<script lang="ts">
import serviceApi from "@/api/serviceApi";
import Vue from "vue";
import {Component} from "vue-property-decorator";

@Component
export default class NewConfigSideWindow extends Vue {
  newConfigJson = `
    {
    name: Test,
    columnCount: 5,
    headerLength: 0,
    separator: " "
    }
  `;
  menu = false;

  onSave() {
    serviceApi.addNewConfig(this.newConfigJson)
      .catch(err => (console.log(err)));
    this.$emit("newConfigSuccess");
    this.menu = false;
  }
}
</script>

<style scoped>

</style>
