class Api {

    async initialise() {
        const query = new URLSearchParams(window.location.search)
        return await axios.post('/api/initialize', {
            code: query.get('code')
        })
    }

}

export const api = axios.create({
    baseURL: '/api',
    withCredentials: true
})

export default new Api()
