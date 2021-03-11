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
        <v-card class="mb-12" color="grey lighten-3" height="200px">
        </v-card>
        <v-toolbar color="grey lighten-3" dark>
          <v-btn color="primary" @click="e1 = 2" width="150">
            Continue
          </v-btn>
          <v-spacer></v-spacer>
          <v-btn color="red" width="150" v-on:click="onClickCancel()">
            Cancel
          </v-btn>
        </v-toolbar>
      </v-stepper-content>
      <v-stepper-content step="2">
        <v-card class="mb-12" color="grey lighten-3" height="200px">
        </v-card>
        <v-toolbar color="grey lighten-3" dark>
          <v-btn color="primary" @click="e1 = 3" width="150">
            Continue
          </v-btn>
          <v-spacer></v-spacer>
          <v-btn color="grey" @click="e1 = 1">
            Back
          </v-btn>
          <v-spacer></v-spacer>
          <v-btn color="red" width="150" v-on:click="onClickCancel()">
            Cancel
          </v-btn>
        </v-toolbar>
      </v-stepper-content>
      <v-stepper-content step="3">
        <v-card class="mb-12" color="grey lighten-3" height="200px">
        </v-card>
        <v-toolbar color="grey lighten-3" dark>
          <v-btn color="green darken-1" v-on:click="onClickDone()" width="150">
            Done
          </v-btn>
          <v-spacer></v-spacer>
          <v-btn color="grey" @click="e1 = 2">
            Back
          </v-btn>
          <v-spacer></v-spacer>
          <v-btn color="red" width="150" v-on:click="onClickCancel()">
            Cancel
          </v-btn>
        </v-toolbar>
      </v-stepper-content>
    </v-stepper-items>
  </v-stepper>
</template>

<script>

export default {
  data () {
    return {
      e1: 1,
    };
  },

  methods: {
    onClickDone() {
      this.e1 = 1;
      this.$emit('endStepper');
    },

    onClickCancel() {
      this.e1 = 1;
      this.$emit('cancelStepper');
    }
  }
};
</script>

<style>

</style>