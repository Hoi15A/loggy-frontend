<template>
  <ConfigExpansionPanel/>
</template>

<script lang="ts">

import ConfigExpansionPanel from "@/components/configViewComponents/ConfigsExpansionPanel.vue";
import Vue from "vue";

export default Vue.extend( {
  name: "Configs",
  components: {
    ConfigExpansionPanel
  },
  data: () => {
    return {
      title: "Configs",
    };
  },
});
</script>

<style scoped>

</style>