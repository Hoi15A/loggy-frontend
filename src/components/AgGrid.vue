<template>
  <ag-grid-vue style="width: 100%; height: 900px;"
               class="ag-theme-material"
               :columnDefs="columnDefs"
               :rowData="rowData"
               rowSelection="multiple"
               pagination="true"
               enableRangeSelection="true"/>
</template>

<script lang="ts">
import Vue from "vue";
import {AgGridVue} from "ag-grid-vue";
import LogApi from "@/api/logApi";

export default Vue.extend({
  name: "AgGrid",

  components: {
    AgGridVue,
  },

  data: () => ({
    columnDefs: [] as any,
    rowData: null,
    rowStyle: [] as any,
  }),

  methods: {
    async fetchFile(id: number) {
      await LogApi.fetchFileByServiceId(id)
        .then(res => res.json())
        .then(rowData => this.rowData = rowData);
    },
  },

  async beforeMount() {
    try {
      await this.fetchFile(75);
    } catch (e) {
      console.error(e);
    }

    this.columnDefs = [
      //will be replaced when proper headers are sent
      {headerName: "1", field: "0", resizable: true, sortable: true, filter: true},
      {headerName: "2", field: "1", resizable: true, sortable: true, filter: true},
      {headerName: "3", field: "2", resizable: true, sortable: true, filter: true},
      {headerName: "4", field: "3", resizable: true, sortable: true, filter: true},
      {headerName: "5", field: "4", resizable: true, sortable: true, filter: true},
      {headerName: "6", field: "5", resizable: true, sortable: true, filter: true},
      {headerName: "7", field: "6", resizable: true, sortable: true, filter: true},
      {headerName: "8", field: "7", resizable: true, sortable: true, filter: true},
      {headerName: "9", field: "8", resizable: true, sortable: true, filter: true},
    ];
  },
});
</script>