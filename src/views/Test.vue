<template>
  <DateFilter v-bind:id="'column1'"/>
</template>

<script lang="ts">
import Vue from "vue";
import DateFilter from "@/components/serverView/filterInput/DateFilter.vue";

export default Vue.extend({
  name: "Test",

  components: {
    DateFilter
  },
});
</script>
