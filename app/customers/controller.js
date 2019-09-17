import Customers from './model'

const CustomersController = {


    getAll(req, res) {

        Customers.findAll().then((data) => {
            res.json({
                users: data
            })
        })

    },

    get(req, res) {
        res.json({
            users: Customers.find(req.params.id)
        })
    },

}

export default CustomersController;