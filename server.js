import express from 'express';
import bodyParser from 'body-parser';
import fs from 'fs';
import cors from 'cors'
import config from './config/database-config';
import { loadAPIConfig } from './config/system-config'

function setupRoutes(app) {
    const APP_DIR = `${__dirname}/app`
    const features = fs.readdirSync(APP_DIR).filter(
        file => fs.statSync(`${APP_DIR}/${file}`).isDirectory()
    )

    features.forEach(feature => {
        const router = express.Router()
        const routes = require(`${APP_DIR}/${feature}/routes.js`)

        routes.setup(router)
        app.use(`/${feature}`, router)      // /users
    })
}

export function setup() {

    const app = express();
    const PORT = config.port;

    app.use(bodyParser.urlencoded({ extended: true }))
    app.use(bodyParser.json())
    app.use(cors())

    setupRoutes(app)
    loadAPIConfig().then((data) => {
        console.log("### Load API config successed")
        console.log(data)
    })

    app.listen(PORT, () => {
        console.log("App listening on http://localhost:" + PORT)
    })

}