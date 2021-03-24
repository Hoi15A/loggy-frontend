<template>
  <v-card
    class="rounded-xl"
    width="400"
    height="330"
    outlined

  >
    <v-img src="https://www.nginx.com/wp-content/uploads/2020/07/nginx-default_featured-2020.png" height="115"></v-img>
    <v-list-item>
      <v-list-item-content>
        <v-card-title class="headline mb-1">{{serverName}}</v-card-title>
          <v-card-subtitle>{{serverDescription}}</v-card-subtitle>
        <!-- Add more data fields -->
        </v-list-item-content>
    </v-list-item>
    <div class="button-bar">
      <v-btn-toggle  group>
        <v-btn rounded plain bottom value="left" small elevation="0" color="error">Remove</v-btn>
        <v-btn rounded text bottom value="right" small elevation="0" color="primary">Settings</v-btn>
        <v-btn rounded text bottom value="justify" small elevation="0" color="primary" v-on:click="link()">Logs</v-btn>
      </v-btn-toggle>
    </div>

  </v-card>
</template>

<script>
import Vue from "vue";

export default Vue.extend({
  name: "ServerCard",
  props: {
    serverDescription: {
      type: String,
    },
    image: {
      type: String,
    },
    logDirectory: {
      type: String,
    },
    logServiceLocation: {
      type: String,
    },
    serverName: {
      type: String,
    },
    logConfig: {
      type: String,
    }
  },
  methods: {
    link() {
      this.$router.push("/server");
    }
  },
  beforeMount() {
    console.log(this.image);
  }
});
</script>

<style scoped>
.button-bar {
  position: absolute;
  bottom: 0;
}

</style>