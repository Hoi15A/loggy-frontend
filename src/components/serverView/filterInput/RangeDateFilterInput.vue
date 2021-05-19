<template>
  <v-container>
    <v-row>
      <v-col
          cols="12"
          lg="6"
      >
        <v-menu
            ref="menu1"
            v-model="menu1"
            :close-on-content-click="false"
            transition="scale-transition"
            offset-y
            max-width="290px"
            min-width="auto"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-text-field
                v-model="fromDate"
                label="From"
                prepend-icon="mdi-calendar"
                v-bind="attrs"
                v-on="on"
            ></v-text-field>
          </template>
          <v-date-picker
              v-model="fromDate"
              no-title
              @input="updateDateRange()"
          >
          </v-date-picker>
        </v-menu>
      </v-col>

      <v-col
          cols="12"
          lg="6"
      >
        <v-menu
            v-model="menu2"
            :close-on-content-click="false"
            transition="scale-transition"
            offset-y
            max-width="290px"
            min-width="auto"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-text-field
                v-model="toDate"
                label="To"
                prepend-icon="mdi-calendar"
                v-bind="attrs"
                v-on="on"
            ></v-text-field>
          </template>
          <v-date-picker
              v-model="toDate"
              no-title
              @input="updateDateRange()"
          >
          </v-date-picker>
        </v-menu>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import QueryStore from "@/store/modules/query";
import { getModule } from "vuex-module-decorators";
import Vue from "vue";
import  { Prop, Component } from "vue-property-decorator";

@Component
export default class RangeDateFilterInput extends Vue {
  @Prop(String) id!: string
  fromDate = "";
  toDate = "";
  menu1 = false;
  menu2 = false;
  queryStore = getModule(QueryStore);

  updateDateRange() {
    this.menu1 = false;
    this.menu2 = false;
    const rangeObject = {"dateFormat": "yyyy-MM-dd", "from": this.fromDate, "to": this.toDate};
    this.queryStore.addRangeQuery([this.id, rangeObject]);
  }
}


</script>