
const qs = require('querystring');
const axios = require('axios')
import { getURL } from '../config/system-config'
import ApiMaster from '../master/api-master'

global.token = {
    status: 999,
    value: {}
}

export async function getAccessToken() {

    const URL = await getURL('getAccessToken')

    console.log("\n" + "### Get Access Token")
    // console.log("Call url : " + URL)

    const header = ApiMaster.TOKEN_HEADERS
    const body = ApiMaster.TOKEN_BODY

    let result = await axios.post(URL, qs.stringify(body), header)

    // console.log("\n" + "### Success : ")
    console.log("Response STATUS : " + result.status)
    console.log("TOKEN : ", result.data)
    setToken(result.status, result.data)

    return result
}

export async function getToken() {
    // console.log("\n" + "### GET TOKEN : ")
    // console.log(token)
    // console.log("=====" + "\n")
    return token
}

function setToken(status, value) {
    token.status = (status) ? status : token.status
    token.value = (value) ? value : token.value
}

