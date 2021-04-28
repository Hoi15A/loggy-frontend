import Api from "@/api/api";
import {Config} from "@/models/config";

export default class ConfigApi extends Api {
  constructor() {
    super();
  }

  static async fetchConfigById(name: string) {
    const res = await fetch(`${this.apiBaseUrl}/config/${name}`);
    return res.json();
  }

  static async fetchAllConfigs() {
    const res =  await fetch(`${this.apiBaseUrl}/config`);
    return res.json();
  }

  static async removeConfigById(name: string) {
    const res = await fetch(`${this.apiBaseUrl}/config/${name}`, {method: "DELETE"});
    return res.json();
  }

  static async updateConfig(config: Config) {
    const res = await fetch(`${this.apiBaseUrl}/config/`, {
      method: "PUT",
      body: JSON.stringify(config),
      headers: { "Content-Type": "application/json" },
    });
    return res.json();
  }

}