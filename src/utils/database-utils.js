import config from '../config/database-config'
const Sequelize = require('sequelize');
let { Pool, Client } = require('pg')
let mssql = require("mssql");

class DatabaseUtils {

    static getConnectionsORM() {
        const postgreSQL = config.postgreSQL.dev
        let sequelize = new Sequelize(
            postgreSQL.database,
            postgreSQL.user,
            postgreSQL.password,
            {
                host: postgreSQL.host,
                port: postgreSQL.port,
                schema: postgreSQL.schemas.dashboard,
                dialect: 'postgres',

                pool: {
                    max: postgreSQL.max,
                    min: postgreSQL.min,
                    idle: postgreSQL.idleTimeoutMillis
                },

            }
        );

        return sequelize
    }

    static getConnectionsInfinite() {
        const postgreSQL = config.postgreSQL.dev
        let sequelize = new Sequelize(
            postgreSQL.database,
            postgreSQL.user,
            postgreSQL.password,
            {
                host: postgreSQL.host,
                port: postgreSQL.port,
                schema: postgreSQL.schemas.infinite,
                dialect: 'postgres',

                pool: {
                    max: postgreSQL.max,
                    min: postgreSQL.min,
                    idle: postgreSQL.idleTimeoutMillis
                },

            }
        );

        return sequelize
    }

    static getConnectionsDashboard() {
        const databaseDev = config.postgreSQL.dev
        let client = new Client({
            database: databaseDev.database,
            user: databaseDev.user,
            password: databaseDev.password,
            host: databaseDev.host,
            port: databaseDev.port,
            schema: databaseDev.schemas.dashboard
        })

        return client
    }

    static async getConnectionsInformation() {
        const databaseDev = config.postgreSQL.dev
        let client = new Client({
            database: databaseDev.database,
            user: databaseDev.user,
            password: databaseDev.password,
            host: databaseDev.host,
            port: databaseDev.port,
            schema: databaseDev.schemas.catalog
        })

        return client
    }

    static async getConnectionsCustomerParty() {
        const databaseDev = config.postgreSQL.devcustomer
        let client = new Client({
            database: databaseDev.database,
            user: databaseDev.user,
            password: databaseDev.password,
            host: databaseDev.host,
            port: databaseDev.port
        })

        return client
    }

    static async getConnectionsUnitlink() {
        const databaseDev = config.postgreSQL.devunitlink
        let client = new Client({
            database: databaseDev.database,
            user: databaseDev.user,
            password: databaseDev.password,
            host: databaseDev.host,
            port: databaseDev.port
        })

        return client
    }

    static async getConnectionsCollection() {
        const databaseDev = config.postgreSQL.devcollection
        let client = new Client({
            database: databaseDev.database,
            user: databaseDev.user,
            password: databaseDev.password,
            host: databaseDev.host,
            port: databaseDev.port
        })

        return client
    }

    static async getConnectionsPolicy() {
        const databaseDev = config.postgreSQL.devpolicy
        let client = new Client({
            database: databaseDev.database,
            user: databaseDev.user,
            password: databaseDev.password,
            host: databaseDev.host,
            port: databaseDev.port
        })

        return client
    }

    static async getConnectionsPos() {
        const databaseDev = config.postgreSQL.devPos
        let client = new Client({
            database: databaseDev.database,
            user: databaseDev.user,
            password: databaseDev.password,
            host: databaseDev.host,
            port: databaseDev.port
        })

        return client
    }

    static async getConnectionsCommonDB() {
        const databaseDev = config.msSQLCC.common_db
        let connection = {
            user: databaseDev.user,
            password: databaseDev.password,
            server: databaseDev.host,
            database: databaseDev.database,
            port: databaseDev.port
        };
        return connection
    }

    static async getConnectionsCommon3DB() {
        const databaseDev = config.msSQLACC.common3_db
        let connection = {
            user: databaseDev.user,
            password: databaseDev.password,
            server: databaseDev.host,
            database: databaseDev.database,
            port: databaseDev.port
        };
        return connection
    }

    static async executeMsSQL(configDB, queryString) {

        let data
        let pool
        try {

            pool = await mssql.connect(configDB)
            data = await pool.request().query(queryString)


        } catch (e) {
            throw e
        } finally {
            pool.close()
            return data
        }
    }

    static async execute(client, queryString) {
        let data

        try {
            client.connect()
            await client.query('BEGIN')
            data = await client.query(queryString)
            await client.query('COMMIT')
        } catch (e) {
            await client.query('ROLLBACK')
            throw e
        } finally {
            client.end()
            return data
        }
    }

}

export default DatabaseUtils;