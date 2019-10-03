const Sequelize = require('sequelize');
import DatabaseUtils from '../utils/databaseUtils'
global.api = []

export async function loadAPIConfig() {

    const APIConfig = DatabaseUtils.getConnections().define(
        'system_config', {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        type: {
            type: Sequelize.STRING
        },
        key: {
            type: Sequelize.STRING
        },
        value: {
            type: Sequelize.STRING
        }
    },
        {
            timestamps: false,
            freezeTableName: true
        }
    );

    const data = await APIConfig.findAll({
        raw: true,
        where: {
            type: "WS"
        }
    })
    setAPIConfig(data)

    return data

}

export async function getAPIConfig() {
    return api
}

function setAPIConfig(data) {
    api = data
}