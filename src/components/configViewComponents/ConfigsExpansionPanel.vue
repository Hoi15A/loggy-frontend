<template>
  <v-expansion-panels popout focusable multiple>
    <v-expansion-panel v-for="(config) in $store.getters['config/getConfigs']"
                       v-bind:key="config.name"
    >
      <v-expansion-panel-header
          class="font-weight-medium"
          align="center"
      >
        {{ config.name}}
      </v-expansion-panel-header>
      <v-expansion-panel-content>
        <v-toolbar flat>
          <v-spacer/>
          <v-icon class ="mr-2" @click="editConfigDialog = true">mdi-pencil</v-icon>
          <v-icon @click="deleteConfig()">mdi-delete</v-icon>
          <v-dialog v-model="editConfigDialog" v-bind:config="config">
            <v-card>
              <v-card-title>
                Edit Configuration: {{ config.name }}
              </v-card-title>
              <template>
                <ConfigEditor/>
              </template>
            </v-card>
          </v-dialog>
        </v-toolbar>
        <ColumnComponentsReorder
            v-bind:config-name="config.name"
        >
        </ColumnComponentsReorder>
      </v-expansion-panel-content>
    </v-expansion-panel>
  </v-expansion-panels>

</template>



<script lang="ts">

import Vue from "vue";
import ConfigApi from "@/api/configApi";
import ColumnComponentsReorder from "@/components/configViewComponents/ColumnComponentsReorder.vue";
import ConfigEditor from "@/components/configViewComponents/ConfigEditor.vue";
import Component from "vue-class-component";
import "vue-class-component/hooks";

@Component({
  components: {
    ColumnComponentsReorder,
    ConfigEditor
  },
})
export default class ConfigsExpansionPanel extends Vue {
  editConfigDialog = false;
  checkBoxEdit = false;

  loadConfigs() {
    ConfigApi.fetchAllConfigs().then(configs => {
      this.$store.commit("config/setConfigs", configs);
    });
  }

  beforeMount() {
    this.loadConfigs();
  }
}

</script>

<style scoped>

</style>