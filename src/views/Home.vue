<template>
  <v-row>
    <template>
        <v-col v-for="(server, i) in homeServicesStore.getAllServers"
               :key="'server' + i"
               cols="12"
               sm="5"
               md="4"
               lg="3"
               xl="2"
        >
          <server-card
              v-bind:id="server.id"
          />
        </v-col>
      </template>
  </v-row>
</template>

<script lang="ts">
import ServiceApi from "@/api/serviceApi";
import Vue from "vue";
import Component from "vue-class-component";
import ServerCard from "@/components/homeView/ServerCard.vue";
import {Server} from "@/models/server";
import "vue-class-component/hooks";
import {getModule} from "vuex-module-decorators";
import HomeServicesStore from "@/store/modules/homeServices";

@Component({
  components: {
    ServerCard,
  }
})
export default class Home extends Vue {
  title = "Home";
  homeServicesStore = getModule(HomeServicesStore);

  loadServers() {
    ServiceApi.fetchServers().then((servers: Server[]) => {
      servers = servers.sort((a: Server,b: Server) => (a.id < b.id ? -1: 1));
      this.homeServicesStore.setServers(servers);
    });
  }

  beforeMount() {
    this.loadServers();
  }
}
</script>
