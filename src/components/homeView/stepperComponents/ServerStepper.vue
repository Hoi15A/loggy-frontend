<template>
  <v-stepper
    v-model="step"
    vertical
  >
    <template>
      <v-snackbar
          v-model="snackbar"
          :timeout="5000"
      >
        The service was successfully registered.

        <template v-slot:action="{ attrs }">
          <v-btn
              color="success"
              text
              v-bind="attrs"
              @click="snackbar = false"
          >
            Close
          </v-btn>
        </template>
      </v-snackbar>
    </template>
   <!-- STEP 1 -->
    <v-stepper-step 
        :complete="step > 1" 
        step="1"
    >
      Initialize
    </v-stepper-step>
    <v-stepper-content step="1">
      <UserInfoTextField ref="userForm"/>
      <v-list-item elevation="0">
        <CancelDialog v-on:confirmCancel="onConfirmCancel()"
                      v-bind:button-name="buttonName"
                      v-bind:title-message="titleMessage"/>
        <v-spacer/>
        <v-btn color="primary" rounded text @click="step = 2" v-on:click="onConfigSelect()" width="150">
          Continue
        </v-btn>
      </v-list-item>
    </v-stepper-content>

    <!-- STEP 2 -->
    <v-stepper-step 
        :complete="step > 2" 
        step="2"
    >
      Connect
    </v-stepper-step>
    <v-stepper-content step="2">
      <ConfigSelectForm ref="configForm"/>
      <v-list-item elevation="0">
        <CancelDialog v-on:confirmCancel="onConfirmCancel()"
                      v-bind:button-name="buttonName"
                      v-bind:title-message="titleMessage"/>
        <v-spacer/>
        <v-btn color="grey" dark rounded text @click="step = 1">Back</v-btn>
        <v-spacer/>
        <v-btn color="primary" rounded text @click="step = 3" width="150">Continue</v-btn>
      </v-list-item>
    </v-stepper-content>

    <!-- STEP 3 -->
    <v-stepper-step step="3">
      Finalize
    </v-stepper-step>
    <v-stepper-content step="3">
      <DirectoryLocationForm ref="directoryLocationForm"/>
      <v-list-item elevation="0">
        <CancelDialog v-on:confirmCancel="onConfirmCancel()"
                      v-bind:button-name="buttonName"
                      v-bind:title-message="titleMessage"/>
        <v-spacer/>
        <v-btn color="grey" rounded text @click="step = 2">Back</v-btn>
        <v-spacer/>
        <v-btn color="green" dark rounded text v-on:click="onClickDone()" width="150">Finish</v-btn>
      </v-list-item>
    </v-stepper-content>
    <ErrorSnackbar
    v-bind:snackbar="isSnackBarOpen"
    v-bind:error-message="localErrorMessage"
    ></ErrorSnackbar>
  </v-stepper>

</template>

<script lang="js">
import Vue from "vue";
import CancelDialog from "@/components/CancelDialog";
import UserInfoTextField from "@/components/homeView/stepperComponents/UserInfoForm";
import ConfigSelectForm from "@/components/homeView/stepperComponents/ConfigSelectForm";
import serviceApi from "@/api/serviceApi";
import DirectoryLocationForm from "@/components/homeView/stepperComponents/DirectoryLocationForm";
import {Component} from "vue-property-decorator";
import ErrorSnackbar from "@/components/ErrorSnackbar";

@Component({
  components: {
    ErrorSnackbar,
    UserInfoTextField,
    CancelDialog,
    ConfigSelectForm,
    DirectoryLocationForm,
  },
})
export default class ServerStepper extends Vue {
  server = {};
  buttonName = "Cancel";
  localErrorMessage = "";
  isSnackBarOpen = false;
  titleMessage = "Are you sure you want to cancel the registration process?";
  step = 1;
  snackbar = false;

  onClickDone() {
    this.server.name = this.$refs.userForm.name;
    this.server.image = this.$refs.userForm.image;
    this.server.description = this.$refs.userForm.description;
    this.server.logConfig = this.$refs.configForm.selectedConfig;
    this.server.logDirectory = this.$refs.directoryLocationForm.selection[0].fullpath;
    this.server.location = this.$refs.directoryLocationForm.location;

    serviceApi.addNewService(this.server)
      .then(() => {
        this.snackbar = true;
        this.server = {};
        this.step = 1;
      })
      .catch(err => {
        this.localErrorMessage = err;
        this.isSnackBarOpen = true;
      });
  }

  onConfirmCancel() {
    this.step = 1;
    this.$emit("stepperCancel");
  }

  onCancelFailure() {
    this.step = 1;
  }

  onConfigSelect() {
    this.$refs.configForm.loadConfigs();
  }
  
}
</script>

<style>

</style>
