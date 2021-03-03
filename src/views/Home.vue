<template>
  <LogFile/>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import LogFile from "@/components/LogFile.vue";

@Component({
  components: {
    LogFile,
  },
})
export default class Home extends Vue {}
</script>
