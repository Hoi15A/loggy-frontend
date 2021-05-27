import Api from "./api";

export default class QueryApi extends Api {

  static async query(id: number, queries: any []) {
    const res = await fetch(`${this.apiBaseUrl}/query/${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify(queries),
    });
    if(!res.ok) {
      throw new Error(`Unable to query id: ${id} with queries: \n ${queries}`);
    }
    return res.json();
  }
}