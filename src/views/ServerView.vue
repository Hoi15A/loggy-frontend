<template>
  <div>
    <TabBar v-bind:server-id="serverId"/>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import TabBar from "@/components/serverView/TabBar.vue";
import {Prop, Component} from "vue-property-decorator";

@Component({
  components: {
    TabBar
  },
})
export default class ServerView extends Vue {
  @Prop(Number) serverId: number | undefined
}
</script>
