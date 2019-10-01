import config from '../config'
const Sequelize = require('sequelize');
const postgreSQL = config.postgreSQL.dev

const DatabaseUtilsORM = {

    getConnections() {

        var sequelize = new Sequelize(
            postgreSQL.database,
            postgreSQL.user,
            postgreSQL.password,
            {
                host: postgreSQL.host,
                dialect: 'postgres',

                pool: {
                    max: postgreSQL.max,
                    min: postgreSQL.min,
                    idle: postgreSQL.idleTimeoutMillis
                },

            }
        );

        return sequelize
    },

}

export default DatabaseUtilsORM;