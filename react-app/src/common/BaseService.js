import { HttpService } from "./HttpService";

export class BaseService {

    http

    constructor(url_prefix = "") {
        this.http = (new HttpService(url_prefix))
    }
}