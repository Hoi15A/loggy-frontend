<template>
  <v-row>
    <template v-for="n in 1">
        <v-col v-for="server in servers" v-bind:key="`${n}${server}`" cols="12" sm="5" md="4" lg="3" xl="2" >
          <server-card v-on:loadServers="loadServers"
                       v-bind:server-description="server.description"
                       v-bind:server-name="server.name"
                       v-bind:id="server.id"
                       v-bind:log-directory="server.logDirectory"
                       v-bind:log-service-location="server.location"
                       v-bind:image="server.image"
          />
        </v-col>
      </template>
    <StepperDialog v-on:stepperComplete="newServerCard()"></StepperDialog>
  </v-row>
</template>

<script lang="ts">
import ServerCard from "@/components/ServerCard.vue";
import StepperDialog from "@/components/StepperDialog.vue";

import ServiceApi from "@/api/serviceApi";
import Vue from "vue";

export default Vue.extend({
  name: "Home",
  data: () => {
    return {
      title: "Home",
      serverCount: 0 as number,
      servers: [] as any[],
    };
  },

  components: {
    ServerCard,
    StepperDialog,
  },

  methods: {
    newServerCard() {
      this.servers.push(`Server ${this.serverCount}`);
      this.serverCount += 1;
    },
    loadServers: async function() {
      const fetchedServers = await ServiceApi.fetchServers();
      this.servers = [];
      for(let i = 0; i < fetchedServers.length; i++) {
        this.servers.push(fetchedServers[i]);
      }
      this.servers.sort((a,b) => (a.id < b.id ? -1: 1));
    },

  },
  beforeMount: async function() {
    try {
      await this.loadServers();
    } catch (e) {
      console.error(e);
    }
  }
});
</script>
