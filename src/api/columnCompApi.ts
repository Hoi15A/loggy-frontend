import Api from "@/api/api";

export default class ColumnCompApi extends Api {
    constructor() {
        super();
    }

    static async fetchColumnsById(id: number) {
        const res = await fetch(`${this.apiBaseUrl}/column/${id}`);
        return res.json();
    }

    static async fetchAllColumnComponents() {
        const res = await fetch(`${this.apiBaseUrl}/column`);
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
            throw new Error(`Unable to create a new column with Attributes: ${JSON.stringify(jsonService)}`);
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
        if (!res.ok) throw new Error(`Unable to create a new column with Attributes: ${JSON.stringify(jsonService)}`);
        return res.json();
    }


}
