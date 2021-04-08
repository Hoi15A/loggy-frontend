<template>
  <v-form>
    <v-container>
      <v-row>
        <v-select :items="items" label="Config"></v-select>
        <v-spacer></v-spacer>
        <NewConfigSideWindow v-on:newConfigSuccess="loadConfigs()"/>
      </v-row>
    </v-container>
  </v-form>
</template>

<script>
import ServiceApi from "@/api/serviceApi";
import NewConfigSideWindow from "@/components/stepperComponents/NewConfigSideWindow";
import Vue from "vue";

export default Vue.extend({
  components: {NewConfigSideWindow},
  data: () => ({
    items: [],
    cardVisible: false,
  }),

  methods: {
    loadConfigs: async function() {
      const fetchedConfigs = await ServiceApi.fetchConfigs();
      this.items = [];
      for(let i = 0; i < fetchedConfigs.length; i++) {
        this.items.push(fetchedConfigs[i].name);
      }
    },

    onOpenCard() {
      this.cardVisible = true;
    }
  }


});
</script>

<style scoped>

</style>