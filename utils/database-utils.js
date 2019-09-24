import config from '../config'
const { Pool } = require('pg')

const postgreSQL = config.postgreSQL
const connections = new Pool(postgreSQL)

const SELECT_ALL = 'SELECT * FROM '
const WHERE = ' WHERE '
const AND = ' and '

const DatabaseUtils = {

    getConnections() {
        return connections.connect()
    },

    getResource(schema, table) {
        return schema + "." + table
    },

    getSelect(schema, table) {
        return SELECT_ALL + this.getResource(schema, table)
    },

    getConditionUpdate(column) {
        let condition = WHERE
        column.forEach((colName, i) => {
            let index = i + 1
            condition = index == column.length ?
                (condition + colName + ' = $' + index) :
                (condition + colName + ' = $' + index + AND)

        });
        return condition
    },

    async findAll(schema, table) {

        let client = null
        let dataFromQuery = null
        let data = null

        try {
            const resource = schema + "." + table
            const queryString = SELECT_ALL + resource

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

    async findById(schema, table, id) {
        let client = null
        let dataFromQuery = null
        let data = null

        try {
            const resource = schema + "." + table
            const select = SELECT_ALL + resource
            const condition = ' WHERE id = $1'
            const queryString = select + condition
            const params = [id]

            client = await DatabaseUtils.getConnections()
            dataFromQuery = await client.query(queryString, params)
            data = (dataFromQuery.rowCount > 0) ? dataFromQuery.rows : null

        } catch (err) {
            console.log(err)
        } finally {
            client.release()
        }

        return data
    },

    async findByParams(schema, table, column, value) {
        let client = null
        let dataFromQuery = null
        let data = null

        try {

            const select = this.getSelect(schema, table)
            const condition = this.getConditionUpdate(column)
            const queryString = select + condition

            client = await this.getConnections()
            dataFromQuery = await client.query(queryString, value)
            data = (dataFromQuery.rowCount > 0) ? dataFromQuery.rows : null

        } catch (err) {
            console.log(err)
        } finally {
            client.release()
        }

        return data
    }

}

export default DatabaseUtils;