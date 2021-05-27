import Api from "@/api/api";
import {Config} from "@/models/config";

export default class ConfigApi extends Api {
  constructor() {
    super();
  }

  static async fetchConfigById(name: string) {
    const res = await fetch(`${this.apiBaseUrl}/config/${name}`);
    if(!res.ok) {
      throw new Error(`Unable to fetch config with name: ${name}`);
    }
    return res.json();
  }

  static async fetchAllConfigs() {
    const res =  await fetch(`${this.apiBaseUrl}/config`);
    if(!res.ok) {
      throw new Error(`Unable to fetch configs: \n ${res}`);
    }
    return res.json();
  }

  static async removeConfigById(name: string) {
    const res = await fetch(`${this.apiBaseUrl}/config/${name}`, {method: "DELETE"});
    if(!res.ok) {
      throw new Error(`Unable to delete config with name: \n ${name}`);
    }
    return res.json();
  }

  static async updateConfig(config: Config) {
    const res = await fetch(`${this.apiBaseUrl}/config/`, {
      method: "PUT",
      body: JSON.stringify(config),
      headers: { "Content-Type": "application/json" },
    });
    if(!res.ok) {
      throw new Error(`Unable to update config: \n ${config}`);
    }
    return res.json();
  }

}