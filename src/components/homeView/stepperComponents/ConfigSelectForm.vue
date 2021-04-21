<template>
  <v-form>
    <v-container>
      <v-row>
        <v-select :items="items" label="Config" v-model="selectedConfig"/>
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
import Component from "vue-class-component";

@Component({
  components: {
    NewConfigSideWindow,
  },
})
export default class ConfigSelectForm extends Vue {
  items = [] as string[];
  cardVisible = false;
  selectedConfig = undefined;

  async loadConfigs() {
    const fetchedConfigs = await ServiceApi.fetchConfigs();
    fetchedConfigs.forEach(config => this.items.push(config.name));
  }

  onOpenCard() {
    this.cardVisible = true;
  }
}
</script>

<style scoped>

</style>
