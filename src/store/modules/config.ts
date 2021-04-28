import {Config} from "@/models/config";
import {Module, Mutation, VuexModule} from "vuex-module-decorators";

@Module({name: "configstore"})
export default class ConfigStore extends VuexModule {
  configs = [] as Config[];

  @Mutation
  setConfigs (configs: Config[]) {
    this.configs = configs;
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

  get getConfigById() {
    return (configName: string) => {
      return this.configs.find((config: Config) => config.name === configName);
    };
  }
}