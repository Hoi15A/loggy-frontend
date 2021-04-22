<template>
  <ConfigExpansionPanel/>
</template>

<script lang="ts">

import ConfigExpansionPanel from "@/components/configViewComponents/ConfigsExpansionPanel.vue";
import Vue from "vue";

export default Vue.extend( {
  name: "ConfigView",
  components: {
    ConfigExpansionPanel
  },
});
</script>

<style scoped>

</style>