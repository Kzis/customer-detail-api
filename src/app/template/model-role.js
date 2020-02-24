const Sequelize = require('sequelize');
import DatabaseUtils from '../../utils/database-utils'


const RoleModel = DatabaseUtils.getConnectionsORM().define(
    'master_role', {
    role_id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: Sequelize.STRING
    },
    create_date: {
        type: Sequelize.DATE
    },
    update_date: {
        type: Sequelize.DATE
    },
    create_by: {
        type: Sequelize.STRING
    },
    update_by: {
        type: Sequelize.STRING
    },
    default_card: {
        type: Sequelize.STRING
    },
    default_tab: {
        type: Sequelize.STRING
    },
},
    {
        timestamps: false,
        freezeTableName: true,
        underscored: true
    }
);

export default RoleModel;