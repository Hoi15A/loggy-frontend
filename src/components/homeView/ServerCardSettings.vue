<template>
    <v-row justify="center">
      <v-dialog
        v-model="settingsCardOpen"
        persistent
        max-width="600px"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            color="primary"
            rounded
            text
            small
            v-bind="attrs"
            v-on="on"
          >
            Settings
          </v-btn>
        </template>
        <v-card>
          <v-card-title>
            <span class="headline">Service Configuration</span>
          </v-card-title>
          <v-card-text>
            <v-container>
              <ValidationObserver>
                <v-form>
                  <v-row>
                    <v-col cols="12">
                      <ValidationProvider
                        rules="required|max:30"
                        name="service name"
                        v-slot="{ errors }"
                      >
                      <v-text-field
                        label="Service Name*"
                        required
                        counter="30"
                        :value="server.name"
                        :error-messages="errors"
                      />
                      </ValidationProvider>
                    </v-col>
                    <v-col cols="12">
                      <ValidationProvider
                        rules="required"
                        name="log directory"
                        v-slot="{ errors }"
                      >
                        <v-text-field
                          label="LogDirectory*"
                          required
                          :error-messages="errors"
                          :value="server.logDirectory"
                        />
                      </ValidationProvider>
                    </v-col>

                    <v-col
                        cols="12"
                        sm="6"
                    >
                      <ValidationProvider
                        rules="required"
                        name="log config"
                        v-slot="{ errors }"
                      >
                      <v-select
                        :items="logConfigs"
                        :error-messages="errors"
                        :value="server.logConfig"
                        label="LogConfig*"
                        required
                      />
                      </ValidationProvider>
                    </v-col>
                    <v-col cols="12">
                      <ValidationProvider
                        rules="required|max:200"
                        name="log config"
                        v-slot="{ errors }"
                      >
                        <v-textarea
                          label="Service Description"
                          outlined
                          counter="200"
                          :value="server.description"
                          :error-messages="errors"
                        />
                      </ValidationProvider>
                    </v-col>
                  </v-row>
                </v-form>
              </ValidationObserver>
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
                @click="saveChanges()"
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
import {Prop, Component} from "vue-property-decorator";
import "vue-class-component/hooks";
import {getModule} from "vuex-module-decorators";
import HomeServicesStore from "@/store/modules/homeServices";

@Component
export default class ServerCardSettings extends Vue {
  @Prop(Boolean) openServiceSettings: boolean | undefined
  @Prop(Number) id!: number

  homeServicesStore = getModule(HomeServicesStore);
  settingsCardOpen = false;
  logConfigs = [] as string[];
  server = this.homeServicesStore.getServerById(this.id as number);

  beforeMount() {
    ServiceApi.fetchConfigs().then(configs => {
      this.logConfigs = configs.map(config => config.name);
    });
  }

  closeCard() {
    this.settingsCardOpen = false;
  }

  saveChanges() {
    ServiceApi.updateService(this.server)
      .catch(err => console.log(err));
    this.closeCard();
  }

}
</script>

<style scoped>

</style>