<template>
  <DateFilter v-bind:id="'column1'"/>
</template>

<script lang="ts">
import Vue from "vue";
import DateFilter from "@/components/serverView/filterInput/DateFilter.vue";
import { ColumnDefinition } from "@/models/columnDefinition";

export default Vue.extend({
  name: "Test",

  components: {
    DateFilter
  },

  data: () => ({
    columnDefinitions: [] as ColumnDefinition[],
    rowData: null,
  }),

  beforeMount() {
    this.columnDefinitions = [
      {headerName: "Make", field: "make", resizable: true, sortable: true, filter: true},
      {headerName: "Model", field: "model", resizable: true, sortable: true, filter: true},
      {headerName: "Price", field: "price", resizable: true, sortable: true, filter: true}
    ];

    fetch("https://www.ag-grid.com/example-assets/row-data.json")
      .then(result => result.json())
      .then(rowData => this.rowData = rowData);
  },

});
</script>
