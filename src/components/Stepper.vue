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
    <v-stepper-items>
      <v-stepper-content step="1">
          <UserInfoTextField ref="userForm">
          </UserInfoTextField>
        <v-toolbar color="grey lighten-3" dark>
          <v-btn color="primary" v-on:click="onContinueInit" width="150">
            Continue
          </v-btn>
          <v-spacer></v-spacer>
          <CancelDialog v-on:confirmCancel="onConfirmCancel()">
          </CancelDialog>
        </v-toolbar>
      </v-stepper-content>
      <v-stepper-content step="2">
          <ConfigSelectForm ref="configForm">
          </ConfigSelectForm>
        <v-toolbar color="grey lighten-3" dark>
          <v-btn color="primary" @click="e1 = 3" width="150">
            Continue
          </v-btn>
          <v-spacer></v-spacer>
          <v-btn color="grey" @click="e1 = 1">
            Back
          </v-btn>
          <v-spacer></v-spacer>
          <CancelDialog v-on:confirmCancel="onConfirmCancel()">
          </CancelDialog>
        </v-toolbar>
      </v-stepper-content>
      <v-stepper-content step="3">
          <LogFilePathForm ref="logPathForm">
          </LogFilePathForm>
        <v-toolbar color="grey lighten-3" dark>
          <v-btn color="green darken-1" v-on:click="onClickDone()" width="150">
            Done
          </v-btn>
          <v-spacer></v-spacer>
          <v-btn color="grey" @click="e1 = 2">
            Back
          </v-btn>
          <v-spacer></v-spacer>
          <CancelDialog v-on:confirmCancel="onConfirmCancel()">
          </CancelDialog>
        </v-toolbar>
      </v-stepper-content>
    </v-stepper-items>
  </v-stepper>
</template>

<script>

import CancelDialog from "@/components/CancelDialog";
import UserInfoTextField from "@/components/UserInfoTextField";
import ConfigSelectForm from "@/components/ConfigSelectForm";
import LogFilePathForm from "@/components/LogFilePathForm";

export default {
  data () {
    return {
      e1: 1,
      userInput: [],
    };
  },

  methods: {
    onClickDone() {
      this.e1 = 1;
      this.userInput[0] = this.$refs.userForm.getUserInfo()[0];
      this.userInput[1] = this.$refs.userForm.getUserInfo()[1];
      this.userInput[2] = this.$refs.userForm.getUserInfo()[2];
      this.userInput[3] = this.$refs.configForm.getConfigInfo();
      this.userInput[4] = this.$refs.logPathForm.getPathInfo();
      console.log(this.userInput);
      this.$emit("stepperComplete");
    },

    onConfirmCancel() {
      this.e1 = 1;
      this.$emit("stepperCancel");
    },

    onContinueInit() {
      this.e1 = 2;
    }
  },

  components: {
    UserInfoTextField,
    CancelDialog,
    ConfigSelectForm,
    LogFilePathForm,
  }
};
</script>

<style>

</style>