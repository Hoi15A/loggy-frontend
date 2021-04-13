import Api from "@/api/api";
import {Config} from "@/models/config";

export default class ServiceApi extends Api {
  constructor() {
    super();
  }

  static async makeSampleCall() {
    return await fetch(`${this.apiBaseUrl}/query/sample`);
  }

  static async fetchServers() {
    const res = await fetch(`${this.apiBaseUrl}/service/all`);
    return res.json();
  }

  // TODO: Move 'config' calls to separate file.
  static async fetchConfigs(): Promise<Config[]> {
    const res = await fetch(`${this.apiBaseUrl}/config`);
    return res.json();
  }

  static async removeServerById(id: number) {
    const res = await fetch(`${this.apiBaseUrl}/service/${id}`, {
      method: "DELETE",
    });
    if (!res.ok) throw new Error(`Unable to delete job with id: ${id}`);
  }

  static async addNewService(jsonService: { image: string; logConfig: string; logDirectory: string; name: string; description: string; location: number }) {
    const res = await fetch(`${this.apiBaseUrl}/service/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify(jsonService),
    });
    if (!res.ok) {
      throw new Error(`Unable to create Service with Attributes:${JSON.stringify(jsonService)}`);
    }
  }

  static async addNewConfig(jsonService: string) {
    const res = await fetch(`${this.apiBaseUrl}/config/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: jsonService,
    });
    if (!res.ok) {
      throw new Error(`Unable to create Config: ${JSON.stringify(jsonService)}`);
    }
  }


}