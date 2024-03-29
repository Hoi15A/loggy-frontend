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
        <ValidationObserver v-slot="{ invalid }">
          <v-card>
            <v-card-title>
              <span class="headline">Service Configuration</span>
            </v-card-title>
            <v-card-text>
              <v-container>
                
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
                          v-model="server.name"
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
                            v-model="server.logDirectory"
                          />
                        </ValidationProvider>
                      </v-col>
                      <v-col cols="12">
                        <ValidationProvider
                          rules="required"
                          name="Service Image"
                          v-slot="{ errors }"
                        >
                          <v-text-field
                            label="Service Image"
                            required
                            :error-messages="errors"
                            v-model="server.image"
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
                          v-model="server.logConfig"
                          label="LogConfig*"
                          required
                        />
                        </ValidationProvider>
                      </v-col>
                      <v-col cols="12">
                        <ValidationProvider
                          rules="max:200"
                          name="log config"
                          v-slot="{ errors }"
                        >
                          <v-textarea
                            label="Service Description"
                            outlined
                            counter="200"
                            v-model="server.description"
                            :error-messages="errors"
                          />
                        </ValidationProvider>
                      </v-col>
                    </v-row>
                  </v-form>

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
                  :disabled="invalid"
                  @click="saveChanges()"
              >
                Save
              </v-btn>
            </v-card-actions>
          </v-card>
        </ValidationObserver>
      </v-dialog>
      <ErrorSnackbar
      v-bind:error-message="localErrorMessage"
      v-bind:snackbar="isSnackBarOpen"
      ></ErrorSnackbar>
    </v-row>
</template>

<script lang="ts">
import Vue from "vue";
import ServiceApi from "@/api/serviceApi";
import {Prop, Component} from "vue-property-decorator";
import "vue-class-component/hooks";
import {getModule} from "vuex-module-decorators";
import HomeServicesStore from "@/store/modules/homeServices";
import ErrorSnackbar from "@/components/ErrorSnackbar.vue";
import {required, max} from "vee-validate/dist/rules";
import { extend } from "vee-validate";

extend("required", required);
extend("max", max);

@Component({
  components: {ErrorSnackbar}
})
export default class ServerCardSettings extends Vue {
  @Prop(Boolean) openServiceSettings: boolean | undefined
  @Prop(Number) id!: number

  homeServicesStore = getModule(HomeServicesStore);
  settingsCardOpen = false;
  logConfigs = [] as string[];
  server = this.homeServicesStore.getServerById(this.id as number);
  localErrorMessage = "";
  isSnackBarOpen = false;

  beforeMount() {
    ServiceApi.fetchConfigs().then(configs => {
      this.logConfigs = configs.map(config => config.name);
    })
      .catch(err => {
        this.localErrorMessage = err;
        this.isSnackBarOpen = true;
      });
  }

  closeCard() {
    this.settingsCardOpen = false;
  }

  saveChanges() {
    ServiceApi.updateService(this.server)
      .catch(err => {
        this.localErrorMessage = err;
        this.isSnackBarOpen = true;
      });
    this.closeCard();
  }

}
</script>

<style scoped>

</style>