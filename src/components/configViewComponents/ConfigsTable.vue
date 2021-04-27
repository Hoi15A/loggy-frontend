<template>
  <v-data-table
      :headers="headers"
      :items="configs"
      class="elevation-1"
  >
    <template v-slot:top>
        <v-dialog
            v-model="dialog"
            max-width="500px"
        >
          <v-card>
            <v-card-title>
              <span class="headline">Edit Config</span>
            </v-card-title>

            <v-card-text>
              <v-container>
                <v-row>
                  <v-col
                      cols="12"
                      sm="6"
                      md="4"
                  >
                    <v-text-field
                        v-model="editedConfig.name"
                        label="Config Name"
                    ></v-text-field>
                  </v-col>
                  <v-col
                      cols="12"
                      sm="6"
                      md="4"
                  >
                    <v-text-field
                        v-model="editedConfig.columnCount"
                        label="Column Count"
                    ></v-text-field>
                  </v-col>
                  <v-col
                      cols="12"
                      sm="6"
                      md="4"
                  >
                    <v-text-field
                        v-model="editedConfig.headerLength"
                        label="Header Length"
                    ></v-text-field>
                  </v-col>
                  <v-col
                      cols="12"
                      sm="6"
                      md="4"
                  >
                    <v-text-field
                        v-model="editedConfig.separator"
                        label="Separator"
                    ></v-text-field>
                  </v-col>
                </v-row>
              </v-container>
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
        <v-dialog v-model="dialogDelete" max-width="500px">
          <v-card>
            <v-card-title class="headline">Are you sure you want to delete this item?</v-card-title>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="closeDelete">Cancel</v-btn>
              <v-btn color="blue darken-1" text @click="deleteConfigConfirm">OK</v-btn>
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
import {Config} from "@/models/config";
import ConfigApi from "@/api/configApi";

export default Vue.extend({
  name: "ConfigsTable",
  data: () => ({
    dialog: false,
    dialogDelete: false,
    configs: [] as Config[],
    editedConfig: {} as Config,
    editedIndex: -1,
    headers: [
      { text: "Name", value: "name" },
      { text: "Column Count", value: "columnCount" },
      { text: "HeaderLength", value: "headerLength" },
      { text: "Separator", value: "separator" },
      { text: "Actions", value: "actions", sortable: false},
    ],
  }),

  methods: {
    editConfig(config: Config) {
      this.editedIndex = this.configs.indexOf(config);
      this.editedConfig = Object.assign({}, config);
      this.dialog = true;
    },
    deleteConfig(config: Config) {
      this.editedIndex = this.configs.indexOf(config);
      this.editedConfig = Object.assign({}, config);
      this.dialogDelete = true;
    },
    deleteConfigConfirm() {
      ConfigApi.removeConfigById(this.configs[this.editedIndex].name).then();
      this.configs.splice(this.editedIndex, 1);
      this.closeDelete();
    },
    close() {
      this.dialog = false;
      this.editedIndex = -1;
    },
    closeDelete() {
      this.dialogDelete = false;
    },
    save() {
      ConfigApi.updateConfig(this.editedConfig).then();
      this.close();
    }
  },

  beforeMount() {
    ConfigApi.fetchAllConfigs().then(configs => {
      this.configs = configs;
    });
  }

});

</script>