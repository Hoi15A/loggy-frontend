<template>
    <v-data-table
        :headers="columnHeaders"
        :items="Object.values($store.getters['config/getConfigById'](this.configName).columnComponents)"
        hide-default-footer
    >
      <template v-slot:body="props">
        <draggable
            :list="props.items"
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
import {Prop, Component} from "vue-property-decorator";
import "vue-class-component/hooks";
import Draggable from "vuedraggable";

@Component({
  components: {
    Draggable,
  }
})
export default class ColumnComponentsReorder extends Vue {
  @Prop(String) configName: string | undefined

  columnHeaders = [
    { text: "ID", value: "id"},
    { text: "Name", value: "name"},
    { text: "Format", value: "format"},
    { text: "Column Type", value: "columnType"},
  ];
}

</script>

<style scoped>

</style>