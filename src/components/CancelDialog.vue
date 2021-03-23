<template>
  <v-row>
    <v-dialog v-model="dialog" persistent max-width="400">
      <template v-slot:activator="{ on, attrs }">
        <v-btn color="red" dark v-bind="attrs" v-on="on">
          Cancel
        </v-btn>
      </template>
      <v-card>
        <v-card-title class="headline">
          Are you sure you want to cancel this process?
        </v-card-title>
        <v-card-actions>
          <v-btn color="red" width="150" v-on:click="onClickNo()">
            No
          </v-btn>
          <v-spacer></v-spacer>
          <v-btn  width="150" v-on:click="onClickYes()">
            Yes
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
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
      this.$emit('confirmCancel');
    },
  },
};
</script>

<style scoped>

</style>