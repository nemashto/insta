import { HttpService } from "./HttpService"

export class AuthService {
    async authenticate() {
        let response = await (new HttpService).default("")
        return response
    }
    
    async register(data) {
        const body = JSON.stringify(data)
        let response = await (new HttpService).post("signup", body)
        return response
    }

    async logout() {
        let response = await (new HttpService).default("logout")
        return response
    }

}