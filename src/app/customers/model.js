const Sequelize = require('sequelize');
import DatabaseUtils from '../../utils/database-utils'


const CustomersModel = DatabaseUtils.getConnectionsORM().define(
    'customers', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: Sequelize.STRING
    },
    surname: {
        type: Sequelize.STRING
    },
    email: {
        type: Sequelize.STRING
    }
},
    {
        timestamps: false
    }
);

export default CustomersModel;