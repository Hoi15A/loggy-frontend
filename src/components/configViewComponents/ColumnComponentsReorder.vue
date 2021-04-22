<template>
    <v-data-table
        :headers="columnHeaders"
        :items="columnData"
    >
      <template v-slot:body="props">
        <draggable :list="props.items" tag="tbody">
          <tr v-for="(entry, index) in props.items" :key="index">
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

  columnHeaders = [] as string[];
  columnData = [] as ColumnComponent[];
  serviceConfig = {} as Config;

  async created() {
    await this.parseConfigs();
    this.fillHeader();
  }

  fillHeader() {
    this.columnHeaders.push({text: "ID"}, {text: "NAME"}, {text: "FORMAT"}, {text: "COLUMNTYPE"});
  }

  async parseConfigs() {
    this.serviceConfig = this.$store.getters["config/getConfigById"](this.configName);
    for(let i = 0; i < Object.keys(this.serviceConfig.columnComponents).length; i++) {
      this.columnData.push(Object.values(this.serviceConfig.columnComponents)[i]);
    }
  }

}

</script>

<style scoped>

</style>