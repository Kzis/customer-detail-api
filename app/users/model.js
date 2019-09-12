import Model from '../model'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import config from '../../config'

const Users = {

    ...Model,
    key: 'users',
    permittedAttrs: ['email'],

    create(email, password) {

        return new Promise((resolve, reject) => {
            bcrypt.hash(password, 12, (err, hash) => {
                if (err) reject(err)

                const collection = this.collection()
                const user = {
                    id: collection.length + 1,
                    email: email,
                    password: hash,
                    isAdmin: false
                }

                this.setCollection([...collection, user])
                return resolve(user)
            })
        })

    },

    findByEmail(email) {
        return this.collection().find(user => user.email === email)
    },

    genToken(user) {
        return jwt.sign({ sub: user.id }, config.secretKey, { expiresIn: '1h' })
    },


}

export default Users;