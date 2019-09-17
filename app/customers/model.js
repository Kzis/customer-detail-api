
import ModelDatabase from '../model-database'

const Customers = {

    ...ModelDatabase,
    key: 'customers',

    findAll: async function () {
        let data = null

        try {
            connection = ModelDatabase.getConnections()
            console.log(connection)
            data = await connection.query('SELECT * FROM customer')
            if (data.rowCount > 0) {
                data = data.rows
            }

        } catch (err) {
            console.log(err)
        } finally {
            connection.release()
        }

        return data
    },

}

export default Customers;