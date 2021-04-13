<template>
  <v-card>
    <v-card-title>
      Logs
      <v-spacer></v-spacer>
      <v-text-field
        v-model="search"
        label="Search"
        single-line
        hide-details
      ></v-text-field>
    </v-card-title>
    <v-data-table
      :headers="headers"
      :items="tableData"
      :search="search"
    >
      <template v-slot:items="props">
        <td>{{ props.item.date }}</td>
        <td class="text-xs-right">{{ props.item.type }}</td>
        <td class="text-xs-right">{{ props.item.message }}</td>
      </template>
      <template v-slot:no-results>
        <v-alert :value="true" color="error" icon="warning">
          Your search for "{{ search }}" found no results.
        </v-alert>
      </template>
    </v-data-table>
  </v-card>
</template>

<script lang="ts">
import Vue from "vue";
import ServiceApi from "@/api/serviceApi";

export default Vue.extend({
  name: "LogGrid",

  data: () => {
    return {
      tableData: [],
      headers: [],
      search: ""
    };
  },

  methods: {
    async fetchSample() {
      const data = await ServiceApi.makeSampleCall().then(resp => resp.json());
      this.headers = data.headers;
      this.tableData = data.tableData;
    }
  },

  async beforeMount() {
    try {
      await this.fetchSample();
    } catch (e) {
      // not logged in or other issue
      console.error(e);
    }
  }
});
</script>
