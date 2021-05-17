<template>
  <v-form>
    <v-container>
      <v-row>
        <v-select :items="items" label="Config" v-model="setConfigName"/>
        <v-spacer/>
        <NewConfigSideWindow v-on:newConfigSuccess="loadConfigs()"/>
      </v-row>
    </v-container>
  </v-form>
</template>

<script lang="ts">
import Vue from "vue";
import ServiceApi from "@/api/serviceApi";
import NewConfigSideWindow from "@/components/homeView/stepperComponents/NewConfigSideWindow.vue";
import {Component} from "vue-property-decorator";
import {Server} from "@/models/server";

@Component({
  components: {
    NewConfigSideWindow,
  },
})
export default class ConfigSelectForm extends Vue {
  items = [] as string[];
  cardVisible = false;

  async loadConfigs() {
    const fetchedConfigs = await ServiceApi.fetchConfigs();
    fetchedConfigs.forEach(config => this.items.push(config.name));
  }

  set setConfigName(value: string) {
    const server = this.$store.getters["stepper/getServer"] as Server;
    server["logConfig"] = value;
    this.$store.commit("stepper/setServer", server);
  }

  onOpenCard() {
    this.cardVisible = true;
  }
}
</script>

<style scoped>

</style>
