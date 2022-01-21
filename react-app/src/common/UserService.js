import { BaseService } from "./BaseService"

export class UserService extends BaseService {

    constructor() {
        super('users')
    }

    async users() {
        let response = await this.http.get('')
        return response
    }
}