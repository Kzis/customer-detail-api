const Sequelize = require('sequelize');
import DatabaseUtils from '../../utils/database-utils'


const AdminModel = DatabaseUtils.getConnectionsInfinite().define(
    'comply_receipt_queue', {
    rp_no: {
        type: Sequelize.STRING,
        primaryKey: true
    },
    policy_no: {
        type: Sequelize.STRING
    },
    pay_period: {
        type: Sequelize.STRING
    },
    party_id: {
        type: Sequelize.INTEGER
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

export default AdminModel;