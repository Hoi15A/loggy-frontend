<template>
  <v-row>
    <template v-for="n in 1">
        <v-col v-for="server in servers" v-bind:key="`${n}${server}`" cols="12" sm="5" md="4" lg="3" xl="2" >
          <server-card v-on:loadServers="loadServers()"
                       v-bind:server-description="server.description"
                       v-bind:server-name="server.name"
                       v-bind:id="server.id"
                       v-bind:log-directory="server.logDirectory"
                       v-bind:log-service-location="server.location"
                       v-bind:image="server.image"/>
        </v-col>
      </template>
    <StepperDialog v-on:stepperComplete="loadServers()"/>
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

@Component({
  components: {
    ServerCard,
    StepperDialog,
  }
})
export default class Home extends Vue {
  title = "Home";
  serverCount = 0;
  servers = [] as Server[];

  async loadServers() {
    const fetchedServers = await ServiceApi.fetchServers();
    for(let i = 0; i < fetchedServers.length; i++) {
      this.servers.push(fetchedServers[i]);
    }
    this.servers.sort((a,b) => (a.id < b.id ? -1: 1));
  }

  async beforeMount() {
    try {
      await this.loadServers();
    } catch (e) {
      console.error(e);
    }
  }
}
</script>
