import Vue from "vue";
import Vuex from "vuex";
import stepper from "./modules/stepper";


Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    stepper,
  }
});
export default store;
