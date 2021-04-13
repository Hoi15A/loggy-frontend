<template>
  <v-app>
    <v-navigation-drawer v-model="drawer" app>
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="title">
            Jane Doe
          </v-list-item-title>
          <v-list-item-subtitle>
            Logged In
          </v-list-item-subtitle>
          
        </v-list-item-content>
        <v-list-item-avatar>
            <img src="https://randomuser.me/api/portraits/women/81.jpg">
        </v-list-item-avatar>
      </v-list-item>
      <v-divider></v-divider>
      <v-list dense nav>
        <v-list-item
          v-for="item in items"
          :key="item.title"
          link
        >
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar app absolute elevation="1" height="60">
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      <v-btn x-large elevation="0" v-on:click="goHome()">Logy</v-btn>
      <v-spacer></v-spacer>
      <v-toolbar-title>{{title}}</v-toolbar-title>
      <v-spacer></v-spacer>
      
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
  data () {
    return {
      items: [
          { title: 'Home', icon: 'mdi-view-dashboard' },
          { title: 'Create Service', icon: 'mdi-plus-box' },
          { title: 'List Services', icon: 'mdi-table' },
          { title: 'Settings', icon: 'mdi-cog'},
        ],
        right: null,
    };
  },
  methods: {
    goHome() {
      this.$router.push("/");
    }
  }
});
</script>

<style scoped>

</style>
