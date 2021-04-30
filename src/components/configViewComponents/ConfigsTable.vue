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
          <v-card>
            <v-card-title>
              <span class="headline">Edit Config</span>
            </v-card-title>

            <v-card-text>
              <v-text-field
                  v-model="editedConfig.name"
                  label="Config Name"
              ></v-text-field>
              <v-text-field
                  v-model="editedConfig.columnCount"
                  label="Column Count"
              ></v-text-field>
              <v-text-field
                  v-model="editedConfig.headerLength"
                  label="Header Length"
              ></v-text-field>
              <v-text-field
                  v-model="editedConfig.separator"
                  label="Separator"
              ></v-text-field>
              <ColumnComponentsReorder v-bind:config-name="editedConfig.name" />
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
                  @click="save"
              >
                Save
              </v-btn>
            </v-card-actions>
          </v-card>
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

@Component({
  components: {
    ColumnComponentsReorder
  },
})
export default class ConfigsTable extends Vue {
  configStore = getModule(ConfigStore);
  dialog = false;
  dialogDelete = false;
  editedConfig = {} as Config;
  editedIndex = -1;
  headers = [
    { text: "Name", value: "name" },
    { text: "Column Count", value: "columnCount" },
    { text: "HeaderLength", value: "headerLength" },
    { text: "Separator", value: "separator" },
    { text: "Actions", value: "actions", sortable: false},
  ];

  editConfig(config: Config) {
    this.editedIndex = this.configStore.getConfigs.indexOf(config);
    this.editedConfig = Object.assign({}, config);
    this.dialog = true;
  }

  deleteConfig(config: Config) {
    this.editedIndex = this.configStore.getConfigs.indexOf(config);
    this.editedConfig = Object.assign({}, config);
    this.dialogDelete = true;
  }

  deleteConfigConfirm() {
    ConfigApi.removeConfigById(this.configStore.getConfigs[this.editedIndex].name).then();
    this.configStore.removeConfig(this.editedIndex);
    this.closeDelete();
  }

  close() {
    this.dialog = false;
    this.editedConfig = {} as Config;
    this.editedIndex = -1;
  }

  closeDelete() {
    this.dialogDelete = false;
  }

  save() {
    ConfigApi.updateConfig(this.editedConfig)
      .catch(err => console.log(err));
    this.configStore.updateConfig(this.editedConfig);
    this.close();
  }

  beforeMount() {
    ConfigApi.fetchAllConfigs().then(configs => {
      this.configStore.setConfigs(configs);
    });
  }

}

</script>