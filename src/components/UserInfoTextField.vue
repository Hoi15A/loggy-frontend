<template>
  <v-form>
    <v-container>
      <v-row align="center">
        <v-col>
          <v-text-field
            counter
            label="Service Name"
            maxlength="30"
            v-model="name"
          >

          </v-text-field>
        </v-col>
        <v-col>
          <v-text-field
            label="Icon Link"
            maxlength="200"
            v-model="link"
          >
          </v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-textarea
            counter
            maxlength="200"
            no-resize
            rows="3"
            outlined
            name="input-7-4"
            label="Description"
            v-model="description"
          ></v-textarea>
        </v-col>
      </v-row>
    </v-container>
  </v-form>
</template>

<script>
export default {
  data () {
    return {
      name: "",
      link: "",
      description: "",
    };
  },

  methods: {
    getUserInfo() {
      return  [this.name, this.link, this.description];
    },


  }

};
</script>

<style scoped>

</style>