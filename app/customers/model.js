
import DatabaseUtils from '../databaseUtils'

const Customers = {

    ...DatabaseUtils,
    key: 'customers',

    findAll: async function () {
        let client = null
        let dataFromQuery = null
        let data = null
        let queryString = null

        try {
            queryString = 'SELECT * FROM customer'
            client = await this.getConnections()
            dataFromQuery = await client.query(queryString)
            data = (dataFromQuery.rowCount > 0) ? dataFromQuery.rows : null

        } catch (err) {
            console.log(err)
        } finally {
            client.release()
        }

        return data
    },

}

export default Customers;