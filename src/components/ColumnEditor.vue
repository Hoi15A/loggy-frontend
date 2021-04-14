<template>
    <v-data-table :headers="tableHeaders" :items="tableContent">
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title>Column Components</v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-spacer></v-spacer>
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
                      <v-text-field v-model="editedItem.columnType" label="Column Type"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field v-model="editedItem.format" label="Format"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field v-model="editedItem.id" label="Id"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field v-model="editedItem.name" label="Name"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
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
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="closeDelete" >Cancel</v-btn>
                <v-btn color="blue darken-1" text @click="deleteItemConfirm" >OK</v-btn>
                <v-spacer></v-spacer>
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
import {ColumnComponent} from "@/models/ColumnComponent.ts";

export default Vue.extend({
  name: "ColumnEditor",
  data () {
    return {
      columnCompObject: {} as string[],
      dialog: false,
      dialogDelete: false,
      editedIndex: -1,
      tableHeaders: [] as string[],
      tableContent: [] as string[],
      editedItem: {} as ColumnComponent,
      defaultItem: {} as ColumnComponent,
    };
  },
  watch: {
    dialog (val) {
      val || this.close();
    },
    dialogDelete (val) {
      val || this.closeDelete();
    },
  },
  computed: {
    formTitle () {
      return this.editedIndex === -1 ? "New Column" : "Edit Column";
    },
  },
  methods: {
    editItem: async function(item) {
      this.editedIndex = this.tableContent.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },
    deleteItem: async function(item) {
      this.editedIndex = this.tableContent.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogDelete = true;
    },
    deleteItemConfirm: async function() {
      this.tableContent.splice(this.editedIndex, 1);
      this.closeDelete();
    },
    close: async function() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },
    save: async function() {
      if (this.editedIndex > -1) {
        Object.assign(this.tableContent[this.editedIndex], this.editedItem);
      } else {
        this.tableContent.push(this.editedItem);
      }
      await this.close();
    },
    closeDelete () {
      this.dialogDelete = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },
    fillTableHeaders: async function() {
      for(let i = 0; i < Object.keys(this.columnCompObject[0]).length; i++) {
        this.tableHeaders.push({
          text: Object.keys(this.columnCompObject[0])[i],
          value: Object.keys(this.columnCompObject[0])[i],
        });
      }
      this.tableHeaders.push({text: "Actions", value: "actions", sortable: false});
    },
    fillTableContent: async function() {
      for(let i = 0; i < Object.keys(this.columnCompObject).length; i++) {
        this.tableContent.push(Object.values(this.columnCompObject)[i]);
      }
      console.log(this.columnCompObject);
    },
    fetchAllColumns: async function () {
      this.columnCompObject = await ColumnCompApi.fetchAllColumnComponents();
    },
  },
  beforeMount: async function() {
    try {
      await this.fetchAllColumns();
      await this.fillTableHeaders();
      await this.fillTableContent();
    }
    catch (e) {
      console.error(e);
    }
  }
});
</script>
