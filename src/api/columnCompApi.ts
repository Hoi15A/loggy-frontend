import Api from "@/api/api";

export default class ColumnCompApi extends Api {
  constructor() {
    super();
  }

  static async fetchColumnsById(id: number) {
    const res = await fetch(`${this.apiBaseUrl}/column/${id}`);
    if(!res.ok) {
      throw new Error(`Unable to fetch columns by id with id: \n ${id}`);
    }
    return res.json();
  }

  static async fetchAllColumnComponents() {
    const res = await fetch(`${this.apiBaseUrl}/column`);
    if(!res.ok) {
      throw new Error(`Unable to fetch columns:\n ${res}`);
    }
    return res.json();
  }

  static async createNewColumn(jsonService: {columnType: string; format: string; name: string}) {
    const res = await fetch(`${this.apiBaseUrl}/column/`, {method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8"
      },
      body: JSON.stringify(jsonService),
    });
    if(!res.ok) {
      throw new Error(`Unable to create a new column with Attributes:\n ${JSON.stringify(jsonService)}`);
    }
  }

  static async removeColumnById(id: number) {
    const res = await fetch(`${this.apiBaseUrl}/column/${id}`, {
      method: "DELETE"
    });
    if(!res.ok) throw new Error(`Unable to delete column with id: ${id}`);
  }

  static async updateColumnById(id: number, jsonService: {columnType: string; format: string; name: string}) {
    const res = await fetch(`${this.apiBaseUrl}/column/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json;charset=utf-8"
      },
      body: JSON.stringify(jsonService)
    });
    if (!res.ok) throw new Error(`Unable to update a column with Attributes: \n ${JSON.stringify(jsonService)}`);
    return res.json();
  }


}
