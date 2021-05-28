<template>
  <div>
    <template v-if="showQueryOptions">
      <v-simple-table>
        <template v-slot:default>
          <thead>
          <tr>
            <th class="text-left" v-for="header in headers" :key="header">
              {{ header }}
            </th>
          </tr>
          </thead>
          <tbody>
          <tr
              v-for="item in columnComponents"
              :key="item.id">
              <td>{{ item.name }}</td>
              <td>
                <v-select
                    label="FilterType"
                    :items="item.filterTypes"
                    v-model="selectedFilters[item.id]"/>
              </td>
              <td id="componentField">
                <template v-if="!selectedFilters[item.id]">
                  <SingleFilterInput
                      v-bind:id="item.id.toString()"
                      v-bind:label="'Please select a filter type'"
                      v-bind:query="queryItems"
                      v-bind:disabled="true"
                      v-bind:filterType="selectedFilters[item.id]"/>
                </template>
                <template v-else>
                  <ExactDateFilterInput
                      v-bind:id="item.id.toString()"
                      v-bind:query="queryItems"
                      v-if="item.columnType === 'DATE' && selectedFilters[item.id] === 'EXACT'"/>
                  <RangeDateFilterInput
                      v-bind:id="item.id.toString()"
                      v-bind:query="queryItems"
                      v-if="item.columnType === 'DATE' && selectedFilters[item.id] === 'RANGE'"/>
                  <RangeFilterInput
                      v-bind:id="item.id.toString()"
                      v-bind:query="queryItems"
                      v-if="item.columnType !== 'DATE' && selectedFilters[item.id] === 'RANGE'"/>
                  <SingleFilterInput
                      v-bind:id="item.id.toString()"
                      v-bind:label="item.name"
                      v-bind:query="queryItems"
                      v-bind:filterType="selectedFilters[item.id]"
                      v-bind:disabled="false"
                      v-if="item.columnType !== 'DATE' && selectedFilters[item.id] !== 'RANGE'"/>
                </template>
              </td>
            </tr>
          </tbody>
        </template>
      </v-simple-table>
      <div class="button">
        <v-btn
            depressed
            color="primary"
            @click="query()">Query</v-btn>
      </div>
    </template>
    <template v-else>
      <div class="ag-theme-material">
        <AgGridVue
            style="width: 100%; height: 900px;"
            ag-theme-material
            :columnDefs="getColumnDefs()"
            :rowData="rowData"
            :gridOptions="gridOptions"/>
      </div>
    </template>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import {AgGridVue} from "ag-grid-vue";
import { Component, Prop } from "vue-property-decorator";
import ExactDateFilterInput from "@/components/serverView/filterInput/ExactDateFilterInput.vue";
import RangeFilterInput from "@/components/serverView/filterInput/RangeFilterInput.vue";
import RangeDateFilterInput from "@/components/serverView/filterInput/RangeDateFilterInput.vue";
import SingleFilterInput from "@/components/serverView/filterInput/SingleFilterInput.vue";
import { ColumnComponent } from "@/models/columnComponent";
import QueryApi from "@/api/queryApi";
import { QueryComponent } from "@/models/queryComponent";

interface QueryResponse {
  [key: number]: string[];
}


interface StringMap {
  [key: string]: string;
}

@Component({
  components: {
    AgGridVue,
    ExactDateFilterInput,
    RangeFilterInput,
    RangeDateFilterInput,
    SingleFilterInput
  },
})
export default class TabItem extends Vue {
  @Prop(Array) columnComponents!: ColumnComponent[]

  queryItems = new Map<string, QueryComponent>();
  selectedFilters: {[key: number]: string} = {};

  rowData = [] as StringMap[];
  showQueryOptions = true;
  gridOptions = {};

  headers = [
    "Column",
    "Filter Type",
    "Query"
  ];

  query() {
    QueryApi.query(parseInt(this.$route.params.serverId), this.queryItems)
      .then((response: QueryResponse) => this.transformToRowData(response))
      .catch(err => console.log(err));
    this.showQueryOptions = false;
  }

  transformToRowData(response: QueryResponse) {
    const columns = this.getColumnDefs().map(column => column.field);
    for (const entry in response) {
      const data = {} as StringMap;
      for (let i = 0; i < columns.length; i++) {
        data[columns[i]] = response[entry][i];
      }
      this.rowData.push(data);
    }
  }

  getColumnDefs() {
    const defs = [];
    for (const component of this.columnComponents) {
      defs.push({"field": component.name});
    }
    return defs;
  }
}
</script>

<style scoped>
.button {
  padding: 1rem;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
}
</style>
