<template>
    <v-data-table
        :headers="headers"
        :items="ccStore.getColumnComponents"
        :items-per-page="20"
    >
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title>Column Components</v-toolbar-title>
          <v-divider class="mx-4" inset vertical/>
          <v-spacer/>
          <v-btn color="success" @click="createNewColumnComponent(newColumnComponent)">Add Column Component</v-btn>
        </v-toolbar>
          <v-dialog
              v-model="dialog"
              max-width="650px"
          >
          <ValidationObserver v-slot="{ invalid }">
            <v-card>
              <v-card-title>
                <span class="headline">{{ titleName }}</span>
              </v-card-title>

              <v-card-text>
                <ValidationProvider 
                  rules="required" 
                  v-slot="{ errors }"
                  name="column name"
                >
                <v-text-field
                    v-model="ccStore.getEditedColumnComponent.name"
                    label="Name"
                    :error-messages="errors"
                />
                </ValidationProvider>
                <ValidationProvider 
                  rules="required" 
                  v-slot="{ errors }"
                  name="log format"
                >
                <v-text-field
                    v-model="ccStore.getEditedColumnComponent.format"
                    label="Format"
                    :error-messages="errors"
                />
                </ValidationProvider>
                <ValidationProvider 
                  rules="required" 
                  v-slot="{ errors }"
                  name="column type"
                >
                <v-text-field
                    v-model="ccStore.getEditedColumnComponent.columnType"
                    label="Type"
                    :error-messages="errors"
                />
                </ValidationProvider>
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
                    :disabled="invalid"
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
        <v-icon  class="mr-2" @click="editColumnComponent(item)">mdi-pencil</v-icon>
        <v-icon  @click="deleteColumnComponent(item)">mdi-delete</v-icon>
      </template>
      <ErrorSnackbar
      v-bind:error-message="localErrorMessage"
      v-bind:snackbar="isSnackBarOpen"
      >
      </ErrorSnackbar>
    </v-data-table>
</template>

<script lang="ts">
import Vue from "vue";
import ColumnCompApi from "@/api/columnCompApi";
import "vue-class-component/hooks";
import Component from "vue-class-component";
import {getModule} from "vuex-module-decorators";
import ColumnCompStore from "@/store/modules/columnComponents";
import {ColumnComponent} from "@/models/columnComponent";
import ErrorSnackbar from "@/components/ErrorSnackbar.vue";
@Component({
  components: {ErrorSnackbar}
})
export default class ColumnEditor extends Vue{
  ccStore = getModule(ColumnCompStore);
  dialog = false
  dialogDelete = false
  titleName = ""
  localErrorMessage = "";
  isSnackBarOpen = false;
  isNewItem = false
  editedIndex = -1;
  newColumnComponent = {
    columnType: "",
    format: "",
    name: ""
  } as ColumnComponent;
  headers = [
    { text: "Name", value: "name" },
    { text: "Format", value: "format" },
    { text: "Column Type", value: "columnType" },
    { text: "Actions", value: "actions", sortable: false},
  ]

  createNewColumnComponent(newColumnComponent: ColumnComponent) {
    this.titleName = "Add new Component";
    this.ccStore.setEditedColumnComponent(newColumnComponent);
    this.isNewItem = true;
    this.dialog = true;
  }

  editColumnComponent(columnComponent: ColumnComponent) {
    this.titleName = "Edit Component";
    this.editedIndex = this.ccStore.getColumnComponents.indexOf(columnComponent);
    this.ccStore.setEditedColumnComponent(columnComponent);
    this.dialog = true;
  }

  deleteColumnComponent(columnComponent: ColumnComponent) {
    this.editedIndex = this.ccStore.getColumnComponents.indexOf(columnComponent);
    this.ccStore.setEditedColumnComponent(columnComponent);
    this.dialogDelete = true;
  }

  deleteConfigConfirm() {
    ColumnCompApi.removeColumnById(this.ccStore.getColumnComponents[this.editedIndex].id).then()
      .catch(err => {
        this.localErrorMessage = err;
        this.isSnackBarOpen = true;
      });
    this.ccStore.removeColumnComponent(this.editedIndex);
    this.closeDelete();
  }

  save() {
    if(this.isNewItem) {
      ColumnCompApi.createNewColumn(this.ccStore.getEditedColumnComponent)
        .catch(err => {
          this.localErrorMessage = err;
          this.isSnackBarOpen = true;
        });
      this.ccStore.updateColumnComponents(this.ccStore.getEditedColumnComponent);
      this.close();
    } else {
      ColumnCompApi.updateColumnById(this.ccStore.getEditedColumnComponent.id, this.ccStore.getEditedColumnComponent)
        .catch(err => {
          this.localErrorMessage = err;
          this.isSnackBarOpen = true;
        });
      this.ccStore.updateColumnComponents(this.ccStore.getEditedColumnComponent);
      this.close();
    }
  }

  close() {
    this.isNewItem = false;
    this.dialog = false;
  }
  closeDelete() {
    this.dialogDelete = false;
  }

  beforeMount() {
    ColumnCompApi.fetchAllColumnComponents().then(columnComponents => {
      this.ccStore.setColumnComponents(columnComponents);
    })
      .catch(err => {
        this.localErrorMessage = err;
        this.isSnackBarOpen = true;
      });
  }

}
</script>
