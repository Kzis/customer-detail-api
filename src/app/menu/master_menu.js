const Sequelize = require('sequelize');
import DatabaseUtils from '../../utils/database-utils'

const masterMenu = DatabaseUtils.getConnectionsORM().define(
    'master_menu', {
    menu_id: {
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
    key: {
        type: Sequelize.STRING
    }
},
    {
        timestamps: false,
        freezeTableName: true,
        underscored: true
    }
);

export default masterMenu;