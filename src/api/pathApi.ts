import Api from "@/api/api";

export default class PathApi extends Api {
  constructor() {
    super();
  }

  static async getRootOfLocalServer() {
    const res = await fetch(`${this.apiBaseUrl}/path`);
    return res.json();
  }

  static async getContentOfFolder(folder: string) {
    const res = await fetch(`${this.apiBaseUrl}/path?folder=${folder}`);
    return res.json();
  }
}