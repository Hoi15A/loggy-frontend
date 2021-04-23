<template>
  <v-form>
    <v-container>
      <v-select
          v-model="location"
          :items="['Local', 'Remote']"
          label="Log Service Location"/>
      <v-row>
        <v-col>
          <v-treeview
              v-model="selection"
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

@Component
export default class DirectoryLocationForm extends Vue {
  location = "LOCAL"; // local (1), remote (0)
  selection = [];
  items = [];

  async fetchRootFolder() {
    try {
      const res = await PathApi.getRootOfLocalServer();
      return await res.json();
    } catch (err) {
      console.warn(err);
      return [];
    }
  }

  async fetchSubFolders(item: Directory) {
    try {
      const res = await PathApi.getContentOfFolder(item.fullpath);
      item.children = await res.json();
    } catch (err) {
      console.warn(err);
    }
  }

  async beforeMount() {
    this.items = await this.fetchRootFolder();
  }
}
</script>

<style scoped>

</style>
