import { BaseService } from "./BaseService"

export class ProfileService extends BaseService {

    constructor() {
        super('users')
    }

    async get(username) {
        let response = await this.http.get(String(username))
        return response
    }

    async getAll() {
        let response = await this.http.get('suggested')
        return response
    }

    async getFollowing(id) {
        let response = await this.http.get(String(id) +'/following')
        return response
    }

    async getFollow(id) {
        let response = await this.http.get(String(id) +'/updatefollowing')
        return response
    }

    async isGetFollowing(id) {
        let response = await this.http.get(String(id) +'/isfollowing')
        return response
    }
}