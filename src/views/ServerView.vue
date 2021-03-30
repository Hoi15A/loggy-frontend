<template>
  <div>
    <TabBar/>
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

  data: () => ({
  }),
  methods: {
  },
});
</script>
