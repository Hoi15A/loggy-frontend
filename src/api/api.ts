export default class Api {

    static async makeSampleCall() {
        return await fetch("https://zhaw.neat.moe/api/query/sample");
    }

    async fetchServers() {
        const res = await fetch("https://zhaw.neat.moe/api/service/all");
        console.log(res);
        return res.json();
    }

}