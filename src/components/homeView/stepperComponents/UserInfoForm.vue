<template>
  <v-form>
    <v-container>
      <v-row align="center">
        <v-col>
          <v-text-field counter label="Service Name" maxlength="30" v-model="setName"/>
        </v-col>
        <v-col>
          <v-text-field label="Icon Link" maxlength="200" v-model="setImage"/>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-textarea counter maxlength="200" no-resize rows="3" outlined name="input-7-4" label="Description" :value="setDescription"/>
        </v-col>
      </v-row>
    </v-container>
  </v-form>
</template>

<script lang="ts">
import Vue from "vue";
import {Component} from "vue-property-decorator";
import {Server} from "@/models/server";

@Component
export default class UserInfoForm extends Vue {

  set setDescription(value: string) {
    const server = this.$store.getters["stepper/getServer"] as Server;
    server["description"] = value;
    this.$store.commit("stepper/setServer", server);
  }

  set setName(value: string) {
    const server = this.$store.getters["stepper/getServer"] as Server;
    server["name"] = value;
    this.$store.commit("stepper/setServer", server);
  }

  set setImage(value: string) {
    const server = this.$store.getters["stepper/getServer"] as Server;
    server["image"] = value;
    this.$store.commit("stepper/setServer", server);
  }
}
</script>

<style scoped>

</style>