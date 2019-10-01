
export default {
    port: 3000,
    secretKey: 'secret',
    postgreSQL: {
        dev: {
            host: 'localhost',
            // database: 'postgres',
            database: 'orm',
            user: 'postgres',
            password: 'admin',
            port: 5432,
            min: 0,
            max: 10, // max number of clients in the pool
            idleTimeoutMillis: 30000,
            connectionTimeoutMillis: 2000,
        },
        test: {
            host: 'localhost',
            database: 'postgres',
            user: 'postgres',
            password: 'admin',
            port: 5432,
            min: 0,
            max: 10, // max number of clients in the pool
            idleTimeoutMillis: 30000,
            connectionTimeoutMillis: 2000,
        },
        prod: {
            host: 'localhost',
            database: 'postgres',
            user: 'postgres',
            password: 'admin',
            port: 5432,
            min: 0,
            max: 10, // max number of clients in the pool
            idleTimeoutMillis: 30000,
            connectionTimeoutMillis: 2000,
        }
    }

    // port : process.env.port || 80,
    // secretKey: process.env.secretKey
}