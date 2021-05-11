<template>
  <v-text-field class="range-input"
                v-model="value"
                v-bind:label=label
                clearable
                @input="updateValue"/>
</template>

<script lang="ts">
import QueryStore from "@/store/modules/query";
import { getModule } from "vuex-module-decorators";
import Vue from "vue";
import { Prop, Component } from "vue-property-decorator";

@Component
export default class SingleFilterInput extends Vue {
  @Prop(String) id!: string;
  @Prop(String) label!: string;

  queryStore = getModule(QueryStore);
  value = "";

  updateValue() {
    this.queryStore.addQuery([this.id, this.value]);
  }
}
</script>

<style scoped>
.range-input {
  padding: 0 10px;
}
</style>
