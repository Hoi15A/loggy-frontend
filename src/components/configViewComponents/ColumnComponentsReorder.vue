<template>
  <v-col>
    <v-row>
      <v-toolbar flat>
        <v-row>
          <v-col>
            <v-checkbox v-model="checkBoxEdit" :label="'Reorder'">
            </v-checkbox>
          </v-col>
          <v-col>
            <v-btn v-if="checkBoxEdit">
              Save
            </v-btn>
          </v-col>
          <v-col>

          </v-col>
        </v-row>
      </v-toolbar>
    </v-row>
    <v-row>
      <v-simple-table>
        <template v-slot:default>
          <thead>
          <tr>
            <th class="text-left">
              Name
            </th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="item in columns" :key="item.name">
            <td>{{ item.name }}</td>
          </tr>
          </tbody>
        </template>
      </v-simple-table>
    </v-row>
  </v-col>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "ConfigColoumTestComponent",

  data () {
    return {
      checkBoxEdit: false as boolean,
      columns: [
        {
          name: "Frozen Yogurt",
        },
        {
          name: "Ice cream sandwich",
        },
        {
          name: "Eclair",
        },
      ],
    };
  },
});
</script>

<style scoped>

</style>