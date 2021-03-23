<template>
  <v-form>
    <v-container>
      <v-row>
        <v-col>
          <v-select
            :items="items"
            label="Select "
            v-model="config"
          ></v-select>
        </v-col>
      </v-row>
    </v-container>
  </v-form>
</template>

<script>
export default {
  data: () => ({
    items: ["Config 1", "Config 2", "Config 3", "Config 3"],
    config: "",
  }),

  methods: {
    getConfigInfo() {
      return this.config;
    },
  }
};
</script>

<style scoped>

</style>