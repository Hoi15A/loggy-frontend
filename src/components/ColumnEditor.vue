<template>
  <v-sheet width="800px">
    <v-simple-table fixed-header height="800px">
      <template v-slot:default>
        <thead>
        <tr>
          <th class="text-left" v-for="header in headers" :key="header.name">{{ header }}</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="item in columnCompObject" :key="item.id">
          <td>{{item.id}}</td>
          <td>{{item.columnType}}</td>
          <td>{{item.format}}</td>
          <td>{{item.name}}</td>
        </tr>
        </tbody>
      </template>
    </v-simple-table>
  </v-sheet>
</template>

<script lang="ts">
import Vue from "vue";
import ColumnCompApi from "@/api/columnCompApi";


export default Vue.extend({
  name: "ColumnEditor",
  data () {
    return {
      headers: [] as string[],
      columnCompObject: {} as string[],
    };
  },
  methods: {
    fetchAllColumns: async function () {
      this.columnCompObject = await ColumnCompApi.fetchAllColumnComponents();
      for (let i = 0; i < Object.keys(this.columnCompObject[0]).length; i++) {
        this.headers.push(Object.keys(this.columnCompObject[0])[i]);
      }
    },
  },
  beforeMount: async function() {
    try {
      await this.fetchAllColumns();
    }
    catch (e) {
      console.error(e);
    }
  }
});
</script>
