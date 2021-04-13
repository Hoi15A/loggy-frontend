<template>
  <v-row>
    <v-dialog v-model="dialog" persistent max-width="600">
      <template v-slot:activator="{ on, attrs }">
        <div class="add-button">
          <v-btn fab dark elevation="1" v-bind="attrs" v-on="on" color="light-grey" x-large>
            <v-icon color="white" large>mdi-plus</v-icon>
          </v-btn>
        </div>
      </template>
      <v-card>
        <Stepper v-on:stepperComplete="onStepperComplete()" v-on:stepperCancel="onStepperCancel()"/>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script lang="ts">
import Vue from "vue";
import Stepper from "@/components/stepperComponents/ServerStepper.vue";

export default Vue.extend({
  components: {
    Stepper,
  },

  data: () => ({
    dialog: false,
  }),

  methods: {
    onStepperComplete() {
      this.dialog = false;
      this.$emit("stepperComplete");
    },

    onStepperCancel() {
      this.dialog = false;
    },
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