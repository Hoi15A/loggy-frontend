import Api from "./api";
import { QueryComponent } from "@/models/queryComponent";

export default class QueryApi extends Api {

  static async query(id: number, queries: Map<string, QueryComponent>) {
    const values: QueryComponent[] = [];
    queries.forEach((value) => values.push(value));
    const res = await fetch(`${this.apiBaseUrl}/query/${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify(values),
    });
    return res.json();
  }
}
