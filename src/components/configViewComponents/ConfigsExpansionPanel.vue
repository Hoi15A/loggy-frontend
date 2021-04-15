<template>
  <v-expansion-panels popout focusable multiple>
    <v-expansion-panel v-for="(config) in configArray" v-bind:key="config.name">
      <v-expansion-panel-header class="font-weight-medium" align="center">
        {{ config.name}}
      </v-expansion-panel-header>
      <v-expansion-panel-content>
        <v-toolbar flat>
        </v-toolbar>
        <ConfigColoumTestComponent/>
      </v-expansion-panel-content>
    </v-expansion-panel>
  </v-expansion-panels>

</template>



<script lang="ts">

import Vue from "vue";
import {Config} from "@/models/Config";
import ServiceApi from "@/api/serviceApi";
import ConfigColoumTestComponent from "@/components/configViewComponents/ConfigColoumTestComponent.vue";

export default Vue.extend( {
  name: "ConfigsExpansionPanel",
  data: () => {
    return {
      checkBoxEdit: false as boolean,
      configArray: [] as Config[],
    };
  },

  components: {
    ConfigColoumTestComponent
  },

  methods: {
    test() {
      console.log("hallo");
    },

    loadConfigs: async function() {
      console.log("loading configs");
      const fetchedConfigs = await ServiceApi.fetchConfigs();
      this.configArray = [];
      for(let i = 0; i < fetchedConfigs.length; i++) {
        this.configArray.push(fetchedConfigs[i]);
      }
    },

  },

  beforeMount: async function() {
    try {
      await this.loadConfigs();
    } catch (e) {
      console.error(e);
    }
  }
});

</script>

<style scoped>

</style>