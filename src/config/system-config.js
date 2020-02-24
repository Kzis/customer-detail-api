const Sequelize = require('sequelize');
const qs = require('querystring');
const axios = require('axios')

import DatabaseUtils from '../utils/database-utils'

global.api = []

export async function loadAPIConfig() {

    const APIConfig = DatabaseUtils.getConnectionsORM().define(
        'system_config', {
        system_id: {
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
        },
        active: {
            type: Sequelize.INTEGER
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
            type: "WS",
            active: 1
        }
    })

    setAPIConfig(data)

    return data

}

export async function getAPIConfig() {
    return api
}

export async function getURL(key) {
    return api.find(config => config.key === key).value
}

function setAPIConfig(data) {
    api = data
}