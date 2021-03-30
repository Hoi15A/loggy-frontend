<template>
  <v-form>
    <v-container>
      <v-row>
        <v-col>
          <v-text-field
            label="Log Directory"
            maxlength="200"
            v-model="logDirectory"
          ></v-text-field>
          <v-text-field
            label="Log Service Location"
            maxlength="200"
            v-model="location"
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
      logDirectory: "/var/log",
      location: 1,
    };
  },
};

</script>

<style scoped>

</style>