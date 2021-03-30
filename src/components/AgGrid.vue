<template>
  <ag-grid-vue style="width: 100%; height: 900px;"
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

export default Vue.extend({
  name: "AgGrid",
  data: () => {
    return {
      columnDefs: [] as any,
      rowData: null,
      rowStyle: [] as any,
    };
  },
  components: {
    AgGridVue
  },
  beforeMount() {
    this.columnDefs = [
      {headerName: "Make", field: "make", resizable: true, sortable: true, filter: true },
      {headerName: "Model", field: "model", resizable: true, sortable: true, filter: true },
      {headerName: "Price", field: "price", resizable: true, sortable: true, filter: true }
    ];
    //https://www.ag-grid.com/example-assets/row-data.json
    //https://www.ag-grid.com/example-assets/small-row-data.json
    fetch("https://www.ag-grid.com/example-assets/row-data.json")
        .then(result => result.json())
        .then(rowData => this.rowData = rowData);
  },

});
</script>