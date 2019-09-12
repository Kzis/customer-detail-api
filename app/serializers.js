

const Serializers = {
    for(method, resource) {
        return this[method](resource)
    },
}

export default Serializers;