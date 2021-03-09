<template>
  <v-row>
    <v-col cols="2">
      <v-sheet rounded="lg">
        <v-list color="transparent">
          <v-list-item v-for="item in listItem" :key="item" link>
            <v-list-item-content>
              <v-list-item-title>
                {{ item }}
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          <v-divider class="my-2"></v-divider>

          <v-list-item
            link
            color="grey lighten-4"
          >
            <v-list-item-content>
              <v-list-item-title @click="changeGridView()">
                Refresh
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-sheet>
    </v-col>

    <v-col>
      <v-sheet v-if="gridView" min-height="70vh" rounded="lg">
        <TabBar/>
      </v-sheet>
      <v-sheet v-if="!gridView" min-height="70vh" rounded="lg">
        <LogFile/>
      </v-sheet>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import Vue from "vue";
import LogFile from "@/components/LogFile.vue";
import TabBar from "@/components/TabBar.vue";

export default Vue.extend({
  name: "ServerView",

  components: {
    LogFile,
    TabBar
  },

  data: () => ({
    gridView: true,
    links: [
      "Feature 1",
      "Feature 2",
      "Feature 3",
      "Feature 4",
    ],
    listItem: [
      "Live Logs",
      "Errors",
      "Archive",
    ]
  }),
  methods: {
    changeGridView: async function () {
      this.gridView = !this.gridView;
    }
  },
});
</script>
