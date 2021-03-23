<template>
  <v-card
    class="rounded-xl"
    width="450"
    height="200"
    outlined

  >
    <v-list-item>
      <v-list-item-content>
        <v-list-item-title class="headline mb-1">{{cardTitle}}</v-list-item-title>
          <v-list-item-action-text class="subtitle-1">{{cardSubtitle}}</v-list-item-action-text>
        </v-list-item-content>
    </v-list-item>
    <v-card-actions>
      <v-btn rounded outlined absolute v-on:click="link()">Check Logs</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import Vue from "vue";

export default Vue.extend({
  name: "ServerCard",
  data: () => ({
    cardSubtitle: "Subtitle",
    cardTitle: "Title"
  }),

  methods: {
    link() {
      this.$router.push("/server");
    }
  }
});
</script>