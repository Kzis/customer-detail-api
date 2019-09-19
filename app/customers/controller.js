import Customers from './model'

const CustomersController = {


    getAll(req, res) {

        Customers.findAll()
            .then((data) => {
                res.json({
                    users: data
                })
            })

    },

    getById(req, res) {
        Customers.findById(req.params.id)
            .then((data) => {
                res.json({
                    users: data
                })
            })
    },

    get(req, res) {
        Customers.findByParams(req.body)
            .then((data) => {
                res.json({
                    users: data
                })
            })
    },

    insert(req, res) {
        Customers.add(req.body)
            .then((data) => {
                res.status(201).json({
                    users: data
                })
            })
    },

    update(req, res) {
        Customers.update(req.params.id, req.body)
            .then((data) => {
                res.json({
                    users: data
                })
            })
    },

    delete(req, res) {
        Customers.delete(req.params.id)
            .then(() => {
                res.status(204).send()
            })

    },


}

export default CustomersController;