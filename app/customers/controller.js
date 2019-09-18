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
        Customers.addUser(req.body)
            .then((data) => {
                res.json({
                    users: data
                })
            })
    },

    // update(req, res) {

    // },

    // delete(req, res) {

    // },


}

export default CustomersController;