<template>
  <v-card class="rounded-xl" width="300" height="330" outlined>
    <v-img :src="server.image" height="115" />
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
                      v-bind:title-message="titleMessage"
                      v-bind:message="message"
                      />
        <ServerCardSettings v-on:serverSettingsDialog="openServerSettings"
                            v-bind:id="this.server.id"/>
        <v-btn rounded text small elevation="0" color="primary" :to="{name: 'Server', params: {serverId: this.id}}">Logs</v-btn>
      </v-list-item>
    </div>
  </v-card>

</template>

<script lang="ts">
import Vue from "vue";
import ServiceApi from "@/api/serviceApi";
import ServerCardSettings from "@/components/homeView/ServerCardSettings.vue";
import CancelDialog from "@/components/CancelDialog.vue";
import {Prop, Component} from "vue-property-decorator";
import {getModule} from "vuex-module-decorators";
import HomeServicesStore from "@/store/modules/homeServices";

@Component({
  components: {
    ServerCardSettings,
    CancelDialog,
  },
})
export default class ServerCard extends Vue {
  @Prop(Number) id!: number

  homeServicesStore = getModule(HomeServicesStore);
  server = this.homeServicesStore.getServerById(this.id as number);
  buttonName = "Remove";
  titleMessage = "Remove Server";
  isSnackBarOpen = false;
  localErrorMessage = "";
  message = "Are you sure you want to delete this server? This is not reversible";
  openServiceSettings = false;

  deleteJob(id: number) {
    ServiceApi.removeServerById(id).then(() => {
      this.homeServicesStore.removeServerById(id);
    })
      .catch(err => {
        this.isSnackBarOpen = true;
        this.localErrorMessage = err;
      });
  }

  openServerSettings() {
    this.openServiceSettings = true;
  }

}
</script>

<style scoped>
.button-bar {
  position: absolute;
  right: auto;
  left: 4%;
  bottom: 0;
}
</style>
