<template>
  <ag-grid-vue style="width: 100%; height: 940px;"
               class="ag-theme-material"
               :columnDefs="columnDefs"
               :rowData="rowData"
               rowSelection="multiple"
               pagination="true"
               enableRangeSelection=true
  >
  </ag-grid-vue>
</template>

<script lang="ts">
import Vue from "vue";
import { AgGridVue } from "ag-grid-vue";
import { ColumnDefinition } from "@/models/columnDefinition";

export default Vue.extend({
  name: "Test",

  components: {
    AgGridVue
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
