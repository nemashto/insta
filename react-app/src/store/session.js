import { AuthService } from "../common/AuthService";

export const signUp = (body) => {
    const response = (new AuthService).register(body)

    return response.data
}
