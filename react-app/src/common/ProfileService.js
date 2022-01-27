import { BaseService } from "./BaseService"

export class ProfileService extends BaseService {

    constructor() {
        super('users')
    }

    async getAll() {
        let response = await this.http.get('suggested')
        return response
    }

    async getFollow(id) {
        let response = await this.http.get(String(id) +'/follow')
        return response
    }
}