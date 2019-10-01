import CustomersDAO from './dao'
import STATUS from '../../master/http-status'

class CustomersController {

    static getAll(req, res) {

        CustomersDAO.findAll().then((data) => {
            return res.status(STATUS.OK).json({
                users: data
            })
        })


    }

    static getById(req, res) {

        CustomersDAO.findByPk(req.params.id).then((data) => {
            return res.json({
                users: data
            })
        })

    }

    static getByParams(req, res) {

        CustomersDAO.findByParams(req.body)
            .then((data) => {
                res.json({
                    users: data
                })
            })
    }

    static insert(req, res) {

        CustomersDAO.add(req.body)
            .then((data) => {
                res.status(STATUS.CREATED).json({
                    users: data
                })
            })
    }

    static update(req, res) {
        CustomersDAO.update(req.params.id, req.body)
            .then((data) => {
                res.json({
                    users: data
                })
            })
    }

    static delete(req, res) {
        CustomersDAO.delete(req.params.id)
            .then(() => {
                res.status(STATUS.NO_CONTENT).send()
            })
    }
}


export default CustomersController;