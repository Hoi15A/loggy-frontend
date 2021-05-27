<template>
  <ValidationObserver>
    <v-form>
      <v-container>
        <v-row>
          <ValidationProvider 
            rules="required" 
            v-slot="{ errors }"
            name="log config"
          >
          <v-select 
            :items="items" 
            label="Config" 
            v-model="selectedConfig"
            outlined
            :error-messages="errors"
          />
          </ValidationProvider>
          <v-spacer/>
          <NewConfigSideWindow v-on:newConfigSuccess="loadConfigs()"/>
        </v-row>
      </v-container>
    </v-form>
  </ValidationObserver>
</template>

<script lang="ts">
import Vue from "vue";
import ServiceApi from "@/api/serviceApi";
import NewConfigSideWindow from "@/components/homeView/stepperComponents/NewConfigSideWindow.vue";
import {Component} from "vue-property-decorator";
import { extend } from "vee-validate";
import { required } from "vee-validate/dist/rules";

extend("required", required);

@Component({
  components: {
    NewConfigSideWindow,
  },
})
export default class ConfigSelectForm extends Vue {
  items = [] as string[];
  cardVisible = false;
  selectedConfig = undefined;

  async loadConfigs() {
    const fetchedConfigs = await ServiceApi.fetchConfigs();
    fetchedConfigs.forEach(config => this.items.push(config.name));
  }

  onOpenCard() {
    this.cardVisible = true;
  }
}
</script>

<style scoped>

</style>
