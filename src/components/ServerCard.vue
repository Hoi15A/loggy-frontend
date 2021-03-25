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
        <v-btn rounded plain small elevation="0" color="error" v-on:click="deleteJob()">Remove</v-btn>
        <ServerCardSettings v-on="serverSettingsDialog"
                            v-bind:log-directory="this.logDirectory"
                            v-bind:log-service-location="this.logServiceLocation"
                            v-bind:log-config="this.logConfig"
        >
        </ServerCardSettings>
        <v-btn rounded plain small elevation="0" color="primary" v-on:click="link()">Logs</v-btn>
      </v-list-item>
    </div>
  </v-card>

</template>

<script lang="ts">
import Vue from "vue";
import serviceApi from "@/api/serviceApi";
import ServerCardSettings from "@/components/ServerCardSettings.vue";

export default Vue.extend({
  name: "ServerCard",

  components: {
    ServerCardSettings,
  },
  data () {
    return {
      serverSettingsDialog: false as boolean,
    };
  },

  methods: {
    deleteJob: async function(id: number) {
      //await serviceApi.removeServerById(id);
    },
    link() {
      this.$router.push("/server");
    },
    openServerSettings() {
      this.serverSettingsDialog = true;
    }
  },
  props: {
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
  left: 5%;
  bottom: 0;
}

</style>