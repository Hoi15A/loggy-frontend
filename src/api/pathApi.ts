import Api from "@/api/api";

export default class PathApi extends Api {
  constructor() {
    super();
  }

  static async getRootOfLocalServer() {
    return await fetch(`${this.apiBaseUrl}/path`);
  }

  static async getContentOfFolder(folder: string) {
    return await fetch(`${this.apiBaseUrl}/path?folder=${folder}`);
  }
}