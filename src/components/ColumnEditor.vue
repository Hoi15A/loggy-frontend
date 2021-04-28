<template>
    <v-data-table :headers="tableHeaders" :items="columnComponentsArr">
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title>Column Components</v-toolbar-title>
          <v-divider class="mx-4" inset vertical/>
          <v-spacer/>
          <v-dialog v-model="dialog" width="900px">
            <template v-slot:activator="{ on, attrs }">
              <v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on">Add Column</v-btn>
            </template>
            <v-card>
              <v-card-title>
                <span class="headline">{{ formTitle }}</span>
              </v-card-title>
              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field v-model="editedItem.columnType" label="Column Type"/>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field v-model="editedItem.format" label="Format"/>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field v-model="editedItem.name" label="Name"/>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>
              <v-card-actions>
                <v-spacer/>
                <v-btn color="blue darken-1" text @click="close">
                  Cancel
                </v-btn>
                <v-btn color="blue darken-1" text @click="save">
                  Save
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
          <v-dialog v-model="dialogDelete" max-width="500px">
            <v-card>
              <v-card-title class="headline">Are you sure you want to delete this item?</v-card-title>
              <v-card-actions>
                <v-spacer/>
                <v-btn color="blue darken-1" text @click="closeDelete" >Cancel</v-btn>
                <v-btn color="blue darken-1" text @click="deleteItemConfirm" >OK</v-btn>
                <v-spacer/>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-toolbar>
      </template>
      <template v-slot:item.actions="{ item }">
        <v-icon  class="mr-2" @click="editItem(item)">mdi-pencil</v-icon>
        <v-icon  @click="deleteItem(item)">mdi-delete</v-icon>
      </template>
    </v-data-table>
</template>

<script lang="ts">
import Vue from "vue";
import ColumnCompApi from "@/api/columnCompApi";
import {ColumnComponent} from "@/models/columnComponent.ts";
import "vue-class-component/hooks";
import Component from "vue-class-component";

@Component
export default class ColumnEditor extends Vue{
  dialog = false;
  dialogDelete = false;
  editedIndex = -1;
  columnComponentsArr = [] as ColumnComponent[];
  editedItem = {} as ColumnComponent;
  defaultItem = {} as ColumnComponent;
  tableHeaders = [] as object[];


  get formTitle(): string {
    return this.editedIndex === -1 ? "New Column" : "Edit Column";
  }

  editItem(item: ColumnComponent) {
    this.editedIndex = this.columnComponentsArr.indexOf(item);
    this.editedItem = Object.assign({}, item);
    this.dialog = true;
  }

  deleteItem(item: ColumnComponent) {
    this.editedIndex = this.columnComponentsArr.indexOf(item);
    this.editedItem = Object.assign({}, item);
    this.dialogDelete = true;
  }

  deleteItemConfirm() {
    this.columnComponentsArr.splice(this.editedIndex, 1);
    this.removeColumn(this.editedItem.id);
    this.closeDelete();
  }

  close() {
    this.dialog = false;
    this.$nextTick(() => {
      this.editedItem = Object.assign({}, this.defaultItem);
      this.editedIndex = -1;
    });
  }

  save() {
    if (this.editedIndex > -1) {
      this.updateColumnById(this.editedItem.id, this.editedItem);
      Object.assign(this.columnComponentsArr[this.editedIndex], this.editedItem);
    } else {
      this.createNewColumn();
      this.columnComponentsArr.push(this.editedItem);
    }
    this.close();
  }

  closeDelete() {
    this.dialogDelete = false;
    this.$nextTick(()  => {
      this.editedItem = Object.assign({}, this.defaultItem);
      this.editedIndex = -1;
    });
  }

  fetchAllColumns() {
    ColumnCompApi.fetchAllColumnComponents().then(columnComponents => {
      this.columnComponentsArr = columnComponents;
      this.fillTableHeaders();
    }).catch((err) => {
      console.error(err);
    });
  }

  fillTableHeaders() {
    for(let i = 0; i < Object.keys(this.columnComponentsArr[0]).length; i++) {
      this.tableHeaders.push({
        text: Object.keys(this.columnComponentsArr[0])[i].toUpperCase(),
        value: Object.keys(this.columnComponentsArr[0])[i], sortable: true
      });
    }
    this.tableHeaders.push({text: "ACTIONS", value: "actions", sortable: false});
  }

  createNewColumn() {
    ColumnCompApi.createNewColumn(this.editedItem);
  }

  removeColumn(id: number) {
    ColumnCompApi.removeColumnById(id);
  }

  updateColumnById(id: number, updatedItem: ColumnComponent) {
    ColumnCompApi.updateColumnById(id, updatedItem);
  }

  beforeMount() {
    this.fetchAllColumns();
  }
}
</script>
