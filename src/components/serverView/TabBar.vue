<template>
  <v-card elevation="0" max-width="100%">
    <v-tabs v-model="model" background-color="grey" center-active dark>
      <v-tab v-for="tab in tabs" :key="tab">
        {{ tab }}
        <v-icon dense color="white" @click="closeTab($event)" right>
          mdi-close
        </v-icon>
      </v-tab>
      <v-spacer/>
      <v-btn @click="openTab($route.params.serverId)" class="mx-2 align-right" fab x-small dark color="black">
        <v-icon centerd dense color="white">
          mdi-plus
        </v-icon>
      </v-btn>
    </v-tabs>
    <v-tabs-items v-model="model">
      <v-tab-item v-for="tab in tabs" :key="tab">
        <template>
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
                  v-for="item in components"
                  :key="item.id"
                >
                  <td>{{ item.name }}</td>
                  <td>
                    <v-select
                      label="FilterType"
                      :items="getFilterTypes(item)"
                      v-model="selectedFilters[item.id]"
                    >
                    </v-select>
                  </td>
                  <td id="componentField">
                    <DateFilterInput v-bind:id="item.id.toString()" v-if="selectedFilters[item.id] === 'DATE'" />
                    <RangeFilterInput v-bind:id="item.id.toString()" v-if="selectedFilters[item.id] === 'RANGE'" />
                    <SingleFilterInput v-bind:id="item.id.toString()" v-bind:label="item.name" v-if="selectedFilters[item.id] === 'EXACT' || selectedFilters[item.id] === 'CONTAINS' || selectedFilters[item.id] === 'REGEX'" />
                  </td>
                </tr>
              </tbody>
            </template>
          </v-simple-table>
          <v-btn
            depressed
            color="primary"
            @click="query()"
          >
            Query
          </v-btn>
        </template>
      </v-tab-item>
    </v-tabs-items>
  </v-card>
</template>

<script lang="ts">
import Vue from "vue";
import AgGrid from "@/components/serverView/LogGrid.vue";
import DateFilterInput from "@/components/serverView/filterInput/DateFilterInput.vue";
import RangeFilterInput from "@/components/serverView/filterInput/RangeFilterInput.vue";
import SingleFilterInput from "@/components/serverView/filterInput/SingleFilterInput.vue";
import {Component} from "vue-property-decorator";
import { ColumnComponent } from "@/models/columnComponent";
import "vue-class-component/hooks";
import ConfigApi from "@/api/configApi";
import { Server } from "@/models/server";
import { Config } from "@/models/config";
import { FilterType } from "@/models/filterType";
import ServiceApi from "@/api/serviceApi";
import { getModule } from "vuex-module-decorators";
import HomeServicesStore from "@/store/modules/homeServices";
import QueryStore from "@/store/modules/query";
import QueryApi from "@/api/queryApi";

@Component({
  components: {
    AgGrid,
    DateFilterInput,
    RangeFilterInput,
    SingleFilterInput
  },
})
export default class TabBar extends Vue {
  homeServices = getModule(HomeServicesStore)
  queryStore = getModule(QueryStore);

  tabs = [] as string[];
  tabCount = 1 as number;
  model = "tab";
  headers = [
    "Column Components",
    "Query Criteria",
    "Query"
  ];
  components = [] as ColumnComponent[];
  selectedFilters: {[key: number]: string} = {};
  openTab(serverId: number) {
    this.tabs.push(`Query ${this.tabCount++}`);
  }

  closeTab(closeEvent: any) {
    this.tabs.splice(this.tabs.indexOf(closeEvent.target.parentElement.textContent.trim()), 1);
  }

  getFilterTypes(item: ColumnComponent) {
    return item.filterTypes.map(filterType => FilterType[filterType]);
  }

  query() {
    const queries = [];
    for (const id of Object.keys(this.selectedFilters)) {
      let queryItem = {"id": id, "filterType": this.selectedFilters[parseInt(id)]};

      if (queryItem.filterType === "RANGE" || queryItem.filterType === "DATE") {
        const range = this.queryStore.getQuery(id);
        queryItem = Object.assign(queryItem, {"from": range[0], "to": range[1]});
      } else if (queryItem.filterType !== "") {
        queryItem = Object.assign(queryItem, {[this.selectedFilters[parseInt(id)].toLowerCase()]: this.queryStore.getQuery(id)});
      }
      queries.push(queryItem); 
    }
    QueryApi.query(parseInt(this.$route.params.serverId)).catch(err => console.log(err));
  }

  /*
    This is only a mock delete when filter type is provided by config
  */
  async beforeMount() {
    const id = parseInt(this.$route.params.serverId);    
    let service = {} as Server;
    
    if (this.homeServices.isEmpty) {
      service = await ServiceApi.fetchServerById(id);
    } else {
      service = this.homeServices.getServerById(id);
      this.homeServices.setServers(await ServiceApi.fetchServers());
    }

    const config = await ConfigApi.fetchConfigById(service.logConfig) as Config;

    for (const c of Object.values(config.columnComponents)) {
      c.filterTypes = [];
      for (let i = 0; i < Math.floor(Math.random() * 5) + 1; i++) {
        c.filterTypes.push(Math.floor(Math.random() * 4));
      }
      this.components.push(c);
    }
  }
}
</script>

<style>
.align-right {
  margin: 8px;
  float: right;
}
</style>
