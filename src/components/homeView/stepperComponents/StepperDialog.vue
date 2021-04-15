<template>
  <v-row>
    <v-dialog v-model="stepperDialog" persistent max-width="600">
      <v-card>
        <Stepper v-on:stepperComplete="onStepperComplete()" v-on:stepperCancel="onStepperCancel()"/>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script lang="ts">
import Vue from "vue";
import Stepper from "@/components/homeView/stepperComponents/ServerStepper.vue";

export default Vue.extend({
  components: {
    Stepper,
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

  props: {
    stepperDialog: {
      type: Boolean,
    }
  },
});
</script>

<style scoped>
.add-button {
  position: absolute;
  top: 2%;
  right: 2%;

}
</style>
