import Cookies from 'js-cookie'
const ROOT_URL = "http://localhost:5000/api"

export class HttpService {

    headers = {
        'Content-Type': 'application/json',
        'X-CSRF-TOKEN': Cookies.get('csrf_token')
    }

    async post(url, body, queryParams = null) {
        try {
            let response = await fetch((ROOT_URL + '/auth/signup'), {
                method: "POST",
                headers: this.headers,
                body: body
            })
            return response
        } catch (error) {
            console.log(error);
            return error
        }

    }


}