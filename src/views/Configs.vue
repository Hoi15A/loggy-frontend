<template>
  <ConfigEditor/>
</template>

<script lang="ts">
import Vue from "vue";
import ConfigEditor from "@/components/ConfigEditor.vue";

export default Vue.extend({
  name: "Configs",
  components: {
    ConfigEditor
  },
  data: () => ({
    title: "Configs",
  }),
});
</script>

<style scoped>

</style>
