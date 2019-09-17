
export default {
    port: 3000,
    secretKey: 'secret',
    postgreSQL: {
        host: 'localhost',
        database: 'postgres',
        user: 'postgres',
        password: 'admin',
        port: 5432
    }

    // port : process.env.port || 80,
    // secretKey: process.env.secretKey
}