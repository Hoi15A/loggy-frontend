<template>
  <v-app id="inspire">
    <v-app-bar
        app
        color="white"
        flat
    >
      <v-container class="py-0 fill-height">
        <v-avatar
            class="mr-10"
            color="grey darken-1"
            size="32"
        ></v-avatar>

        <v-btn
            v-for="link in links"
            :key="link"
            text
        >
          {{ link }}
        </v-btn>

        <v-spacer></v-spacer>

        <v-responsive max-width="260">
          <v-text-field
              dense
              flat
              hide-details
              rounded
              solo-inverted
          ></v-text-field>
        </v-responsive>
      </v-container>
    </v-app-bar>

	  <v-main class="grey lighten-3">
		  <v-container>
			  <v-row>
				  <v-col cols="2">
					  <v-sheet rounded="lg">
						  <v-list color="transparent">
							  <v-list-item v-for="item in listItem" :key="item" link>
								  <v-list-item-content>
									  <v-list-item-title>
										  {{ item }}
									  </v-list-item-title>
								  </v-list-item-content>
							  </v-list-item>

							  <v-divider class="my-2"></v-divider>

							  <v-list-item
								  link
								  color="grey lighten-4"
							  >
								  <v-list-item-content>
									  <v-list-item-title @click="changeGridView()">
										  Refresh
									  </v-list-item-title>
								  </v-list-item-content>
							  </v-list-item>
						  </v-list>
					  </v-sheet>
				  </v-col>

				  <v-col>
            <v-sheet v-if="this.gridView" min-height="70vh" rounded="lg">
              <LogGrid/>
            </v-sheet>
            <v-sheet v-if="!this.gridView" min-height="70vh" rounded="lg">
              <LogFile/>
            </v-sheet>
				  </v-col>
			  </v-row>
		  </v-container>
	  </v-main>
  </v-app>
</template>

<script lang="ts">
import Vue from "vue";
import LogFile from "./components/LogFile.vue";
import LogGrid from "./components/LogGrid.vue";


export default Vue.extend({
  name: "App",

  components: {
    LogFile,LogGrid
  },

  data: () => ({
    gridView: true,
    links: [
      "Feature 1",
      "Feature 2",
      "Feature 3",
      "Feature 4",
    ],
    listItem: [
      "Live Logs",
      "Errors",
      "Archive",
    ]
  }),
  methods: {
    changeGridView: async function () {
      this.gridView = !this.gridView;
    }
  },
});
</script>
