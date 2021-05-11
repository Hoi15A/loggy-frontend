<template>
  <v-text-field class="range-input"
                v-model="value"
                v-bind:label=label
                clearable
                @input="updateValue"/>
</template>

<script lang="ts">
import Vue from "vue";
import { Prop, Component } from "vue-property-decorator";

@Component
export default class SingleFilterInput extends Vue {
  @Prop(String) id: string | undefined;
  @Prop(String) label: string | undefined;

  value = "";

  updateValue() {
    this.$store.commit("query/addQuery", [this.id, this.value]);
  }
}
</script>

<style scoped>
.range-input {
  padding: 0 10px;
}
</style>
