import axios from "axios";

class api {

    async initialise() {
        const query = new URLSearchParams(window.location.search)
        return await axios.post('/initialize', {
            code: query.get('code')
        })
    }

    async get(url) {
        return await axios.post('/api/forward-request', {
            method: 'GET',
            target: 'api',
            url: url
        })
    }

    async post(url, data) {
        return await axios.post('/api/forward-request', {
            method: 'POST',
            target: 'api',
            url: url,
            ...data
        })
    }

}

export default new api()
