<template>
  <v-app>
    <v-navigation-drawer
      app
      clipped
      v-model="drawer"
    >
      <v-list>
        <v-list-item>
          <v-list-item-icon>
            <v-icon>
              mdi-view-dashboard
            </v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>Dashboard</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

      </v-list>
    </v-navigation-drawer>
    <v-app-bar
        app
        elevation="1"
        flat
        clipped-left
    >
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      <v-img
        src="https://i.imgur.com/9PKcAEa.png"
        max-height="40px"
        max-width="40px"
        contain
      >
      </v-img>
      <v-toolbar-title>
        Loggy
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn
        icon
      >
        <v-icon size="26">
          mdi-bell
        </v-icon>
      </v-btn>
      <v-btn
        icon
        @click="toggleTheme()"
      >
        <v-icon>
          mdi-brightness-6
        </v-icon>
      </v-btn>
      <v-menu offset-y>
        <template v-slot:activator="{ on, attrs }">
          <v-btn
              icon
              v-on="on"
              v-bind="attrs"
          >
            <v-avatar size="28">
              <img src="https://randomuser.me/api/portraits/men/85.jpg">
            </v-avatar>
          </v-btn>
        </template>
        <v-list>
          <v-list-item>
            <v-list-item-icon>
              <v-avatar size="28">
                <img src="https://randomuser.me/api/portraits/men/85.jpg">
              </v-avatar>
            </v-list-item-icon>
            <v-list-item-title>
              John Doe
            </v-list-item-title>
          </v-list-item>
          <v-divider></v-divider>
          <v-list-item>
            <v-list-item-icon>
              <v-icon>
                mdi-account-edit
              </v-icon>
            </v-list-item-icon>
            <v-list-item-title>Edit Profile</v-list-item-title>
          </v-list-item>
          <v-list-item>
            <v-list-item-icon>
              <v-icon>
                mdi-logout
              </v-icon>
            </v-list-item-icon>
            <v-list-item-title>Logout</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>

    </v-app-bar>
    <v-main>
      <v-container>
        <router-view/>
      </v-container>
    </v-main>
    <v-footer
        flat
        app
        padless
        outlined
    >
      <v-row
        justify="center"
        no-gutters
      >
        <v-btn
          v-for="link in footerLinks"
          :key="link"
          text
          color="my-2"
        >
          {{ link }}
        </v-btn>
        <v-col
          cols="12"
          class="text-center"
        >
          {{ new Date().getFullYear()}} - <strong>Loggy</strong>
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
  data() {
    return {
      items: [
        { title: "Home", icon: "mdi-view-dashboard"},
        { title: "Create Service", icon: "mdi-plus-box"},
        { title: "List Services", icon: "mdi-table"},
        { title: "Settings", icon: "mdi-cog"},
      ],
      footerLinks: [
        "Home",
        "About Us",
        "Team",
        "Contact Us",
      ],
      right: null,
      drawer: null,
      panel: [0],
    };
  },
  methods: {
    goHome() {
      this.$router.push("/").catch(err => console.error(err));
    },
    goTo(link: string) {
      switch (link) {
        case "Home":
          this.goHome();
          break;
        case "Create Service":
          this.$store.commit("stepper/setDialogStatus", true);
          break;
      }
    },
    toggleTheme() {
      this.$vuetify.theme.dark = !this.$vuetify.theme.dark;
    },
  },
});
</script>

<style scoped>

</style>
