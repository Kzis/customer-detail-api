const Sequelize = require('sequelize');
import DatabaseUtils from '../../utils/database-utils'


const PrivilegeAssign = DatabaseUtils.getConnectionsInfinite().define(
    'privilege_assign', {
    assign_id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    party_id: {
        type: Sequelize.INTEGER
    },
    privilege_id: {
        type: Sequelize.INTEGER
    },
    deliver_method: {
        type: Sequelize.INTEGER
    },
    deliver_date: {
        type: Sequelize.DATE
    },
    receive_date: {
        type: Sequelize.DATE
    },
    deliver_status: {
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

export default PrivilegeAssign;