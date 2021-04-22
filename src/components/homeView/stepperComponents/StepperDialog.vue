<template>
  <v-row>
    <v-dialog v-model="$store.getters['stepper/getDialogStatus']" persistent max-width="600">
      <v-card>
        <Stepper v-on:stepperComplete="onStepperComplete()" v-on:stepperCancel="onStepperCancel()"/>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import Vue from "vue";
import Stepper from "@/components/homeView/stepperComponents/ServerStepper.vue";

export default Vue.extend({
  methods: {
    onStepperComplete () {
      this.$store.commit("stepper/setDialogStatus", false);
    },
    onStepperCancel() {
      this.$store.commit("stepper/setDialogStatus", false);
    },
  },

  components: {
    Stepper,
  },
});
</script>
