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
import Component from "vue-class-component";

@Component({
  components: {
    Stepper,
  },
})
export default class StepperDialog extends Vue {
  onStepperComplete () {
    this.$store.commit("stepper/setDialogStatus", false);
  }

  onStepperCancel() {
    this.$store.commit("stepper/setDialogStatus", false);
  }
}
</script>
