import Customers from './model'

class CustomersController {

    static getAll(req, res) {

        Customers.findAll().then((data) => {
            return res.json({
                users: data
            })
        })

    }

    static getById(req, res) {

        Customers.findById(req.params.id)
            .then((data) => {
                res.json({
                    users: data
                })
            })

    }

    static get(req, res) {
        Customers.findByParams(req.body)
            .then((data) => {
                res.json({
                    users: data
                })
            })
    }

    static insert(req, res) {
        Customers.add(req.body)
            .then((data) => {
                res.status(201).json({
                    users: data
                })
            })
    }

    static update(req, res) {
        Customers.update(req.params.id, req.body)
            .then((data) => {
                res.json({
                    users: data
                })
            })
    }

    static delete(req, res) {
        Customers.delete(req.params.id)
            .then(() => {
                res.status(204).send()
            })

    }
}


export default CustomersController;