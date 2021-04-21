<template>
  <ConfigEditor/>
</template>

<script lang="ts">
import Vue from "vue";
import ConfigEditor from "@/components/ConfigEditor.vue";
import Component from "vue-class-component";

@Component({
  components: {
    ConfigEditor
  },
})
export default class Configs extends Vue {
  title = "Configs";
}
</script>

<style scoped>

</style>
