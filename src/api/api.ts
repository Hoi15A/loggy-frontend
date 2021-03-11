export class Api {

    static async makeSampleCall() {
        return await fetch("https://zhaw.neat.moe/api/query/sample");
    }
}