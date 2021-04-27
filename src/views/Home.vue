<template>
  <v-row>
    <template v-for="n in 1">
        <v-col v-for="server in $store.getters['homeServices/getAllServers']"
               v-bind:key="`${n}${server}`"
               cols="12"
               sm="5"
               md="4"
               lg="3"
               xl="2"
        >
          <server-card
              v-bind:id="server.id"
              :key="server.id"
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

@Component({
  components: {
    ServerCard,
    StepperDialog,
  }
})
export default class Home extends Vue {
  title = "Home";

  loadServers() {
    ServiceApi.fetchServers().then((servers: Server[]) => {
      servers = servers.sort((a: Server,b: Server) => (a.id < b.id ? -1: 1));
      this.$store.commit("homeServices/setServers", servers);
    });
  }

  beforeMount() {
    this.loadServers();
  }
}
</script>
