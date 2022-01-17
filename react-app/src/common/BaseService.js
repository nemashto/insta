import { HttpService } from "./HttpService";

export class BaseService {

    constructor(url_prefix = "") {
        this.http = (new HttpService(url_prefix))
    }

    async post(body) {
        return await this.http.post(``, body)
    }
}