<template>
  <v-card elevation="0">
    <v-tabs v-model="model" background-color="deep-purple accent-4" center-active dark>
      <v-tab v-for="tab in tabs" :key="tab">
        {{ tab }}
        <v-icon dense color="white" @click="closeTab($event)" right>
          mdi-close
        </v-icon>
      </v-tab>
      <v-spacer></v-spacer>
      <v-btn @click="openTab()" class="mx-2 align-right" fab x-small dark color="deep-purple accent-2">
        <v-icon centerd dense color="white">
          mdi-plus
        </v-icon>
      </v-btn>
    </v-tabs>
    <v-tabs-items v-model="model">
      <v-tab-item v-for="tab in tabs" :key="tab">
        <LogGrid/>
      </v-tab-item>
    </v-tabs-items>
  </v-card>
</template>

<script lang="ts">
import Vue from "vue";
import LogGrid from "@/components/LogGrid.vue";

export default Vue.extend({
  name: "TabBar",

  components: {
    LogGrid
  },

  data: () => ({
    tabs: [] as string[],
    tabCount: 1 as number,
    model: "tab"
  }),

  methods: {
    openTab() {
      this.tabs.push(`Query ${this.tabCount++}`);
    },
    closeTab(tabId: any) {
      this.tabs.splice(this.tabs.indexOf(tabId.target.parentElement.textContent.trim()), 1);
    }
  }
});
</script>

<style>
.align-right {
  margin: 8px;
  float: right;
}
</style>
