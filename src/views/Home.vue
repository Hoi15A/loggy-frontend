<template>
    <v-row>
      <template v-for="n in 1">
        <v-col :key="n" class="mt-2" cols="12">
          <h1>Servers</h1>
        </v-col>
        <v-col v-for="j in serverCount" v-bind:key="`${n}${j}`" cols="6" md="2">
          <server-card/>
        </v-col>
      </template>
    </v-row>
</template>

<script lang="ts">
import ServerCard from "@/components/ServerCard.vue";


export default {
  name: "Home",

  components: {
    ServerCard
  },
  data: () => ({
    title: "Home",
    serverCount: 1
  }),
};
</script>
