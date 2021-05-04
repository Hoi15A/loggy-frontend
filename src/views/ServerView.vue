<template>
  <div>
    <TabBar/>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import TabBar from "@/components/serverView/TabBar.vue";
import {Component} from "vue-property-decorator";

@Component({
  components: {
    TabBar
  },
})
export default class ServerView extends Vue {
  
}
</script>
