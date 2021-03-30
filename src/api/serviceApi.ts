import Api from "@/api/api";

export default class ServiceApi extends Api {
    constructor() {
        super();
    }

    static async makeSampleCall() {
        return await fetch(`${Api.getApiBaseUrl()}/query/sample`);

    }

    static async fetchServers() {
        const res = await fetch(`${Api.getApiBaseUrl()}/service/all`);
        return res.json();
    }

    static async removeServerById(id: number) {
        const res = await fetch(`${Api.getApiBaseUrl()}/service/${id}`, {
            method: "DELETE"
        });
        if(!res.ok) throw new Error(`Unable to delete job with id: ${id}`);
    }

    static async addNewService(jsonService: { image: string; logConfigName: string; logDirectory: string; name: string; description: string; logServiceLocation: string }) {
        const res = await fetch(`${Api.getApiBaseUrl()}/service/`, {method: "POST",
            headers: {
                "Content-Type": "application/json;charset=utf-8"
            },
            body: JSON.stringify(jsonService),
        });
        if (res.ok) {
            return res.json();
        } else {
            throw new Error(`Unable to create Service with Attributes:${JSON.stringify(jsonService)}`);
        }
    }
}