<template>
  <ConfigsTable />
</template>

<script lang="ts">

import ConfigsTable from "@/components/configViewComponents/ConfigsTable.vue";
import Vue from "vue";

export default Vue.extend( {
  name: "ConfigView",
  components: {
    ConfigsTable,
  },
});
</script>

<style scoped>

</style>