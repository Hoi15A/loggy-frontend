<template>
  <v-layout row wrap>
    <v-flex xs12 sm6>
      <v-date-picker
          v-model="dates"
          multiple/>
    </v-flex>
    <v-flex xs12 sm6>
      <v-menu
          ref="menu"
          v-model="menu"
          :close-on-content-click="false"
          :nudge-right="40"
          :return-value.sync="dates"
          lazy
          transition="scale-transition"
          offset-y
          full-width
          min-width="290px">
        <template v-slot:activator="{ on }">
          <v-combobox
              v-model="dates"
              multiple
              chips
              small-chips
              label="Multiple picker in menu"
              prepend-icon="event"
              readonly
              v-on="on"/>
        </template>
        <v-date-picker v-model="dates" multiple no-title scrollable>
          <v-spacer/>
          <v-btn flat color="primary" @click="menu = false">Cancel</v-btn>
          <v-btn flat color="primary" @click="$refs.menu.save(dates)">OK</v-btn>
        </v-date-picker>
      </v-menu>
    </v-flex>
  </v-layout>
</template>

<script lang="ts">
import Vue from "vue";
import {Component} from "vue-property-decorator";

@Component
export default class DatePicker extends Vue {
  dates = ["2018-09-15", "2018-09-20"];
  menu = false;
}
</script>
