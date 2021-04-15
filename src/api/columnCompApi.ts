import Api from "@/api/api";

export default class ColumnCompApi extends Api {
    constructor() {
        super();
    }

    static async fetchColumnsById(id: number) {
        const res = await fetch(`${Api.getApiBaseUrl()}/column/${id}`);
        return res.json();
    }

    static async fetchAllColumnComponents() {
        const res = await fetch(`${Api.getApiBaseUrl()}/column`);
        return res.json();
    }

    static async createNewColumn(jsonService: {columnType: string; format: string; name: string}) {
        const res = await fetch(`${Api.getApiBaseUrl()}/column/`, {method: "POST",
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
        const res = await fetch(`${Api.getApiBaseUrl()}/column/${id}`, {
            method: "DELETE"
        });
        if(!res.ok) throw new Error(`Unable to delete column with id: ${id}`);
    }
}
