import { BaseService } from "./baseService";

export class AuthService extends BaseService {
    
    async register(body) {
        let response = await this.http.post("register", body)
        return response
    }

}