import express from 'express';
import bodyParser from 'body-parser';
import fs from 'fs';
import cors from 'cors';
import config from './config/database-config';
import { loadAPIConfig } from './config/system-config';
import { getAccessToken } from './utils/token-utils.js';
import STATUS from './master/http-status';
const timeout = require('connect-timeout');
const app = express()

import DataBaseUtils from './utils/database-utils'

function setupRoutes(app) {
    const APP_DIR = `${__dirname}/app`
    const features = fs.readdirSync(APP_DIR).filter(
        file => fs.statSync(`${APP_DIR}/${file}`).isDirectory()
    )

    console.log("\n" + "### Config route path")
    features.forEach(feature => {
        const router = express.Router()
        const routes = require(`${APP_DIR}/${feature}/routes.js`)

        routes.setup(router)
        console.log("- " + feature)
        app.use(`/${feature}`, router)
    })
}

export function setup() {
    return new Promise(async (resolve, reject) => {
        try {
            const PORT = config.port

            app.use(timeout(120000)) // Timeout in milliseconds. 120000 = 2min
            // app.use(haltOnTimedout)
            app.use(bodyParser.urlencoded({ extended: true }))
            app.use(bodyParser.json())
            app.use(cors())

            setupRoutes(app)
            const data = await loadAPIConfig()
            await loadAPIConfig()
            await getAccessToken()

            const server = app.listen(PORT, () => {
                console.log("\n" + "App listening on http://localhost:" + PORT)
                resolve(server);
            })
        } catch (error) {
            reject(error);
        }
    });
}

function haltOnTimedout(req, res, next) {
    console.log("-------------------------------")
    console.log(res)
    console.log("-------------------------------")
    if (req.timedout) {
        return res.status(STATUS.TIMEOUT.CODE).json({
            data: {
                "responseStatus": {
                    errorCode: STATUS.TIMEOUT.CODE,
                    errorMessage: STATUS.TIMEOUT.TEXT_EN
                }
            }
        })
    }
}

export default app;