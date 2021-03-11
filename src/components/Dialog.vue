<template>
  <v-row>
    <v-dialog
      v-model="dialog"
      persistent
      max-width="600"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn class="" dark v-bind="attrs" v-on="on" color="white" small>
          <v-icon color="black">
            mdi-plus
          </v-icon>
        </v-btn>
      </template>
      <v-card>
        <Stepper v-on:endStepper="onEndStepper()" v-on:cancelStepper="onCancelStepper()">
        </Stepper>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import Stepper from "@/components/Stepper.vue";
export default {
  data () {
    return {
      dialog: false,
    };
  },

  methods: {
    onEndStepper () {
      this.dialog = false;
      this.$emit('endDialog');
    },

    onCancelStepper() {
      this.dialog = false;
    }
  },

  components: {
    Stepper,
  },
};
</script>

<style>

</style>