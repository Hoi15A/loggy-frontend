<template>
    <v-data-table :headers="tableHeaders" :items="tableContent">
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
import columnCompApi from "@/api/columnCompApi";
import {ColumnComponent} from "@/models/ColumnComponent.ts";

export default Vue.extend({
  name: "ColumnEditor",
  data () {
    return {
      dialog: false,
      dialogDelete: false,
      editedIndex: -1,
      tableHeaders: [] as object[],
      tableContent: [] as any[],
      columnCompObject: {} as any,
      editedItem: {} as ColumnComponent,
      defaultItem: {} as ColumnComponent,
      headerObject: {},
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
    formTitle(): string {
      return this.editedIndex === -1 ? "New Column" : "Edit Column";
    },
  },
  methods: {
    async editItem(item: ColumnComponent) {
      this.editedIndex = this.tableContent.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },
    async deleteItem(item: ColumnComponent) {
      this.editedIndex = this.tableContent.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogDelete = true;
    },
    async deleteItemConfirm() {
      this.tableContent.splice(this.editedIndex, 1);
      await this.removeColumn(this.editedItem.id);
      await this.closeDelete();
    },
    async close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },
    async save() {
      if (this.editedIndex > -1) {
        await this.updateColumnById(this.editedItem.id, this.editedItem);
        Object.assign(this.tableContent[this.editedIndex], this.editedItem);
      } else {
        await this.createNewColumn();
        this.tableContent.push(this.editedItem);
      }
      await this.close();
    },
    async closeDelete() {
      this.dialogDelete = false;
      this.$nextTick(async ()  => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },
    async fillTableHeaders() {
      for(let i = 0; i < Object.keys(this.columnCompObject[0]).length; i++) {
        this.tableHeaders.push({
          text: Object.keys(this.columnCompObject[0])[i].toUpperCase(),
          value: Object.keys(this.columnCompObject[0])[i],
        });
      }
      this.tableHeaders.push({text: "ACTIONS", value: "actions", sortable: false});
    },
    async fillTableContent() {
      for(let i = 0; i < Object.keys(this.columnCompObject).length; i++) {
        this.tableContent.push(Object.values(this.columnCompObject)[i]);
      }
    },
    async fetchAllColumns() {
      this.columnCompObject = await ColumnCompApi.fetchAllColumnComponents();
    },
    async createNewColumn() {
      await columnCompApi.createNewColumn(this.editedItem);
      return 1;
    },
    async removeColumn(id: number) {
      await columnCompApi.removeColumnById(id);
    },
    async updateColumnById(id: number, updatedItem: ColumnComponent) {
      await columnCompApi.updateColumnById(id, updatedItem);
    }
  },
  async beforeMount() {
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
