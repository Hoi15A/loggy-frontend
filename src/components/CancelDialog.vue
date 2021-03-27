<template>
    <v-dialog v-model="dialog" persistent max-width="390">
      <template v-slot:activator="{ on, attrs }">
        <v-btn color="red" dark rounded text v-bind="attrs" v-on="on">
          Cancel
        </v-btn>
      </template>
      <v-card>
        <v-card-title>
          Are you sure you want to cancel this process?
        </v-card-title>
        <v-card-actions>
          <v-btn text rounded color="red" width="150" v-on:click="onClickNo()">
            No
          </v-btn>
          <v-spacer></v-spacer>
          <v-btn text rounded width="150" v-on:click="onClickYes()">
            Yes
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
</template>

<script>

export default {
  data () {
    return {
      dialog: false,
    };
  },

  methods: {
    onClickNo() {
      this.dialog = false;
    },

    onClickYes() {
      this.dialog = false;
      this.$emit("confirmCancel");
    },
  },
};
</script>

<style scoped>

</style>