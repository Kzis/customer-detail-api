const Sequelize = require('sequelize');
import DatabaseUtils from '../../utils/database-utils'

const MapRoleMenuModel = DatabaseUtils.getConnectionsORM().define(
    'map_role_menu', {
    map_role_id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    role_id: {
        type: Sequelize.INTEGER
    },
    menu_id: {
        type: Sequelize.INTEGER
    },
    sub_menu_id: {
        type: Sequelize.INTEGER
    },
    api_id: {
        type: Sequelize.INTEGER
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
    }
},
    {
        timestamps: false,
        freezeTableName: true
    }

);


export default MapRoleMenuModel;