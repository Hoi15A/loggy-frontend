<template>
  <div class="text-center">
    <v-menu v-model="menu" :close-on-content-click="false" :nudge-width="300" offset-x>
      <template v-slot:activator="{ on, attrs }">
        <v-btn color="primary" dark v-bind="attrs" v-on="on">
          <v-icon color="white">mdi-plus</v-icon>
        </v-btn>
      </template>
      <v-card>
        <v-card-title class="headline">
          Add new Config
        </v-card-title>

        <v-row>
          <v-col>
            <v-textarea class="ma-1" rows="3" outlined name="input-7-4" label="Config JSON" v-model="newConfigJson">

            </v-textarea>
          </v-col>
        </v-row>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" text v-on:click="onSave()">
            Save
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-menu>
  </div>
</template>

<script>
import serviceApi from "@/api/serviceApi";

export default {
  name: "newConfigSideWindow",
  data: () => ({
    newConfigJson: "{\n" +
      "  \"name\": \"Test\",\n" +
      "  \"columnCount\": 5,\n" +
      "  \"headerLength\": 0,\n" +
      "  \"separator\": \"    \"\n" +
      "}",
    menu: false,
  }),

  methods:{
    onSave: async function () {
      try {
        await serviceApi.addNewConfig(this.newConfigJson);
        this.$emit("newConfigSuccess");
        this.menu = false;
      } catch (e) {
        console.log(this.newConfigJson);
      }
    }
  }
};
</script>

<style scoped>

</style>