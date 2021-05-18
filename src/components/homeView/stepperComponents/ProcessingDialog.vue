<template>
  <v-row>
    <v-dialog v-model="$store.getters['stepper/getProcessingDialog']" persistent>
      <v-card>
        <v-card-title class="headline">
          Processing
        </v-card-title>
        <v-container style="height: 200px;" v-if="$store.getters['stepper/getProcessingResponse'] === 0">
          <v-row class="fill-height" align-content="center" justify="center">
            <v-col class="subtitle-1 text-center" cols="12">
              Setting up your new Service
            </v-col>
            <v-col cols="6">
              <v-progress-linear color="deep-purple accent-4" indeterminate rounded height="6"></v-progress-linear>
            </v-col>
          </v-row>
        </v-container>
        <v-container style="height: 200px;" v-if="$store.getters['stepper/getProcessingResponse'] === 1">
          <v-row class="fill-height" align-content="center" justify="center">
            <v-col class="subtitle-1 text-center" cols="12">
              <v-alert prominent type="success">
                Service successfully registered
              </v-alert>
            </v-col>
            <v-col cols="6">
              <v-btn color="green" rounded text width="150" v-on:click="onClickConfirm()">
                Confirm
              </v-btn>
            </v-col>
            <v-col cols="6"/>
          </v-row>
        </v-container>
        <v-container style="height: 200px;" v-if="$store.getters['stepper/getProcessingResponse'] === 2">
          <v-row class="fill-height" align-content="center" justify="center">
            <v-col class="subtitle-1 text-center" cols="12">
              <v-alert prominent type="error">
                Failed to create your new Service
                <v-row>
                  {{ $store.getters['stepper/getFailureMessage'] }}
                </v-row>
              </v-alert>
            </v-col>
            <v-col cols="6">
              <v-btn color="red" rounded text width="150" v-on:click="onClickCancel()">
                Cancel
              </v-btn>
            </v-col>
          </v-row>
        </v-container>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script lang="ts">
import Vue from "vue";
import {Component} from "vue-property-decorator";

@Component
export default class ProcessingDialog extends Vue {

  onClickConfirm() {
    this.$store.commit("stepper/setStepIndex", 1);
    this.$store.commit("stepper/setProcessingDialog", false);
    this.$store.commit("stepper/setDialogStatus", false);
  }

  onClickCancel() {
    this.$store.commit("stepper/setProcessingDialog", false);
  }


}
</script>

<style scoped>

</style>