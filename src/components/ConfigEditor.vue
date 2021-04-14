<template>
  <div>
    <v-row>
      <v-col>
        <v-row v-for="(key, index) in configKeys" v-bind:key="index">
          <v-text-field :label="key"  v-model="configValues[index]"/>
        </v-row>
      </v-col>
      <v-btn v-on:click="createNewConfig()">
        Submit
      </v-btn>
      <v-btn v-on:click="addNewColumnComponent()">
        Add
      </v-btn>
    </v-row>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import configApi from "@/api/configApi";


export default Vue.extend({
  name: "ConfigEditor",

  data: () => ({
    configKeys: [] as any,
    configValues: [] as any,
    fetchedConfig: {} as any,
    updatedConfig: {} as any,
    updatedConfigJSON: "",
  }),

  methods: {
    async addNewColumnComponent() {
      return 1;
    },

    async createNewConfig() {
      this.configKeys.forEach((key: string, i: number) => this.updatedConfig[key] = this.configValues[i]);
      this.updatedConfigJSON = JSON.stringify(this.updatedConfig);
      console.log(this.updatedConfigJSON);
    },

    async parseFetchedConfig() {
      for(let i = 0; i < Object.values(this.fetchedConfig).length; i++) {
        this.configKeys.push(Object.keys(this.fetchedConfig)[i]);
        this.configValues.push(Object.values(this.fetchedConfig)[i]);
      }
    },

    async fetchConfigById(name: string) {
      this.fetchedConfig = await configApi.fetchConfigById(name);
      console.log(this.fetchedConfig);
    }
  },

  async beforeMount() {
    try {
      await this.fetchConfigById("Test");
      await this.parseFetchedConfig();
    } catch (e) {
      console.error(e);
    }
  },

});
</script>
