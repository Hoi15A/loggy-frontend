<template>
  <v-card
    class="rounded-xl"
    width="600"
    height="400"
    outlined

  >
    <v-list-item>
      <v-list-item-content>
        <v-list-item-title class="headline mb-1">{{serverName}}</v-list-item-title>
          <v-list-item-action-text class="subtitle-1">{{serverDescription}}</v-list-item-action-text>
        </v-list-item-content>
    </v-list-item>
    <v-card-actions>
      <v-btn rounded outlined absolute v-on:click="link()" bottom>Check Logs</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import Vue from "vue";

export default Vue.extend({
  name: "ServerCard",
  props: {
    serverDescription: {
      type: String,
    },
    serverName: {
      type: String,
    }
  },
  methods: {
    link() {
      this.$router.push("/server");
    }
  }
});
</script>