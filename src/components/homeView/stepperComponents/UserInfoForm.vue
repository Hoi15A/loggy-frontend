<template>
  <ValidationObserver>
  <v-form>
    <v-container>
      <v-row align="center">
        <v-col>
          <ValidationProvider
            rules="required|max:30"
            v-slot="{ errors }"
            name="service name"
          >
          <v-text-field 
            counter="30"
            label="Service Name" 
            :error-messages="errors" 
            v-model="name"
          />
          </ValidationProvider >
        </v-col>
        <v-col>
          <v-text-field label="Icon Link" v-model="image"/>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <ValidationProvider
            rules="max:200"
            v-slot="{ errors }"
            name="description"
          >
          <v-textarea 
            counter="200" 
            rows="3" 
            outlined 
            name="input-7-4"
            label="Description" 
            v-model="description"
            :error-messages="errors"
          />
          </ValidationProvider>
        </v-col>
      </v-row>
    </v-container>
  </v-form>
  </ValidationObserver>
</template>

<script lang="ts">
import Vue from "vue";
import {Component} from "vue-property-decorator";
import { extend } from "vee-validate";
import {max, required} from "vee-validate/dist/rules";

extend("max", max);
extend("required", required);

@Component
export default class UserInfoForm extends Vue {
  name = "";
  image = "http://localhost:8081/";
  description = "";
}
</script>

<style scoped>

</style>