import Api from "@/api/api";

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

}