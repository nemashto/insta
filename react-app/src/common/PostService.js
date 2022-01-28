import { string } from "prop-types"
import { BaseService } from "./BaseService"

export class PostService extends BaseService {

    constructor() {
        super('posts')
    }

    async getAll() {
        let response = await this.http.get("")
        return response
    }

    async getUserPosts(id) {
        let response = await this.http.get("u/" + String(id))
        return response
    }

    async create(data) {
        const body = JSON.stringify(data)
        let response = await this.http.post("new", body)
        return response
    }
}