import Vue from "vue";
import Vuex from "vuex";
import stepper from "./modules/stepper";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    stepper,
  }
});