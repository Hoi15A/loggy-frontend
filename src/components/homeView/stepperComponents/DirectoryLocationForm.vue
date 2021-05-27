<template>
  <ValidationObserver>
    <v-form>
      <v-container>
        <ValidationProvider 
          rules="required" 
          v-slot="{ errors }"
          name="log service location"
        >
          <v-select
              v-model="location"
              outlined
              :items="['Local', 'Remote']"
              label="Log Service Location"
              :error-messages="errors"
          />
        </ValidationProvider>
        <v-row>
          <v-col>
            <v-treeview
                v-model="selection"
                :items="items"
                :load-children="fetchSubFolders"
                selectable
                return-object/>
          </v-col>
          <v-divider vertical/>
          <v-col
              class="pa-6"
              cols="6">
            <template v-if="!selection.length">
              No nodes selected.
            </template>
            <template v-else>
              <div
                  v-for="node in selection"
                  :key="node.id">
                {{ node.fullpath }}
              </div>
            </template>
          </v-col>
        </v-row>
      </v-container>
    </v-form>
    <ErrorSnackbar
        v-bind:snackbar="isSnackBarOpen"
        v-bind:error-message="localErrorMessage"
      ></ErrorSnackbar>
  </ValidationObserver>
</template>

<script lang="ts">
import Vue from "vue";
import PathApi from "@/api/pathApi";
import { Directory } from "@/models/directory";
import {Component} from "vue-property-decorator";
import "vue-class-component/hooks";
import { extend } from "vee-validate";
import { required } from "vee-validate/dist/rules";
import ErrorSnackbar from "@/components/ErrorSnackbar.vue";

extend("required", required);
@Component({
  components: {ErrorSnackbar}
})
export default class DirectoryLocationForm extends Vue {
  location = "LOCAL"; // local (1), remote (0)
  selection = [];
  localErrorMessage = "";
  isSnackBarOpen = false;
  items = [];

  fetchRootFolder() {
    PathApi.getRootOfLocalServer().then(res => {
      this.items = res;
    }).catch((err) => {
      this.items = [];
      this.localErrorMessage = err;
      this.isSnackBarOpen = true;
    });
  }

  fetchSubFolders(item: Directory) {
    PathApi.getContentOfFolder(item.fullpath).then(res => {
      item.children = res;
    }).catch((err) => {
      this.localErrorMessage = err;
      this.isSnackBarOpen = true;
    });
  }

  beforeMount() {
    this.fetchRootFolder();
  }
}
</script>

<style scoped>

</style>
