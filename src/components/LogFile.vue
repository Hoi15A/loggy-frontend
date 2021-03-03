<template>
  <json-view
    :data="testJson"
    rootKey="view"
    :maxDepth="1"
    :styles="{ key: '#0977e6' }"
  />
</template>

<script lang="ts">
import Vue from "vue";

import { JSONView } from "vue-json-component";
export default Vue.extend({
  name: "LogFile",
  components: {"json-view": JSONView},

  data: () => ({
    testJson: [
      {
        "glossary": {
          "title": "example glossary",
          "GlossDiv": {
            "title": "S",
            "GlossList": {
              "GlossEntry": {
                "ID": "SGML",
                "SortAs": "SGML",
                "GlossTerm": "Standard Generalized Markup Language",
                "Acronym": "SGML",
                "Abbrev": "ISO 8879:1986",
                "GlossDef": {
                  "para": "A meta-markup language, used to create markup languages such as DocBook.",
                  "GlossSeeAlso": ["GML", "XML"]
                },
                "GlossSee": "markup"
              }
            }
          }
        }
      }
    ]
  }),
});
</script>
