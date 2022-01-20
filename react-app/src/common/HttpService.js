import Cookies from 'js-cookie'
const ROOT_URL = "http://localhost:5000/api"

export class HttpService {

    headers = {
        'Content-Type': 'application/json',
    }

    async post(url, body, queryParams = null) {
        const response = await fetch((ROOT_URL + '/auth/' + url), {
            method: "POST",
            credentials: "include",
            headers: this.headers,
            body: body
        }).catch((err) => console.log(err))
        
        return response
    }

    async default(url, queryParams = null) {
        const response = await fetch((ROOT_URL + '/auth/' + url), {
            credentials: "include",
            headers: this.headers,
        }).catch((err) => console.log(err))
        
        return response
    }
}