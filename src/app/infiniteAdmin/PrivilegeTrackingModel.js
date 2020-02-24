const Sequelize = require('sequelize');
import DatabaseUtils from '../../utils/database-utils'


const PrivilegeTracking = DatabaseUtils.getConnectionsInfinite().define(
    'privilege_tracking', {
    tracking_id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    assign_id: {
        type: Sequelize.INTEGER,
    },
    deliver_method: {
        type: Sequelize.INTEGER
    },
    deliver_date: {
        type: Sequelize.DATE
    },
    tracking_number: {
        type: Sequelize.STRING
    },
    receive_signee: {
        type: Sequelize.STRING
    },
    tracking_status: {
        type: Sequelize.STRING
    },
    recipient_prename: {
        type: Sequelize.STRING
    },
    recipient_firstname: {
        type: Sequelize.STRING
    },
    recipient_lastname: {
        type: Sequelize.STRING
    },
    address_line_1: {
        type: Sequelize.STRING
    },
    address_line_2: {
        type: Sequelize.STRING
    },
    province: {
        type: Sequelize.INTEGER
    },
    zip_code: {
        type: Sequelize.INTEGER
    },
    remark: {
        type: Sequelize.STRING
    },
    create_time: {
        type: Sequelize.DATE
    },
    create_user_code: {
        type: Sequelize.STRING
    },
    update_time: {
        type: Sequelize.DATE
    },
    update_user_code: {
        type: Sequelize.STRING
    }
},
    {
        timestamps: false,
        freezeTableName: true,
        underscored: true
    }
);

export default PrivilegeTracking;