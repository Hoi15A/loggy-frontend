import Vue from "vue";
import Vuex from "vuex";
import stepper from "./modules/stepper";
import config from "./modules/config";
import homeServices from "./modules/homeServices";
import query from "./modules/query";


Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    stepper,
    config,
    homeServices,
    query,
  }
});
