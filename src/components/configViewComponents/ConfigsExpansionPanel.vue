<template>
  <v-row>
    <v-expansion-panels popout>
      <v-expansion-panel v-for="(config) in configArray" v-bind:key="config.name">
        <v-expansion-panel-header>
          {{ config.name}}
        </v-expansion-panel-header>
        <v-expansion-panel-content>
          <ConfigEditor>
          </ConfigEditor>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
  </v-row>
</template>



<script lang="ts">

import Vue from "vue";
import {Config} from "@/models/Config";
import ServiceApi from "@/api/serviceApi";
import ConfigEditor from "@/components/ConfigEditor.vue";

export default Vue.extend( {
  name: "ConfigsExpansionPanel",
  data: () => {
    return {
      configArray: [] as Config[],
    };
  },

  components: {
    ConfigEditor
  },

  methods: {

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