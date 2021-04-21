<template>
  <v-form>
    <v-container>
      <v-row align="center">
        <v-col>
          <v-text-field counter label="Service Name" maxlength="30" v-model="name"/>
        </v-col>
        <v-col>
          <v-text-field label="Icon Link" maxlength="200" v-model="image"/>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-textarea counter maxlength="200" no-resize rows="3" outlined name="input-7-4"
                      label="Description" v-model="description"/>
        </v-col>
      </v-row>
    </v-container>
  </v-form>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";

@Component
export default class UserInfoForm extends Vue {
  name = "";
  image = "http://localhost:8081/";
  description = "";
}
</script>

<style scoped>

</style>