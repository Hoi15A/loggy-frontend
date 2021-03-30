<template>
  <v-form>
    <v-container>
      <v-row>
        <v-col>
          <v-select
            :items="items"
            label="Config"
            v-model="config"
            placeholder="Config 1"
          ></v-select>
        </v-col>
      </v-row>
    </v-container>
  </v-form>
</template>

<script>
export default {
  data: () => ({
    items: ["Config 1"],
    config: "",
  }),
};
</script>

<style scoped>

</style>