<template>
  <v-form>
    <v-container>
      <v-select
        v-model="location"
        :items="['Local', 'Remote']"
        label="Log Service Location"
      ></v-select>
      <v-row>
        <v-col>
          <v-treeview
            v-model="selection"
            :items="items"
            :load-children="fetchSubfolders"
            selectable
            return-object
          ></v-treeview>
        </v-col>
        <v-divider vertical></v-divider>
        <v-col
          class="pa-6"
          cols="6"
        >
          <template v-if="!selection.length">
            No nodes selected.
          </template>
          <template v-else>
            <div
              v-for="node in selection"
              :key="node.id"
            >
              {{ node.fullpath }}
            </div>
          </template>
        </v-col>
      </v-row>
    </v-container>
  </v-form>
</template>

<script>
import PathApi from "@/api/pathApi";

export default {
  data () {
    return {
      location: "Local", // local (1), remote (0)
      selection: [],
      items: []
    };
  },
  beforeMount: async function(){
    this.items = await this.fetchRootFolder();
  },
  methods: {
    async fetchRootFolder() {
      try {
        const res = await PathApi.getRootOfLocalServer();
        const json = await res.json();
        return json;
      } catch (err) {
        console.warn(err);
        return [];
      }
    },
    async fetchSubfolders(item) {
      try {
        const res = await PathApi.getContentOfFolder(item.fullpath);
        const json = await res.json();
        item.children = json;
      } catch (err) {
        console.warn(err);
      }
    }
  }
};
</script>

<style scoped>

</style>