import Api from "@/api/api";

export default class ColumnComApi extends Api {
    constructor() {
        super();
    }

    static async fetchColumnsById(id: number) {
        const res = await fetch(`${Api.getApiBaseUrl()}/column/${id}`);
        return res.json();
    }
}
