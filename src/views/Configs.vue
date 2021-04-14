<template>
  <ConfigEditor/>
</template>

<script>
import ConfigEditor from "@/components/ConfigEditor.vue";

export default {
  name: "Configs",
  components: {
    ConfigEditor
  },
  data: () => ({
    title: "Configs",
  }),
};
</script>

<style scoped>

</style>
