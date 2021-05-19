<template>
  <v-container>
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
          @input="updateDateRange()"
      >
      </v-date-picker>
    </v-menu>
  </v-container>
</template>

<script lang="ts">
import QueryStore from "@/store/modules/query";
import { getModule } from "vuex-module-decorators";
import Vue from "vue";
import  { Prop, Component } from "vue-property-decorator";

@Component
export default class ExactDateFilterInput extends Vue {
  @Prop(String) id!: string
  exactDate = "";
  menu1 = false;
  queryStore = getModule(QueryStore);
  updateDateRange() {
    this.menu1 = false;
    const rangeObject = {"dateFormat": "yyyy-MM-dd", "from": this.exactDate, "to": this.exactDate};
    this.queryStore.addRangeQuery([this.id, rangeObject]);  }

}


</script>