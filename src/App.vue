<template>
  <v-app>
    <v-navigation-drawer
      app
      clipped
      v-model="drawer"
    >
      <v-list
        nav
        dense
      >
        <v-list-item-group
          v-model="selectedItem"
          color="primary"
        >
        </v-list-item-group>
        <v-list-item
          v-for="(item, i) in items"
          :key="'item' + i"
          :to="item.route"
          link
        >
          <v-list-item-icon>
            <v-icon v-text="item.icon"></v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title v-text="item.text"></v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-group
            v-for="(subItem, i) in subGroupItems"
            :key="'subgroup' + i"
            color="primary"
            v-bind:prepend-icon="subItem.icon"
        >
          <template v-slot:activator>
            <v-list-item-title>{{ subItem.text }}</v-list-item-title>
          </template>

          <v-list-item
            v-for="(entryItem, i) in subItem.elements"
            :key="'subitem' + i"
            link
            :to="entryItem.route"
          >
            <v-list-item-icon>
              <v-icon v-text="entryItem.icon"></v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title v-text="entryItem.text"></v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-group>

        <v-list-item
            v-for="(item, i) in lastItems"
            :key="'lastitem' + i"
            :to="item.route"
            link
        >
          <v-list-item-icon>
            <v-icon v-text="item.icon"></v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title v-text="item.text"></v-list-item-title>
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
        <v-badge
            dot
            overlap
            color="red"
        >
          <v-icon size="26">
            mdi-bell
          </v-icon>
        </v-badge>
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
import Component from "vue-class-component";

@Component
export default class App extends Vue {

  right = null;
  drawer = null;
  selectedItem = 0;
  alert = 0;

  items = [
    { text: "Dashboard", icon: "mdi-view-dashboard", route: "/"},
  ];

  lastItems = [
    { text: "Settings", icon: "mdi-cog", route: ""},
  ];
      
  subGroupItems = [
    {
      text: "Servers", icon: "mdi-server", elements: [
        { text: "Create", icon: "mdi-plus-box", route: "/service/create" }
      ]
    },
    {
      text: "Configs", icon: "mdi-file-cog", elements: [
        { text: "List", icon: "mdi-clipboard-list", route: "/configs"}
      ]
    },
    {
      text: "Users", icon: "mdi-account-multiple", elements: [
        { text: "Create", icon: "mdi-account-plus", route: "" },
        { text: "List", icon: "mdi-account-details", route: ""},
        { text: "Edit", icon: "mdi-account-edit", route: ""}
      ]
    },
  ];

  footerLinks = [
    "Home",
    "About Us",
    "Team",
    "Contact Us",
  ];
  
  toggleTheme() {
    this.$vuetify.theme.dark = !this.$vuetify.theme.dark;
  }
  
}
</script>

<style scoped>

</style>
