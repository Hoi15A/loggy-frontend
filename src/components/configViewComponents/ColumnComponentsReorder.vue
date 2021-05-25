<template>
    <v-data-table
        :headers="columnHeaders"
        :items="columnComponents"
        hide-default-footer
    >
      <template v-slot:body="props">
        <draggable
            v-model="columnComponents"
            tag="tbody"
        >
          <tr v-for="entry in props.items"
              :key="entry.id"
              v-bind:style="{cursor: 'move'}"
          >
            <td> {{ entry.id }} </td>
            <td> {{ entry.name }} </td>
            <td> {{ entry.format }} </td>
            <td> {{ entry.columnType }} </td>
          </tr>
        </draggable>
      </template>
    </v-data-table>
</template>

<script lang="ts">
import Vue from "vue";
import {Component} from "vue-property-decorator";
import "vue-class-component/hooks";
import Draggable from "vuedraggable";
import {getModule} from "vuex-module-decorators";
import ConfigStore from "@/store/modules/config";
import { ColumnComponent } from "@/models/columnComponent";
import { ColumnComponentOrder } from "@/models/columnComponentOrder";

@Component({
  components: {
    Draggable,
  }
})
export default class ColumnComponentsReorder extends Vue {
  configStore = getModule(ConfigStore);
  columnHeaders = [
    { text: "ID", value: "id"},
    { text: "Name", value: "name"},
    { text: "Format", value: "format"},
    { text: "Column Type", value: "columnType"},
  ];

  get columnComponents() {
    return Object.values(this.configStore.getEditedConfig.columnComponents);
  }
  
  set columnComponents(components: ColumnComponent[]) {
    const config = this.configStore.getEditedConfig;
    const componentOrder = {} as ColumnComponentOrder;
    for (let i = 0; i < components.length; i++) {
      componentOrder[i.toString()] = components[i];
    }
    config.columnComponents = componentOrder;
    this.configStore.setEditedConfig(config);
  }
}

</script>

<style scoped>

</style>