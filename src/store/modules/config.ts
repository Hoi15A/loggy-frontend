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
  setConfigs (state: any, configs: Config[]) {
    state.configs = configs;
  },
  removeConfig(state: any, index: number) {
    state.configs.splice(index, 1);
  },
  updateConfig(state: any, config: Config) {
    const index = state.configs.indexOf(state.configs.find((oldConfig: Config) => oldConfig.name === config.name));
    state.configs[index] = config;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  mutations
};