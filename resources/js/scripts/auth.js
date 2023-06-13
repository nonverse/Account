import axios from "axios";
import api from "@/scripts/api.js";

class auth {

    async get(url) {
        return await axios.post('/api/forward-request', {
            method: 'GET',
            target: 'auth',
            url: url
        })
            .catch(e => {
                api.requestAuthorization(e)
            })
    }

    async post(url, data) {
        return await axios.post('/api/forward-request', {
            method: 'POST',
            target: 'auth',
            url: url,
            data: {...data}
        })
            .catch(e => {
                api.requestAuthorization(e)
            })
    }

}

export default new auth()
