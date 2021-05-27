import Api from "@/api/api";

export default class PathApi extends Api {
  constructor() {
    super();
  }

  static async getRootOfLocalServer() {
    const res = await fetch(`${this.apiBaseUrl}/path`);
    if(!res.ok) {
      throw new Error(`Unable to fetch root of local server: \n ${res}`);
    }
    return res.json();
  }

  static async getContentOfFolder(folder: string) {
    const res = await fetch(`${this.apiBaseUrl}/path?folder=${folder}`);
    if(!res.ok) {
      throw new Error(`Unable to fetch content of folder with id: \n ${folder}`);
    }
    return res.json();
  }
}