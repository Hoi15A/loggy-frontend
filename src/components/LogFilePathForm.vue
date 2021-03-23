<template>
  <v-form>
    <v-container>
      <v-row>
        <v-col>
          <v-text-field
            label="Log File Path"
            maxlength="200"
            v-model="filePath"
          ></v-text-field>
        </v-col>
      </v-row>
    </v-container>
  </v-form>
</template>

<script>
export default {
  data () {
    return {
      filePath: "",
    };
  },

  methods: {
    getPathInfo() {
      return  this.filePath;
    },


  }

};

</script>

<style scoped>

</style>