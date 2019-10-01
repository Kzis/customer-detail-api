const Sequelize = require('sequelize');
import DatabaseUtilsORM from '../../utils/databaseUtils'


const CustomersModel = DatabaseUtilsORM.getConnections().define(
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