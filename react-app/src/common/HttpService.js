const ROOT_URL = "http://localhost:5000/api"

export class HttpService {

    header = {}

    constructor(url_prefix = "") {
        this.url_prefix = url_prefix
        this.getHeaders()
    }

    getUrl(url) {
        return this.url_prefix + url
    }

    getHeaders() {
        this.headers = {
            'Content-Type': 'application/json',
        }
    }

    mapQueryParams(queryParams) {
        return queryParams
            ? Object.keys(queryParams).map(function (key) {
                return key + '=' + queryParams[key]
            }).join('&')
            : ""
    }

    async post(url, body, queryParams = null) {
        try {
            let response = await fetch(ROOT_URL + this.getUrl(url) + this.mapQueryParams(queryParams), {
                method: "POST",
                headers: this.headers,
                body: JSON.stringify(body)
            })

            let jsonResponse = await response.json()
            return jsonResponse
        } catch (error) {
            console.log(error);
            return null
        }

    }


}