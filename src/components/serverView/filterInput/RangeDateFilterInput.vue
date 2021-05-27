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
            min-width="auto">
          <template v-slot:activator="{ on, attrs }">
            <v-text-field
                v-model="fromDate"
                label="From"
                prepend-icon="mdi-calendar"
                v-bind="attrs"
                v-on="on"/>
          </template>
          <v-date-picker
              v-model="fromDate"
              no-title
              @input="updateDateRange()"/>
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
                v-on="on"/>
          </template>
          <v-date-picker
              v-model="toDate"
              no-title
              @input="updateDateRange()"/>
        </v-menu>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import Vue from "vue";
import  { Prop, Component } from "vue-property-decorator";
import { QueryComponent } from "@/models/queryComponent";
import { FilterType } from "@/models/filterType";

@Component
export default class RangeDateFilterInput extends Vue {
  @Prop(String) id!: string
  @Prop(Map) query!: Map<string, QueryComponent>;

  fromDate = "";
  toDate = "";
  menu1 = false;
  menu2 = false;

  updateDateRange() {
    this.menu1 = false;
    this.menu2 = false;
    const queryComponent: QueryComponent = {
      columnComponentId: parseInt(this.id),
      filterType: FilterType.RANGE,
      dateFormat: "yyyy-MM-dd",
      from: this.fromDate,
      to: this.toDate
    };
    this.query.set(this.id, queryComponent);
  }
}
</script>
