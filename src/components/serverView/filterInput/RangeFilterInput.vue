<template>
  <div class="range-filter">
    <v-text-field class="range-input"
        v-model="fromValue"
        label="From"
        clearable
        @input="updateValues"/>
    <v-text-field class="range-input"
        v-model="toValue"
        label="To"
        clearable
        @input="updateValues"/>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Prop, Component } from "vue-property-decorator";
import { QueryComponent } from "@/models/queryComponent";
import { FilterType } from "@/models/filterType";

@Component
export default class RangeFilterInput extends Vue {
  @Prop(String) id!: string;
  @Prop(Map) query!: Map<string, QueryComponent>;

  fromValue = "";
  toValue = "";
  updateValues() {
    const queryComponent: QueryComponent = {
      columnComponentId: parseInt(this.id),
      filterType: FilterType.RANGE,
      from: this.fromValue,
      to: this.toValue
    };
    this.query.set(this.id, queryComponent);
  }
}
</script>

<style scoped>
.range-filter {
  display: flex;
}

.range-input {
  padding: 0 10px;
}
</style>
