import {Config} from "@/models/config";
import {Module, Mutation, VuexModule} from "vuex-module-decorators";
import store from "@/store";

@Module({dynamic: true, store, name: "configstore"})
export default class ConfigStore extends VuexModule {
  configs = [] as Config[];
  editedConfig = {} as Config;

  @Mutation
  setConfigs (configs: Config[]) {
    this.configs = configs;
  }

  @Mutation
  setEditedConfig(config: Config) {
    this.editedConfig = config;
  }

  @Mutation
  removeConfig(index: number) {
    this.configs.splice(index, 1);
  }

  @Mutation
  updateConfig(config: Config) {
    const oldConfig = this.configs.find(oConfig => oConfig.name === config.name) as Config;
    const index = this.configs.indexOf(oldConfig);
    this.configs[index] = config;
  }

  get getConfigs() {
    return this.configs;
  }

  get getEditedConfig() {
    return this.editedConfig;
  }

  get getConfigById() {
    return (configName: string) => {
      return this.configs.find((config: Config) => config.name === configName);
    };
  }
}