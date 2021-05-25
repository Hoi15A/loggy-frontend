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
import QueryStore from "@/store/modules/query";
import { getModule } from "vuex-module-decorators";
import Vue from "vue";
import { Prop, Component } from "vue-property-decorator";

@Component
export default class RangeFilterInput extends Vue {
  @Prop(String) id!: string;
  queryStore = getModule(QueryStore);
  fromValue = "";
  toValue = "";
  updateValues() {
    const rangeObject = {"from": this.fromValue, "to": this.toValue};
    this.queryStore.addRangeQuery([this.id, rangeObject]);
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
