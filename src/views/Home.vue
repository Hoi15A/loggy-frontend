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
      <StepperDialog v-on:stepperComplete="loadServers()" />
  </v-row>
</template>

<script lang="ts">
import ServiceApi from "@/api/serviceApi";
import Vue from "vue";
import Component from "vue-class-component";
import ServerCard from "@/components/homeView/ServerCard.vue";
import StepperDialog from "@/components/homeView/stepperComponents/StepperDialog.vue";
import {Server} from "@/models/server.ts";
import "vue-class-component/hooks";
import {getModule} from "vuex-module-decorators";
import HomeServicesStore from "@/store/modules/homeServices";

@Component({
  components: {
    ServerCard,
    StepperDialog,
  }
})
export default class Home extends Vue {
  title = "Home";
  homeServicesStore = getModule(HomeServicesStore, this.$store);

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
