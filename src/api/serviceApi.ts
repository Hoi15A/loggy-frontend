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
}