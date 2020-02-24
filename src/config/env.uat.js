
export default {
    port: 3000,
    secretKey: 'secret',
    postgreSQL: {
        dev: {
            host: 'uat-odsdb.thailife.com',
            database: 'customer',
            user: 'customer.app',
            password: 'ADe8TwkYTuyB5G',
            port: 5432,
            schemas: {
                dashboard: 'customer_dashboard',
                catalog: 'pg_catalog',
                infinite: 'infinite',
            },
            min: 0,
            max: 10, // max number of clients in the pool
            idleTimeoutMillis: 30000,
            connectionTimeoutMillis: 2000,
            define: {
                paranoid: false,
                timestamps: false,
                freezeTableName: true,
                underscored: true
            },

        },
        devcustomer: {
            host: 'uat-odsdb.thailife.com',
            database: 'customer',
            user: 'customer.app',
            password: 'ADe8TwkYTuyB5G',
            port: 5432,
            min: 0,
            max: 10, // max number of clients in the pool
            idleTimeoutMillis: 30000,
            connectionTimeoutMillis: 2000,
            define: {
                paranoid: false,
                timestamps: false,
                freezeTableName: true,
                underscored: true
            },

        },
        devpolicy: {
            host: 'uat-odsdb.thailife.com',
            database: 'policy',
            user: 'policy.app',
            password: 'YzM3YWtyMzdkM2',
            port: 5433,
            min: 0,
            max: 10, // max number of clients in the pool
            idleTimeoutMillis: 30000,
            connectionTimeoutMillis: 2000,
            define: {
                paranoid: false,
                timestamps: false,
                freezeTableName: true,
                underscored: true
            },
        },
        devcollection: {
            host: 'uat-odsdb.thailife.com',
            database: 'collection',
            user: 'collection.app',
            password: 'ZmFlN1gyMjY7NT',
            port: 5433,
            min: 0,
            max: 10, // max number of clients in the pool
            idleTimeoutMillis: 30000,
            connectionTimeoutMillis: 2000,
            define: {
                paranoid: false,
                timestamps: false,
                freezeTableName: true,
                underscored: true
            },
        },
        devPos: {
            host: 'uat-odsdb.thailife.com',
            database: 'pos',
            user: 'pos.app',
            password: 'MWv5ZWQ0MmE4MD',
            port: 5433,
            min: 0,
            max: 10, // max number of clients in the pool
            idleTimeoutMillis: 30000,
            connectionTimeoutMillis: 2000,
            define: {
                paranoid: false,
                timestamps: false,
                freezeTableName: true,
                underscored: true
            },
        },
    },
    msSQLCC: {
        common_db: {
            host: '10.102.61.71',
            database: 'common_db',
            user: 'csv_app',
            password: 'locusapp',
            port: 1435,
            min: 0,
            max: 10,
            idleTimeoutMillis: 30000,
            connectionTimeoutMillis: 2000,
            define: {
                paranoid: false,
                timestamps: false,
                freezeTableName: true,
                underscored: true
            },
        },
    },
    msSQLACC: {
        common3_db: {
            host: '10.102.61.71',
            database: 'common3_db',
            user: 'csv_app',
            password: 'locusapp',
            port: 1436,
            min: 0,
            max: 10,
            idleTimeoutMillis: 30000,
            connectionTimeoutMillis: 2000,
            define: {
                paranoid: false,
                timestamps: false,
                freezeTableName: true,
                underscored: true
            },
        },
    }

}