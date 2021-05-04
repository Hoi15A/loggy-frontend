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
                  :key="item.name"
                >
                  <td>{{ item.name }}</td>
                </tr>
              </tbody>
            </template>
          </v-simple-table>
        </template>
      </v-tab-item>
    </v-tabs-items>
  </v-card>
</template>

<script lang="ts">
import Vue from "vue";
import AgGrid from "@/components/serverView/LogGrid.vue";
import {Component} from "vue-property-decorator";
import { ColumnComponent } from "@/models/columnComponent";
import "vue-class-component/hooks";
import ConfigApi from "@/api/configApi";
import { Server } from "@/models/server";
import { Config } from "@/models/config";

@Component({
  components: {
    AgGrid
  },
})
export default class TabBar extends Vue {
  tabs = [] as string[];
  tabCount = 1 as number;
  model = "tab";
  headers = [
    "Column Components",
    "Query Type",
    "Query"
  ];
  components = [] as ColumnComponent[];

  openTab(serverId: number) {
    this.tabs.push(`Query ${this.tabCount++}`);
  }

  closeTab(closeEvent: any) {
    this.tabs.splice(this.tabs.indexOf(closeEvent.target.parentElement.textContent.trim()), 1);
  }

  beforeMount() {
    const id = this.$route.params.serverId;
    const service = this.$store.getters["homeServices/getServerById"](id) as Server;
    ConfigApi.fetchConfigById(service.logConfig).then((config: Config) => {
      this.components = config.columnComponents;
    });
  }
}
</script>

<style>
.align-right {
  margin: 8px;
  float: right;
}
</style>
