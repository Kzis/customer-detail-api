
import CustomersModel from './model'

class CustomersDAO {

    constructor() {
        this.key = 'customers';
    }

    static async findAll() {

        let data = await CustomersModel.findAll({
            raw: true,
        })
        return data
    }

    static async findByPk(id) {
        let data = await CustomersModel.findByPk(id, {
            raw: true,
        })
        return data
    }

    static async findByParams(body) {
        let data = await CustomersModel.findAll({
            raw: true,
            where: {
                name: body.name,
                surname: body.surname
            }
        })
        return data
    }

    static async add(body) {

        let data = CustomersModel.create({
            name: body.name,
            surname: body.surname,
            email: body.email
        })
        return data

    }

    static async update(id, body) {

        let data = CustomersModel.update({
            name: body.name,
            surname: body.surname,
        }, {
            returning: true,
            where: {
                id: id
            }
        })

        return data
    }

    static async delete(id) {
        let data = CustomersModel.destroy({
            where: {
                id: id
            }
        })
    }

}

export default CustomersDAO;