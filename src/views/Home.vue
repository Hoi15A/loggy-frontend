<template>
    <v-row>
      <template v-for="n in 1">
        <v-col :key="n" class="mt-2" cols="12">
          <v-toolbar dense>
            <v-toolbar-title>Servers</v-toolbar-title>
            <v-spacer></v-spacer>
            <Dialog v-on:stepperComplete="newServerCard()">
            </Dialog>
          </v-toolbar>
        </v-col>
        <v-col v-for="j in servers" v-bind:key="`${n}${j}`" cols="6" md="2">
          <server-card/>
        </v-col>
      </template>
    </v-row>

</template>

<script lang="ts">
import ServerCard from "@/components/ServerCard.vue";
import Dialog from "@/components/Dialog.vue";
import Vue from "vue";


export default Vue.extend({
  name: "Home",
  data: () => {
    return {
      title: "Home",
      serverCount: 0 as number,
      servers: [] as string[],
    };
  },

  components: {
    ServerCard,
    Dialog,
  },

  methods: {
    newServerCard() {
      this.servers.push(`Server ${this.serverCount}`);
      this.serverCount += 1;
    }
  }
});
</script>
