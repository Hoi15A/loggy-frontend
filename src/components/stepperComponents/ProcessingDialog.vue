<template>
  <v-row>
    <v-dialog v-model="dialog" persistent>
      <v-card>
        <v-card-title class="headline">
          Processing
        </v-card-title>
        <v-container style="height: 200px;" v-if="processing">
          <v-row class="fill-height" align-content="center" justify="center">
            <v-col class="subtitle-1 text-center" cols="12">
              Setting up your new Service
            </v-col>
            <v-col cols="6">
              <v-progress-linear color="deep-purple accent-4" indeterminate rounded height="6"></v-progress-linear>
            </v-col>
          </v-row>
        </v-container>
        <v-container style="height: 200px;" v-if="success">
          <v-row class="fill-height" align-content="center" justify="center">
            <v-col class="subtitle-1 text-center" cols="12">
              <v-alert prominent type="success">
                Service successfully registered
              </v-alert>
            </v-col>
            <v-col cols="6">
            </v-col>
          </v-row>
        </v-container>
        <v-container style="height: 200px;" v-if="failure" >
          <v-row class="fill-height" align-content="center" justify="center">
            <v-col class="subtitle-1 text-center" cols="12">
              <v-alert prominent type="error">
                Failed to create your new Service
                <v-row>
                  {{errorMessage}}
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

<script>

import Vue from "vue";

export default Vue.extend({
  data () {
    return {
      dialog: false,
      processing: true,
      success: false,
      failure: false,
      errorMessage: "",
    };
  },

  methods: {

    activateProcessing() {
      this.dialog = true;
      this.processing = true;
      this.success = false;
      this.failure = false;
    },

    activateSuccess() {
      this.processing = false;
      this.failure = false;
      this.success = true;

      setTimeout(this.confirm, 1500);
    },

    activateFailure(e) {
      this.processing = false;
      this.success = false;
      this.failure = true;
      this.errorMessage = e;
    },

    confirm() {
      this.dialog = false;
      this.success = false;
      this.$emit("confirmSuccess");
    },

    onClickCancel() {
      this.dialog = false;
      this.failure = false;
      this.$emit("cancelFailure");
    },
  },
});
</script>

<style scoped>

</style>