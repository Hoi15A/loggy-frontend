export class Api {

    static async makeSampleCall() {
        return await fetch("http://160.85.252.142:8080/query/sample");
    }
}
