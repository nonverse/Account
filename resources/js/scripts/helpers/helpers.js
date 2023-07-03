class helpers {

    getObjectKey(object, value) {
        return Object.keys(object).find((key) => object[key] === value)
    }

    getObjectItem(object, attribute, value) {
        const item = Object.keys(object).find((key) => object[key][attribute] === value)
        return object[item]
    }

    capitaliseFirst(string) {
        return string.charAt(0).toUpperCase() + string.slice(1)
    }

    addModalToQuery(modalId) {
        return JSON.stringify({
            modal: {
                value: {
                    id: modalId
                }
            }
        })
    }
}

export default new helpers()
