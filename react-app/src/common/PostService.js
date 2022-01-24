import { BaseService } from "./BaseService"

export class PostService extends BaseService {

    constructor() {
        super('posts')
    }

    async create(data) {
        const body = JSON.stringify(data)
        let response = await this.http.post("new", body)
        return response
    }
}