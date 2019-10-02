const Sequelize = require('sequelize');
import DatabaseUtilsORM from '../../utils/databaseUtils'


const RoleModel = DatabaseUtilsORM.getConnections().define(
    'master_role', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: Sequelize.STRING
    }
},
    {
        timestamps: false,
        freezeTableName: true
    }
);

export default RoleModel;