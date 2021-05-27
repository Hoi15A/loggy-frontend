import Api from "@/api/api";
import {Config} from "@/models/config";
import { Server } from "@/models/server";

export default class ServiceApi extends Api {
  constructor() {
    super();
  }

  static async fetchServers() {
    const res = await fetch(`${this.apiBaseUrl}/service/all`);
    if(!res.ok) {
      throw new Error(`Unable to fetch servers: \n ${res}`);
    }
    return res.json();
  }

  // TODO: Move 'config' calls to separate file.
  static async fetchConfigs(): Promise<Config[]> {
    const res = await fetch(`${this.apiBaseUrl}/config`);
    if(!res.ok) {
      throw new Error(`Unable to fetch configs: \n ${res}`);
    }
    return res.json();
  }

  static async fetchServerById(id: number): Promise<Server> {
    return (await fetch(`${this.apiBaseUrl}/service/${id}`)).json();
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
      throw new Error(`Unable to create Service with Attributes: \n${JSON.stringify(jsonService)}`);
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

  static async updateService(service: Server) {
    const res = await fetch(`${this.apiBaseUrl}/service/`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify(service),
    });
    if (!res.ok) {
      throw new Error(`Unable to update Service with Attributes:${JSON.stringify(service)}`);
    }
  }


}
