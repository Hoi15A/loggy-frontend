<template>
  <v-card class="rounded-xl" width="300" height="330" outlined>
    <v-img src="https://www.nginx.com/wp-content/uploads/2020/07/nginx-default_featured-2020.png" height="115"/>
    <v-list-item>
      <v-list-item-content>
        <v-card-title class="headline mb-1">{{ this.server.name }}</v-card-title>
        <v-card-subtitle>{{ this.server.description }}</v-card-subtitle>
      </v-list-item-content>
    </v-list-item>
    <div class="button-bar">
      <v-list-item>
        <CancelDialog v-on:confirmCancel="deleteJob(id)"
                      v-bind:button-name="buttonName"
                      v-bind:title-message="titleMessage"/>
        <ServerCardSettings v-on:serverSettingsDialog="openServerSettings"
                            v-bind:id="this.server.id"/>
        <v-btn rounded text small color="primary" v-on:click="link()">Logs</v-btn>
      </v-list-item>
    </div>
  </v-card>

</template>

<script lang="ts">
import Vue from "vue";
import ServiceApi from "@/api/serviceApi";
import ServerCardSettings from "@/components/homeView/ServerCardSettings.vue";
import CancelDialog from "@/components/CancelDialog.vue";

export default Vue.extend({
  name: "ServerCard",

  components: {
    ServerCardSettings,
    CancelDialog,
  },

  data: () => ({
    server: undefined,
    buttonName: "Remove",
    titleMessage: "Are you sure you want to delete this server? This is not reversible",
    openServiceSettings: false as boolean,
  }),

  methods: {
    deleteJob(id: number) {
      ServiceApi.removeServerById(id).then(() => {
        this.$store.commit("homeServices/removeServerById", id);
      });
    },

    link() {
      this.$router.push(`/server/${this.id}`);
    },

    openServerSettings() {
      this.openServiceSettings = true;
    },
  },

  beforeMount() {
    this.server = this.$store.getters["homeServices/getServerById"](this.id);
  },

  props: {
    id: {
      type: Number,
    },
  },
});
</script>

<style scoped>
.button-bar {
  position: absolute;
  right: auto;
  left: 4%;
  bottom: 0;
}
</style>
