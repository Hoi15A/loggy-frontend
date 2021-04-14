<template>
  <div>
    <TabBar v-bind:server-id="serverId"/>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import TabBar from "@/components/TabBar.vue";

export default Vue.extend({
  name: "ServerView",

  components: {
    TabBar
  },

  props: {
    serverId: {
      type: Number
    }
  },
});
</script>
