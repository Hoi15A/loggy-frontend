<template>
  <div>
    <v-menu
        ref="menu"
        v-model="menu"
        :close-on-content-click="false"
        :return-value.sync="date"
        transition="scale-transition"
        offset-y
        min-width="auto">
      <template v-slot:activator="{ on, attrs }">
        <v-text-field v-model="date"
                      label="Pick date range"
                      prepend-icon="mdi-calendar"
                      v-bind="attrs"
                      v-on="on"/>
      </template>
      <v-date-picker v-model="date" range no-title scrollable>
        <v-spacer/>
        <v-btn text color="primary" @click="updateDateRange()">
          OK
        </v-btn>
      </v-date-picker>
    </v-menu>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import  { Prop, Component } from "vue-property-decorator";

@Component
export default class DateFilterInput extends Vue {
  @Prop(String) id: string | undefined

  date = "";
  menu = false;

  updateDateRange() {
    this.$store.commit("query/addQuery", [this.id, this.date]);
    // @ts-ignore
    this.$refs.menu.save(this.date);
    this.menu = false;
  }
}
</script>

<style scoped>

</style>
