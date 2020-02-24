
export default {
    port: 3000,
    secretKey: 'secret',
    postgreSQL: {
        dev: {
            host: 'sit-odsdb.thailife.com',
            database: 'customer',
            user: 'customer.app',
            password: 'P7HkNzk5M7MaYW',
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
            host: 'sit-odsdb.thailife.com',
            database: 'customer',
            user: 'customer.app',
            password: 'P7HkNzk5M7MaYW',
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
            host: 'sit-odsdb.thailife.com',
            database: 'policy',
            user: 'policy.app',
            password: 'HTM5Yam5HTJkYW',
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
            host: 'sit-odsdb.thailife.com',
            database: 'collection',
            user: 'collection.app',
            password: 'QfFlN8gyMsY7NT',
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
        devunitlink: {
            host: 'sit-odsdb.thailife.com',
            database: 'unitlink',
            user: 'unitlink.app',
            password: 'QRE8NzNhMPFs8m',
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
            host: 'sit-odsdb.thailife.com',
            database: 'pos',
            user: 'pos.app',
            password: 'OGM7YmVmNTNhNP',
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
            host: '10.102.64.79',
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
            host: '10.102.64.79',
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