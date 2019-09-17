const { Pool } = require('pg')
import config from '../config'

const postgreSQL = config.postgreSQL
const connection = new Pool(postgreSQL)

const ModelDatabase = {

    getConnections() {
        return connection
    },



}

export default ModelDatabase;