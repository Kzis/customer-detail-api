
import Serializers from '../serializers'

const UsersSerializers = {
    ...Serializers,

    get(user) {
        return this.serializers(user)
    },

    getAll(users) {
        return users.map(user => this.serializers(user))
    },

    create(user) {
        return this.serializers(user)
    },

    serializers(user) {
        const { id, email, isAdmin } = user
        return { id, email, isAdmin }
    },

}

export default UsersSerializers;