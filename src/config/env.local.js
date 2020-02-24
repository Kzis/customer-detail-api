
export default {
    port: 3001,
    secretKey: 'secret',
    postgreSQL: {
        dev: {
            host: '206.1.2.155',
            database: 'dashboard',
            user: 'postgres',
            password: 'admin',
            port: 5432,
            schemas: {
                dashboard: 'customer_dashboard',
                catalog: 'pg_catalog',
                infinite: 'infinite',
            },
            min: 0,
            max: 30, // max number of clients in the pool
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
            host: '10.102.61.60',
            database: 'customer',
            user: 'customer.app',
            password: 'Y2ZkNzk5M2MaYW',
            port: 5432,
            min: 0,
            max: 30, // max number of clients in the pool
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
            host: '10.102.61.60',
            database: 'policy',
            user: 'policy.app',
            password: 'ZTM4Yam5ZTJiYW',
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
        devcollection: {
            host: '10.102.61.60',
            database: 'collection',
            user: 'collection.app',
            password: 'ZmFlN1gyMjY7NT',
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
        devunitlink: {
            host: '10.102.61.60',
            database: 'unitlink',
            user: 'unitlink.app',
            password: 'ZGU1NzNhMDFj8m',
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
        devPos: {
            host: '10.102.61.60',
            database: 'pos',
            user: 'pos.app',
            password: 'OGM2YmVmNTNhND',
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