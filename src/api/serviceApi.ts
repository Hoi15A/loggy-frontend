export default class ServiceApi {

    static async makeSampleCall() {
        return await fetch("https://zhaw.neat.moe/api/query/sample");
    }

    async fetchServers() {
        const res = await fetch("https://zhaw.neat.moe/api/service/all");
        if(!res.ok) {
            throw Error(res.statusText);
        }
        return res.json();
    }

    async removeServerById(id: number) {
        const res = await fetch(`https://zhaw.neat.moe/api/service/${id}`, {
            method: "DELETE"
        });
        if(!res.ok) throw new Error(`Unable to delete job with id: ${id}`)
    }
}