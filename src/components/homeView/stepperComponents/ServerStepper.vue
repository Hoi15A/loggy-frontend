<template>
  <v-stepper v-model="$store.getters['stepper/getStepIndex']">
    <v-stepper-header>
      <v-stepper-step :complete="$store.getters['stepper/getStepIndex'] > 1" step="1">
        Initialize
      </v-stepper-step>
      <v-divider/>
      <v-stepper-step :complete="$store.getters['stepper/getStepIndex'] > 2" step="2">
        Connect
      </v-stepper-step>
      <v-divider/>
      <v-stepper-step step="3">
        Finalize
      </v-stepper-step>
    </v-stepper-header>

    <!-- STEP 1 -->
    <v-stepper-items>
      <v-stepper-content step="1">
        <UserInfoTextField ref="userForm"/>
        <v-list-item elevation="0">
          <CancelDialog v-on:confirmCancel="onConfirmCancel()"
                        v-bind:button-name="buttonName"
                        v-bind:title-message="titleMessage"/>
          <v-spacer/>
          <v-btn color="primary" rounded text @click="gotoStep(2)" v-on:click="onConfigSelect()" width="150">
            Continue
          </v-btn>
        </v-list-item>
      </v-stepper-content>

      <!-- STEP 2 -->
      <v-stepper-content step="2">
        <ConfigSelectForm ref="configForm"/>
        <v-list-item elevation="0">
          <CancelDialog v-on:confirmCancel="onConfirmCancel()"
                        v-bind:button-name="buttonName"
                        v-bind:title-message="titleMessage"/>
          <v-spacer/>
          <v-btn color="grey" dark rounded text @click="gotoStep(1)">Back</v-btn>
          <v-spacer/>
          <v-btn color="primary" rounded text @click="gotoStep(3)" width="150">Continue</v-btn>
        </v-list-item>
      </v-stepper-content>

      <!-- STEP 3 -->
      <v-stepper-content step="3">
        <DirectoryLocationForm ref="directoryLocationForm"/>
        <v-list-item elevation="0">
          <CancelDialog v-on:confirmCancel="onConfirmCancel()"
                        v-bind:button-name="buttonName"
                        v-bind:title-message="titleMessage"/>
          <v-spacer/>
          <v-btn color="grey" rounded text @click="gotoStep(2)">Back</v-btn>
          <v-spacer/>
          <v-btn color="green" dark rounded text v-on:click="onClickDone()" width="150">Finish</v-btn>
        </v-list-item>
      </v-stepper-content>
    </v-stepper-items>
    <ProcessingDialog ref="processingDialog"/>
  </v-stepper>
</template>

<script lang="ts">
import Vue from "vue";
import CancelDialog from "@/components/CancelDialog";
import UserInfoTextField from "@/components/homeView/stepperComponents/UserInfoForm";
import ConfigSelectForm from "@/components/homeView/stepperComponents/ConfigSelectForm";
import ProcessingDialog from "@/components/homeView/stepperComponents/ProcessingDialog";
import serviceApi from "@/api/serviceApi";
import DirectoryLocationForm from "@/components/homeView/stepperComponents/DirectoryLocationForm";
import {Component} from "vue-property-decorator";
import ServiceApi from "@/api/serviceApi";
import {Server} from "@/models/server";

@Component({
  components: {
    UserInfoTextField,
    CancelDialog,
    ConfigSelectForm,
    DirectoryLocationForm,
    ProcessingDialog,
  },
})
export default class ServerStepper extends Vue {
  buttonName = "Cancel";
  titleMessage = "Are you sure you want to cancel the registration process?";

  async onClickDone() {
    this.$store.commit("stepper/setProcessingDialog", true);

    const server = this.$store.getters["stepper/getServer"];

    try {
      await serviceApi.addNewService(server);
      this.$store.commit("stepper/setProcessingResponse", 1);
      this.loadServers();
    } catch (e) {
      this.$store.commit("stepper/setFailureMessage", e);
      this.$store.commit("stepper/setProcessingResponse", 2);
    }
  }

  loadServers() {
    ServiceApi.fetchServers().then((servers: Server[]) => {
      servers = servers.sort((a: Server,b: Server) => (a.id < b.id ? -1: 1));
      this.$store.commit("homeServices/setServers", servers);
    });
  }

  gotoStep(value: number) {
    this.$store.commit("stepper/setStepIndex", value);
    if(value === 2) {
      this.loadConfigs();
    }
  }

  onConfirmCancel() {
    this.$store.commit("stepper/setStepIndex", 1);
    this.$store.commit("stepper/setDialogStatus", false);
  }

  async loadConfigs() {
    const fetchedConfigs = await ServiceApi.fetchConfigs();
    const configsByName = [];
    fetchedConfigs.forEach(config => configsByName.push(config.name));
    this.$store.commit("stepper/setConfigsByName", configsByName);
  }
}
</script>

<style>

</style>
