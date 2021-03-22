<template>
  <v-form>
    <v-container>
      <v-row>
        <v-col>
          <v-text-field label="Service Name"></v-text-field>
        </v-col>
        <v-col>
          <v-text-field label="Icon Link"></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" sm="6" md="3">
          <v-text-field label="Description"></v-text-field>
        </v-col>
      </v-row>
    </v-container>
  </v-form>
</template>

<script>
export default {
  name: "UserInfoTextField"
};

</script>

<style scoped>

</style>