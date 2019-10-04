
const fetch = require("node-fetch");
import FakeModel from './model'
import { getURL } from '../../config/system-config'

class FakeDAO {

    constructor() {
        this.key = 'fake';
    }

    static async findAll() {

        const TOKEN = this.validateToken()
        const URL = await getURL('fake')

        const response = await fetch(URL, {
            method: "POST",
            headers: {
                "Authorization": 'Bearer' + TOKEN,
                "Content-type": "application/json",
                "Accept": "application/json",
                "Accept-Charset": "utf-8"
            },
            body: JSON.stringify({
                title: 'foo',
                body: 'bar',
                userId: 1
            })
        });


        const messageData = await response.json();

        if ((response.status !== 200) && (response.status !== 201)) {
            console.error(`Invalid response status ${response.status}.`);
            throw messageData;
        } else {
            console.log(`Response status ${response.status}.`)
        }

        return messageData
    }

    static async validateToken() {
        //TODO CALL CHECK TIME
        return "FAKE TOKEN"
    }

}


export default FakeDAO;