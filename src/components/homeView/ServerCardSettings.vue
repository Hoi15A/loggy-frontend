<template>
  <v-row justify="center">
    <v-dialog
        v-model="settingsCardOpen"
        persistent
        max-width="600px"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn color="primary" rounded text small elevation="0" v-bind="attrs" v-on="on">Settings</v-btn>
      </template>
      <v-card>
        <v-card-title>
          <span class="headline">Service Configuration</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-text-field
                    label="Service Name*"
                    required
                    v-bind:value="serverName"
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                    label="LogDirectory*"
                    required
                    v-bind:value="logDirectory"
                ></v-text-field>
              </v-col>

              <v-col
                  cols="12"
                  sm="6"
              >
                <v-select
                    :items="logConfigs"
                    label="LogConfig*"
                    required
                ></v-select>
              </v-col>
              <v-col cols="12">
                <v-textarea
                    label="Service Description"
                    v-bind:value="serverDescription"
                ></v-textarea>
              </v-col>
            </v-row>
          </v-container>
          <small>*indicates required field</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
              color="red darken-1"
              text
              @click="closeCard()"
          >
            Close
          </v-btn>
          <v-btn
              color="green darken-1"
              text
              @click="closeCard()"
          >
            Save
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script lang="ts">
import Vue from "vue";
import ServiceApi from "@/api/serviceApi";

export default Vue.extend({
  data: () => ({
    settingsCardOpen: false,
    logConfigs: [] as string[]
  }),

  methods: {
    closeCard() {
      this.settingsCardOpen = false;
    },
  },

  async beforeMount() {
    ServiceApi.fetchConfigs().then(configs => {
      configs.forEach(config => this.logConfigs.push(config.name));
    });
  },

  props: {
    openServiceSettings: {
      type: Boolean,
    },
    logDirectory: {
      type: String,
    },
    logServiceLocation: {
      type: String,
    },
    logConfig: {
      type: String,
    },
    serverName: {
      type: String,
    },
    serverDescription: {
      type: String,
    }
  },
});
</script>

<style scoped>

</style>