<template>
  <v-card class="rounded-xl" width="300" height="330" outlined>
    <v-img src="https://www.nginx.com/wp-content/uploads/2020/07/nginx-default_featured-2020.png" height="115"></v-img>
    <v-list-item>
      <v-list-item-content>
        <v-card-title class="headline mb-1">{{serverName}}</v-card-title>
          <v-card-subtitle>{{serverDescription}}</v-card-subtitle>
        </v-list-item-content>
    </v-list-item>
    <div class="button-bar">
      <v-list-item>
        <CancelDialog v-on:confirmCancel="deleteJob(id)"
                      v-bind:button-name="buttonName"
                      v-bind:title-message="titleMessage"></CancelDialog>
        <ServerCardSettings v-on:serverSettingsDialog="openServerSettings"
                            v-bind:log-directory="this.logDirectory"
                            v-bind:log-service-location="this.logServiceLocation"
                            v-bind:log-config="this.logConfig"
        >
        </ServerCardSettings>
        <v-btn rounded text small elevation="0" color="primary" v-on:click="link()">Logs</v-btn>
      </v-list-item>
    </div>
  </v-card>

</template>

<script lang="ts">
import Vue from "vue";
import ServiceApi from "@/api/serviceApi";
import ServerCardSettings from "@/components/ServerCardSettings.vue";
import CancelDialog from "@/components/CancelDialog.vue";

export default Vue.extend({
  name: "ServerCard",

  components: {
    ServerCardSettings,
    CancelDialog,
  },
  data () {
    return {
      buttonName: "Remove",
      titleMessage: "Are you sure you want to delete this server? This is not reversible",
      openServiceSettings: false as boolean,
    };
  },

  methods: {
    deleteJob: async function(id: number) {
      await ServiceApi.removeServerById(id);
      this.$emit("loadServers");
    },
    link() {
      this.$router.push("/server");
    },
    openServerSettings() {
      this.openServiceSettings = true;
    }
  },
  props: {
    id: {
      type: Number,
    },
    serverDescription: {
      type: String,
    },
    image: {
      type: String,
    },
    logDirectory: {
      type: String,
    },
    logServiceLocation: {
      type: String,
    },
    serverName: {
      type: String,
    },
    logConfig: {
      type: String,
    }
  }
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