const Sequelize = require('sequelize');
import DatabaseUtils from '../../utils/database-utils'


const TackingDetail = DatabaseUtils.getConnectionsInfinite().define(
    'tacking_detail', {
    tracking_id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    seq: {
        type: Sequelize.INTEGER
    },
    place: {
        type: Sequelize.STRING
    },
    status: {
        type: Sequelize.STRING
    },
    status_date: {
        type: Sequelize.DATE
    },
    recipient_name: {
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

export default TackingDetail;