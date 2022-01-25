import { BaseService } from "./BaseService"

export class AuthService extends BaseService {

    constructor() {
        super('auth')
    }

    async authenticate() {
        let response = await this.http.get('')
        return response
    }
    
    async register(data) {
        const body = JSON.stringify(data)
        let response = await this.http.post("signup", body)
        return response
    }

    async login(data) {
        const body = JSON.stringify(data)
        let response = await this.http.post("login", body)
        return response
    }

    async logout() {
        let response = await this.http.get("logout")
        return response
    }

}