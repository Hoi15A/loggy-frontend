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
      <v-btn @click="openTab" class="mx-2 align-right" fab x-small dark color="black">
        <v-icon centerd dense color="white">
          mdi-plus
        </v-icon>
      </v-btn>
    </v-tabs>
    <v-tabs-items v-model="model">
      <v-tab-item v-for="tab in tabs" :key="tab">
        <TabItem v-bind:column-components="components"/>
      </v-tab-item>
    </v-tabs-items>
    <ErrorSnackbar
        v-bind:error-message="localErrorMessage"
        v-bind:snackbar="isSnackBarOpen"
      ></ErrorSnackbar>
  </v-card>
</template>

<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";
import { ColumnComponent } from "@/models/columnComponent";
import "vue-class-component/hooks";
import ConfigApi from "@/api/configApi";
import { Server } from "@/models/server";
import { Config } from "@/models/config";
import ServiceApi from "@/api/serviceApi";
import { getModule } from "vuex-module-decorators";
import HomeServicesStore from "@/store/modules/homeServices";
import TabItem from "@/components/serverView/TabItem.vue";
import ErrorSnackbar from "@/components/ErrorSnackbar.vue";

@Component({
  components: {
    ErrorSnackbar,
    TabItem,
  },
})
export default class TabBar extends Vue {
  homeServices = getModule(HomeServicesStore)
  localErrorMessage = "";
  isSnackBarOpen = false;

  tabs = [] as string[];
  tabCount = 1 as number;
  model = "tab";
  components = [] as ColumnComponent[];

  openTab() {
    this.tabs.push(`Query ${this.tabCount++}`);
  }

  closeTab(closeEvent: any) {
    this.tabs.splice(this.tabs.indexOf(closeEvent.target.parentElement.textContent.trim()), 1);
  }

  async beforeMount() {
    const id = parseInt(this.$route.params.serverId);
    let service = {} as Server;

    if (this.homeServices.isEmpty) {
      try {
        service = await ServiceApi.fetchServerById(id);
      } catch (err) {
        this.localErrorMessage = err;
        this.isSnackBarOpen = true;
      }
    } else {
      service = this.homeServices.getServerById(id);
      this.homeServices.setServers(await ServiceApi.fetchServers());
    }

    const config = await ConfigApi.fetchConfigById(service.logConfig) as Config;
    for (const c of Object.values(config.columnComponents)) {
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
