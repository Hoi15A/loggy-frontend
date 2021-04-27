<template>
    <v-data-table
        :headers="columnHeaders"
        :items="columnData"
        hide-default-footer
    >
      <template v-slot:body="props">
        <draggable :list="props.items" tag="tbody">
          <tr v-for="(entry, index) in props.items" :key="index" v-bind:style="{cursor: 'move'}">
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
import {ColumnComponent} from "@/models/columnComponent";
import {Config} from "@/models/config";



@Component({
  components: {
    Draggable,
  }
})
export default class ColumnComponentsReorder extends Vue {
  @Prop(String) configName: string | undefined

  columnHeaders = [] as object[];
  columnData = [] as ColumnComponent[];
  serviceConfig = {} as Config;

  created() {
    this.parseConfigs();
    this.fillHeader();
  }

  fillHeader() {
    this.columnHeaders.push({text: "ID"}, {text: "NAME"}, {text: "FORMAT"}, {text: "COLUMNTYPE"},);
  }

  parseConfigs() {
    this.serviceConfig = this.$store.getters["config/getConfigById"](this.configName);
    this.columnData = Object.values(this.serviceConfig.columnComponents);
  }

}

</script>

<style scoped>

</style>