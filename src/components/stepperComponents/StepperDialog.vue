<template>
  <v-row>
    <v-dialog v-model="$store.getters['stepper/getDialogStatus']" persistent max-width="600">
      <v-card>
        <Stepper v-on:stepperComplete="onStepperComplete()" v-on:stepperCancel="onStepperCancel()">
        </Stepper>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import Stepper from "@/components/stepperComponents/ServerStepper.vue";
import Vue from "vue";

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