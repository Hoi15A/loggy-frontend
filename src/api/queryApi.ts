import Api from "./api";

export default class QueryApi extends Api { 
  static async query(id: number) {
    return (await fetch(`${this.apiBaseUrl}/query/${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      }
    })).json();
  }
}