<template>
    <v-card>
      <v-toolbar flat>
        <v-checkbox v-model="checkBoxEdit" :label="'Edit'">
        </v-checkbox>
      </v-toolbar>
      <v-list dense>
        <v-list-item v-for="(item, i) in configKeys" :key="i">
          <v-list-item-content>
            <v-text-field :label="item"  v-model="configValues[i]" :readonly="!checkBoxEdit"/>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-card>
</template>

<script lang="ts">
import Vue from "vue";
import configApi from "@/api/configApi";


export default Vue.extend({
  name: "ConfigEditor",

  data: () => ({
    configKeys: [] as any,
    configValues: [] as any,
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

    async parseFetchedConfig(configJson: string) {
      for(let i = 0; i < Object.values(configJson).length; i++) {
        this.configKeys.push(Object.keys(configJson)[i]);
        this.configValues.push(Object.values(configJson)[i]);
      }
    },

    async fetchConfigById(name: string) {
      return await configApi.fetchConfigById(name);
    }
  },

  async beforeMount() {
    try {
      const configJson = await this.fetchConfigById("Apache");
      console.log(configJson);
      await this.parseFetchedConfig(configJson);
    } catch (e) {
      console.error(e);
    }
  },

});
</script>
