import Users from './model'
import UsersSerializers from './serializers'

const UsersController = {
    getAll(req, res) {
        res.json({
            users: UsersSerializers.for('getAll', Users.findAll())
        })
    },

    get(req, res) {
        res.json({
            users: UsersSerializers.for('get', Users.find(req.params.id))
        })
    },

    create(req, res) {
        const { email, password } = req.body

        Users.create(email, password).then(
            user => {
                res
                    .header('Authorization', `Bearer ${Users.genToken(user)}`)
                    .status(201)
                    .json({
                        users: UsersSerializers.for('create', user)
                    })
            }

        )
    }

}

export default UsersController;