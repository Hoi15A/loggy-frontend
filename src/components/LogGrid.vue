<template>
  <v-card>
    <TabBar/>
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
import TabBar from "@/components/TabBar.vue";
import {Api} from "@/api/api";

export default Vue.extend({
  name: "LogGrid",
  components: {
    TabBar
  },
  data: () => {
    return {
      tableData: [],
      headers: [],
      search: ""
    };
  },
  methods: {
    fetchSample: async function () {
      const data: string[] = await Api.makeSampleCall().then(resp => resp.json());
      this.headers = data.headers;
      this.tableData= data.tableData;
      // this.headers = [
      //   {text: "Date", value: "date"},
      //   {text: "Type", value: "type"},
      //   {text: "Message", value: "message"}
      // ];
      // this.tableData = [
      //   {
      //     date: "01.03.2021",
      //     type: "info",
      //     message: "Service started"
      //   },
      //   {
      //     date: "02.03.2021",
      //     type: "warning",
      //     message: "Could not interpret xyz"
      //   },
      //   {
      //     date: "03.03.2021",
      //     type: "error",
      //     message: "FileNotFound test.txt"
      //   }
      // ];
    }
  },
  beforeMount: async function () {
    try {
      await this.fetchSample();
    } catch (e) {
      // not logged in or other issue
      console.error(e);
    }
  }
});
</script>
