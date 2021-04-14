<template>
  <v-row>
    <v-dialog v-model="stepperDialog" persistent max-width="600">
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
  props: {
    stepperDialog: {
      type: Boolean,
    }
  },
  methods: {
    onStepperComplete () {
      this.stepperDialog = false;
      this.$emit("stepperComplete");
    },

    onStepperCancel() {
      this.stepperDialog = false;
    },
  },
  components: {
    Stepper,
  },
});
</script>

<style scoped>
.add-button {
  position: absolute;
  top: 2%;
  right:2%;

}
</style>