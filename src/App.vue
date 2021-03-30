<template>
  <v-app>
    <v-app-bar app absolute elevation="1" height="60">
      <v-btn x-large elevation="0" v-on:click="goHome()">Logy</v-btn>
      <v-spacer></v-spacer>
      <v-toolbar-title>{{title}}</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon>
        <v-icon x-large>mdi-circle</v-icon>
      </v-btn>
      <v-btn icon>
        <v-icon large>mdi-dots-vertical</v-icon>
      </v-btn>
    </v-app-bar>
    <v-main>
      <v-container>
        <router-view/>
      </v-container>
    </v-main>
    <v-footer app padless height="35">
      <v-row class="align-center">
        <v-col class="text-center" cols="12">
          {{ new Date().getFullYear() }} — <strong>Log Analyser</strong>
        </v-col>
      </v-row>
    </v-footer>
  </v-app>
</template>


<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  name: "App",
  computed: {
    title: function() {
      return this.$route.meta.title;
    }
  },
  methods: {
    goHome() {
      this.$router.push('/');
    }
  }
});
</script>

<style scoped>

</style>
