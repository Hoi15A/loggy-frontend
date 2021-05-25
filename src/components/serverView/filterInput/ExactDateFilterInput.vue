<template>
  <v-container>
    <v-menu
        ref="menu"
        v-model="menu"
        :close-on-content-click="false"
        transition="scale-transition"
        offset-y
        max-width="290px"
        min-width="auto">
      <template v-slot:activator="{ on, attrs }">
        <v-text-field
            v-model="exactDate"
            label="Date"
            prepend-icon="mdi-calendar"
            v-bind="attrs"
            v-on="on"
        ></v-text-field>
      </template>
      <v-date-picker
          v-model="exactDate"
          no-title
          @input="updateDateRange()">
      </v-date-picker>
    </v-menu>
  </v-container>
</template>

<script lang="ts">
import Vue from "vue";
import  { Prop, Component } from "vue-property-decorator";
import { QueryComponent } from "@/models/queryComponent";
import { FilterType } from "@/models/filterType";

@Component
export default class ExactDateFilterInput extends Vue {
  @Prop(String) id!: string
  @Prop(Map) query!: Map<string, QueryComponent>;

  exactDate = "";
  menu = false;

  updateDateRange() {
    this.menu = false;
    const queryComponent: QueryComponent = {
      columnComponentId: parseInt(this.id),
      filterType: FilterType.EXACT,
      dateFormat: "yyyy-MM-dd",
      from: this.exactDate,
      to: this.exactDate
    };
    this.query.set(this.id, queryComponent);
  }
}
</script>
