const ROOT_URL = "http://localhost:5000/api"

export class HttpService {


    headers = {
        'Content-Type': 'application/json',
    }

    constructor(url_prefix = "") {
        this.url_prefix = url_prefix
    }

    getUrl(url) {
        return '/' + this.url_prefix + '/' + url
    }

    async post(url, body, queryParams = null) {
        const response = await fetch((ROOT_URL + this.getUrl(url)), {
            method: "POST",
            credentials: "include",
            headers: this.headers,
            body: body
        }).catch((err) => console.log(err))
        
        return response
    }

    async get(url, queryParams = null) {
        const response = await fetch((ROOT_URL + this.getUrl(url)), {
            method: "GET",
            credentials: "include",
            headers: this.headers,
        }).catch((err) => console.log(err))
        
        return response
    }
}