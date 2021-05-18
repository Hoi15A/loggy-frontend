<template>
  <v-form>
    <v-container>
      <v-select
          v-model="setLocation"
          :items="['Local', 'Remote']"
          label="Log Service Location"/>
      <v-row>
        <v-col>
          <v-treeview
              v-model="setLogDirectory"
              :items="items"
              :load-children="fetchSubFolders"
              selectable
              return-object/>
        </v-col>
        <v-divider vertical/>
        <v-col
            class="pa-6"
            cols="6">
          <template v-if="!selection.length">
            No nodes selected.
          </template>
          <template v-else>
            <div
                v-for="node in selection"
                :key="node.id">
              {{ node.fullpath }}
            </div>
          </template>
        </v-col>
      </v-row>
    </v-container>
  </v-form>
</template>

<script lang="ts">
import Vue from "vue";
import PathApi from "@/api/pathApi";
import { Directory } from "@/models/directory";
import {Component} from "vue-property-decorator";
import "vue-class-component/hooks";
import {Server} from "@/models/server";

@Component
export default class DirectoryLocationForm extends Vue {
  items = [];
  selection = []

  set setLocation(value: string) {
    const server = this.$store.getters["stepper/getServer"] as Server;
    server["location"] = value;
    this.$store.commit("stepper/setServer", server);
  }

  set setLogDirectory(value: []) {
    const server = this.$store.getters["stepper/getServer"] as Server;
    this.selection = value;
    server["logDirectory"] = value[0].fullpath;
    this.$store.commit("stepper/setServer", server);
  }

  fetchRootFolder() {
    PathApi.getRootOfLocalServer().then(res => {
      this.items = res;
    }).catch((err) => {
      this.items = [];
      console.error(err);
    });
  }

  fetchSubFolders(item: Directory) {
    PathApi.getContentOfFolder(item.fullpath).then(res => {
      item.children = res;
    }).catch((err) => {
      console.warn(err);
    });
  }

  beforeMount() {
    this.fetchRootFolder();
  }
}
</script>

<style scoped>

</style>
