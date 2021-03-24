<template>
    <v-row>
      <template v-for="n in 1">
        <v-col :key="n"  cols="12">
          <v-toolbar dense>
            <v-toolbar-title>Servers</v-toolbar-title>
            <v-spacer></v-spacer>
            <StepperDialog v-on:stepperComplete="newServerCard()">
            </StepperDialog>
          </v-toolbar>
        </v-col>
        <v-col v-for="server in servers" v-bind:key="`${n}${server}`" cols="6" md="2">
          <server-card v-bind:server-description="server.description"
                       v-bind:server-name="server.name"
                       v-bind:image="server.image"
          />
        </v-col>
      </template>
    </v-row>

</template>

<script lang="ts">
import ServerCard from "@/components/ServerCard.vue";
import StepperDialog from "@/components/StepperDialog.vue";

import ServiceApi from "@/api/serviceApi";
import Vue from "vue";

const serviceApi = new ServiceApi();


export default Vue.extend({
  name: "Home",
  data: () => {
    return {
      title: "Home",
      serverCount: 0 as number,
      servers: [] as string[],
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
      const servers = await serviceApi.fetchServers();
      for(let i = 0; i < servers.length; i++) {
        this.servers.push(servers[i]);
      }
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
