<template>
    <v-row>
      <template v-for="n in 1">
        <v-col :key="n"  cols="12">
          <v-toolbar dense>
            <v-toolbar-title>Servers</v-toolbar-title>
            <v-spacer></v-spacer>
            <StepperDialog v-on:stepperComplete="newServerCard()">
            </StepperDialog>
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
import StepperDialog from "@/components/StepperDialog.vue";
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
    StepperDialog,
  },

  methods: {
    newServerCard() {
      this.servers.push(`Server ${this.serverCount}`);
      this.serverCount += 1;
    }
  }
});
</script>
