import config from '../config'
const { Pool } = require('pg')

const postgreSQL = config.postgreSQL
const connections = new Pool(postgreSQL)

const DatabaseUtils = {

    getConnections() {
        return connections.connect()
    },

}

export default DatabaseUtils;