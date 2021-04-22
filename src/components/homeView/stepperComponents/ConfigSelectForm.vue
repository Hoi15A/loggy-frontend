<template>
  <v-form>
    <v-container>
      <v-row>
        <v-select id="selectConfig" :items="items" label="Config" v-model="config"/>
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

export default Vue.extend({
  components: {
    NewConfigSideWindow,
  },

  data: () => ({
    items: [] as string[],
    cardVisible: false,
    config: "",
  }),

  methods: {
    async loadConfigs() {
      const fetchedConfigs = await ServiceApi.fetchConfigs();
      fetchedConfigs.forEach(config => this.items.push(config.name));
    },

    onOpenCard() {
      this.cardVisible = true;
    },
  },
});
</script>

<style scoped>

</style>
