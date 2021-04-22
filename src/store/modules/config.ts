import {Config} from "@/models/config";

const state = () => ({
  configs: [] as Config [],
});

const getters = {
  getConfigs: (state: any) => state.configs,
  getConfigById: (state: any) => (configName: string) => {
    return state.configs.find((config: Config) => config.name === configName);
  }
};

const mutations = {
  setConfigs (state: any, configs: Config) {
    state.configs = configs;
  }
};

export default {
  namespaced: true,
  state,
  getters,
  mutations
};