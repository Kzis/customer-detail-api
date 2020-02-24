const Sequelize = require('sequelize');
import DatabaseUtils from '../../utils/database-utils'


const TemplateModel = DatabaseUtils.getConnectionsORM().define(
    'favorite_template', {
    template_id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    employee_id: {
        type: Sequelize.STRING
    },
    layout_json: {
        type: Sequelize.STRING
    },
    menu_json: {
        type: Sequelize.STRING
    },
    active: {
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
        freezeTableName: true,
        underscored: true
    }
);

export default TemplateModel;