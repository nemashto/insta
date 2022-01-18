import { BaseService } from "./BaseService";
import { HttpService } from "./HttpService"

export class AuthService {
    
    async register(data) {
        const body = JSON.stringify(data)
        let response = await (new HttpService).post("signup", body)
        return response
    }

}