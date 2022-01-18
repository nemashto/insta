import Cookies from 'js-cookie'
const ROOT_URL = "http://localhost:5000/api"

export class HttpService {

    headers = {
        'Content-Type': 'application/json',
    }

    async post(url, body, queryParams = null) {
        const response = await fetch((ROOT_URL + '/auth/signup'), {
            method: "POST",
            credentials: "include",
            headers: this.headers,
            body: body
        })
        
        return response
    }
}