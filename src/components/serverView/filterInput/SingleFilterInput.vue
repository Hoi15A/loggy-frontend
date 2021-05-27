<template>
  <v-text-field class="range-input"
                v-model="value"
                v-bind:label=label
                v-bind:disabled="disabled"
                clearable
                @input="updateValue"/>
</template>

<script lang="ts">
import Vue from "vue";
import { Prop, Component } from "vue-property-decorator";
import { QueryComponent } from "@/models/queryComponent";
import { FilterType } from "@/models/filterType";

@Component
export default class SingleFilterInput extends Vue {
  @Prop(String) id!: string;
  @Prop(String) label!: string;
  @Prop(Map) query!: Map<string, QueryComponent>;
  @Prop(String) filterType!: string;
  @Prop(Boolean) disabled!: boolean;

  value = "";

  updateValue() {
    if (this.filterType === "EXACT") {
      const queryComponent = {
        columnComponentId: parseInt(this.id),
        filterType: FilterType.EXACT,
        exact: this.value
      };
      this.query.set(this.id, queryComponent);
    } else if (this.filterType === "CONTAINS") {
      const queryComponent = {
        columnComponentId: parseInt(this.id),
        filterType: FilterType.CONTAINS,
        contains: this.value
      };
      this.query.set(this.id, queryComponent);
    } else if (this.filterType === "REGEX") {
      const queryComponent = {
        columnComponentId: parseInt(this.id),
        filterType: FilterType.REGEX,
        regex: this.value
      };
      this.query.set(this.id, queryComponent);
    }
  }
}
</script>

<style scoped>
.range-input {
  padding: 0 10px;
}
</style>
