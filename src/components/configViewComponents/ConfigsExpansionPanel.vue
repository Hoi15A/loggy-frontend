<template>
  <v-expansion-panels popout focusable multiple>
    <v-expansion-panel v-for="(config) in configArray" v-bind:key="config.name">
      <v-expansion-panel-header class="font-weight-medium" align="center">
        {{ config.name}}
      </v-expansion-panel-header>
      <v-expansion-panel-content>
        <v-toolbar flat>
          <v-spacer/>
          <v-icon class ="mr-2" @click="editConfigDialog = true">mdi-pencil </v-icon>
          <v-icon @click="deleteConfig()">mdi-delete</v-icon>
          <v-dialog v-model="editConfigDialog" v-bind:config="config">
            <v-card>
              <v-card-title>
                Edit Configuration: {{ config.name }}
              </v-card-title>
              <template>
                <ConfigEditor/>
              </template>
            </v-card>
          </v-dialog>
        </v-toolbar>
        <ConfigColoumTestComponent/>
      </v-expansion-panel-content>
    </v-expansion-panel>
  </v-expansion-panels>

</template>



<script lang="ts">

import Vue from "vue";
import {Config} from "@/models/config";
import ConfigApi from "@/api/configApi";
import ConfigColoumTestComponent from "@/components/configViewComponents/ConfigColoumTestComponent.vue";
import ConfigEditor from "@/components/configViewComponents/ConfigEditor.vue";

export default Vue.extend( {

  name: "ConfigsExpansionPanel",

  data: () => {
    return {
      editConfigDialog: false as boolean,
      checkBoxEdit: false as boolean,
      configArray: [] as Config[],
    };
  },

  components: {
    ConfigColoumTestComponent,
    ConfigEditor
  },

  methods: {

    loadConfigs: async function() {
      const fetchedConfigs = await ConfigApi.fetchAllConfigs();
      this.configArray = [];
      for(let i = 0; i < fetchedConfigs.length; i++) {
        this.configArray.push(fetchedConfigs[i]);
      }
    },

    deleteConfig() {
      console.log("test");
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