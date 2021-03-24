const apiBaseUrl = "https://zhaw.neat.moe/api/";

export default class Api {

    static getApiBaseUrl() {
        return apiBaseUrl;
    }

    /**
     * Wrapper around fetch to enforce settings for all requests.
     *
     * @returns {Promise<Response>}
     */
    async customFetch(url: string) {
        const res = await fetch(url);
        if(!res.ok) {
            throw Error(res.statusText);
        }
        return res;
    }
}

