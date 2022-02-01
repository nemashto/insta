import { BaseService } from "./BaseService"

export class CommentService extends BaseService {

    constructor() {
        super('comments')
    }

    async create(data) {
        const body = JSON.stringify(data)
        let response = await this.http.post("new", body)
        return response
    }
}