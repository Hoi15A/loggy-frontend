<template>
  <v-stepper v-model="e1">
    <v-stepper-header>
      <v-stepper-step :complete="e1 > 1" step="1">
        Initialize
      </v-stepper-step>
      <v-divider></v-divider>
      <v-stepper-step :complete="e1 > 2" step="2">
        Connect
      </v-stepper-step>
      <v-divider></v-divider>
      <v-stepper-step step="3">
        Finalize
      </v-stepper-step>
    </v-stepper-header>

    <!-- STEP 1 -->
    <v-stepper-items>
      <v-stepper-content step="1">
          <UserInfoTextField ref="userForm">
          </UserInfoTextField>
        <v-list-item elevation="0" >
          <CancelDialog v-on:confirmCancel="onConfirmCancel()"
                        v-bind:button-name="buttonName"
                        v-bind:title-message="titleMessage"></CancelDialog>
          <v-spacer></v-spacer>
          <v-btn color="primary" rounded text @click="e1 = 2" v-on:click="onConfigSelect()" width="150">
            Continue
          </v-btn>
        </v-list-item>
      </v-stepper-content>

      <!-- STEP 2 -->
      <v-stepper-content step="2">
          <ConfigSelectForm ref="configForm">
          </ConfigSelectForm>
        <v-list-item elevation="0">
          <CancelDialog v-on:confirmCancel="onConfirmCancel()"
                        v-bind:button-name="buttonName"
                        v-bind:title-message="titleMessage"></CancelDialog>
          <v-spacer></v-spacer>
          <v-btn color="grey" dark rounded text @click="e1 = 1">Back</v-btn>
          <v-spacer></v-spacer>
          <v-btn color="primary" rounded text @click="e1 = 3" width="150">Continue</v-btn>
        </v-list-item>
      </v-stepper-content>

      <!-- STEP 3 -->
      <v-stepper-content step="3">
          <DirectoryLocationForm ref="directoryLocationForm">
          </DirectoryLocationForm>
        <v-list-item elevation="0">
          <CancelDialog v-on:confirmCancel="onConfirmCancel()"
                        v-bind:button-name="buttonName"
                        v-bind:title-message="titleMessage"></CancelDialog>
          <v-spacer></v-spacer>
          <v-btn color="grey" rounded text @click="e1 = 2">Back</v-btn>
          <v-spacer></v-spacer>
          <v-btn color="green" dark rounded text v-on:click="onClickDone()" width="150">Finish</v-btn>
        </v-list-item>
      </v-stepper-content>
    </v-stepper-items>
    <ProcessingDialog ref="processingDialog" v-on:confirmSuccess="onConfirmSuccess()" v-on:cancelFailure="onCancelFailure()"></ProcessingDialog>
  </v-stepper>
</template>

<script>

import CancelDialog from "@/components/CancelDialog";
import UserInfoTextField from "@/components/stepperComponents/UserInfoTextField";
import ConfigSelectForm from "@/components/stepperComponents/ConfigSelectForm";
import ProcessingDialog from "@/components/stepperComponents/ProcessingDialog";
import serviceApi from "@/api/serviceApi";
import DirectoryLocationForm from "@/components/stepperComponents/DirectoryLocationForm";

export default {
  data () {
    return {
      buttonName: "Cancel",
      titleMessage: "Are you sure you want to cancel the registration process?",
      e1: 1,

      server: {
        logDirectory: "",
        name: "",
        description: "",
        image: "",
        location: 1,
        logConfig: ""
      }
    };
  },

  methods: {
    onClickDone: async function () {
      this.$refs.processingDialog.activateProcessing();

      this.server.name = this.$refs.userForm.name;
      this.server.image = this.$refs.userForm.image;
      this.server.description = this.$refs.userForm.description;
      this.server.logConfig = this.$refs.configForm.config;
      this.server.logDirectory = this.$refs.directoryLocationForm.logDirectory;
      this.server.location = this.$refs.directoryLocationForm.location;

      console.log(this.server);

      try {
        await serviceApi.addNewService(this.server);
        this.$refs.processingDialog.activateSuccess();
      } catch (e) {
        this.$refs.processingDialog.activateFailure(e.toString());
      }
    },

    onConfirmCancel() {
      this.e1 = 1;
      this.$emit("stepperCancel");
    },

    onConfirmSuccess() {
      this.e1 = 1;
      this.$emit("stepperComplete");
    },

    onCancelFailure() {
      this.e1 = 1;
    },

    onConfigSelect() {
      this.$refs.configForm.loadConfigs();
    }
  },

  components: {
    UserInfoTextField,
    CancelDialog,
    ConfigSelectForm,
    DirectoryLocationForm,
    ProcessingDialog,
  }
};
</script>

<style>

</style>