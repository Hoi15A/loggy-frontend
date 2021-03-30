<template>
  <v-form>
    <v-container>
      <v-row>
        <v-col>
          <v-select
            :items="items"
            label="Config"
          ></v-select>
        </v-col>
      </v-row>
    </v-container>
  </v-form>
</template>

<script>
import ServiceApi from "@/api/serviceApi";

export default {
  data: () => ({
    items: [],
    config: "Config 1",
  }),

  methods: {
    loadConfigs: async function() {
      const fetchedConfigs = await ServiceApi.fetchConfigs();
      console.log(fetchedConfigs);
      this.items = [];
      for(let i = 0; i < fetchedConfigs.length; i++) {
        this.items.push(fetchedConfigs[i].name);
      }
    },
  }


};
</script>

<style scoped>

</style>