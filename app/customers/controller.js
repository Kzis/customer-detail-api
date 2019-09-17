import Customers from './model'

const CustomersController = {
    getAll(req, res) {
        res.json({
            users: Customers.findAll()
        })
    },

    get(req, res) {
        res.json({
            users: Customers.find(req.params.id)
        })
    },

}

export default CustomersController;