<template>
  <v-data-table
      :headers="headers"
      :items="configStore.getConfigs"
      class="elevation-1"
  >
    <template v-slot:top>
        <v-dialog
            v-model="dialog"
            max-width="650px"
        >
          <ValidationObserver v-slot="{ invalid }">
            <v-card>
              <v-card-title>
                <span class="headline">Edit Config</span>
              </v-card-title>
              
                <v-card-text>
                  <ValidationProvider 
                    rules="required" 
                    v-slot="{ errors }"
                    name="config name"
                  >
                  <v-text-field
                      v-model="configStore.getEditedConfig.name"
                      label="Config Name"
                      :error-messages="errors"
                  />
                  </ValidationProvider>
                  <ValidationProvider 
                    rules="required" 
                    v-slot="{ errors }"
                    name="column count"
                  >
                  <v-text-field
                      v-model="configStore.getEditedConfig.columnCount"
                      label="Column Count"
                      :error-messages="errors"
                  />
                  </ValidationProvider>
                  <ValidationProvider 
                    rules="required" 
                    v-slot="{ errors }"
                    name="header length"
                  >
                  <v-text-field
                      v-model="configStore.getEditedConfig.headerLength"
                      label="Header Length"
                      :error-messages="errors"
                  />
                  </ValidationProvider>
                  <v-text-field
                      v-model="configStore.getEditedConfig.separator"
                      label="Separator"
                  />
                  <ColumnComponentsReorder />
                </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                    color="blue darken-1"
                    text
                    @click="close"
                >
                  Cancel
                </v-btn>
                <v-btn
                    color="blue darken-1"
                    text
                    :disabled="invalid"
                    @click="save"
                >
                  Save
                </v-btn>
              </v-card-actions>
            </v-card>
          </ValidationObserver>
        </v-dialog>
        <v-dialog
            v-model="dialogDelete"
            max-width="500px"
        >
          <v-card>
            <v-card-title class="headline">Are you sure you want to delete this item?</v-card-title>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                  color="blue darken-1"
                  text
                  @click="closeDelete"
              >
                Cancel
              </v-btn>
              <v-btn
                  color="blue darken-1"
                  text
                  @click="deleteConfigConfirm"
              >
                OK
              </v-btn>
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>
    </template>
    <template v-slot:item.actions="{ item }">
      <v-icon
          small
          class="mr-2"
          @click="editConfig(item)"
      >
        mdi-pencil
      </v-icon>
      <v-icon
          small
          @click="deleteConfig(item)"
      >
        mdi-delete
      </v-icon>
    </template>
    <ErrorSnackbar
    v-bind:snackbar="isSnackBarOpen"
    v-bind:error-message="localErrorMessage"
    >
    </ErrorSnackbar>
  </v-data-table>
</template>

<script lang="ts">
import Vue from "vue";
import ColumnComponentsReorder from "@/components/configViewComponents/ColumnComponentsReorder.vue";
import {Config} from "@/models/config";
import ConfigApi from "@/api/configApi";
import Component from "vue-class-component";
import "vue-class-component/hooks";
import {getModule} from "vuex-module-decorators";
import ConfigStore from "@/store/modules/config";
import ErrorSnackbar from "@/components/ErrorSnackbar.vue";

@Component({
  components: {
    ErrorSnackbar,
    ColumnComponentsReorder
  },
})
export default class ConfigsTable extends Vue {
  configStore = getModule(ConfigStore);
  dialog = false;
  dialogDelete = false;
  editedIndex = -1;
  localErrorMessage = "";
  isSnackBarOpen = false;
  headers = [
    { text: "Name", value: "name" },
    { text: "Column Count", value: "columnCount" },
    { text: "HeaderLength", value: "headerLength" },
    { text: "Separator", value: "separator" },
    { text: "Actions", value: "actions", sortable: false},
  ];

  editConfig(config: Config) {
    this.editedIndex = this.configStore.getConfigs.indexOf(config);
    this.configStore.setEditedConfig(config);
    this.dialog = true;
  }

  deleteConfig(config: Config) {
    this.editedIndex = this.configStore.getConfigs.indexOf(config);
    this.configStore.setEditedConfig(config);
    this.dialogDelete = true;
  }

  deleteConfigConfirm() {
    ConfigApi.removeConfigById(this.configStore.getConfigs[this.editedIndex].name).then()
      .catch(err => {
        this.localErrorMessage = err;
        this.isSnackBarOpen = true;
      });
    this.configStore.removeConfig(this.editedIndex);
    this.closeDelete();
  }

  close() {
    this.dialog = false;
  }

  closeDelete() {
    this.dialogDelete = false;
  }

  save() {
    ConfigApi.updateConfig(this.configStore.getEditedConfig)
      .catch(err => {
        this.localErrorMessage = err;
        this.isSnackBarOpen = true;
      });
    this.configStore.updateConfig(this.configStore.getEditedConfig);
    this.close();
  }

  beforeMount() {
    ConfigApi.fetchAllConfigs().then(configs => {
      this.configStore.setConfigs(configs);
    })
      .catch(err => {
        this.localErrorMessage = err;
        this.isSnackBarOpen = true;
      });

  }

}

</script>