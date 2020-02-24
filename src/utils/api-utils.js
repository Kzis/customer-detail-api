const fetch = require("node-fetch");
const uuidv1 = require('uuid/v1');
import ApiMaster from '../master/api-master'
import STATUS from '../master/http-status'
import { getURL } from '../config/system-config'
import { getToken, getAccessToken } from './token-utils'

export function getUUID() {
    return uuidv1()
}

export async function call(url_key, headerData = {}, condition = {}, token_flag = false) {

    const URL = await getURL(url_key)
    let token = await getToken()
    if (token.status == 999) {
        token = await getToken()
    }
    let response = await fetchAPI(URL, token, headerData, condition)

    //Validate token

    if (response.status === STATUS.UNAUTHORIZED.CODE) { //401 token expire
        token = (token_flag) ? await getAccessToken() : null
        response = await fetchAPI(URL, token, headerData, condition)
    }

    //200 token valid
    const data = await response.json();

    return data

}

async function fetchAPI(URL, token, headerData, condition) {

    consoleData("Call url", URL)

    let response = await fetch(URL, {
        method: ApiMaster.POST,
        headers: await getHeder(token),
        body: await getBody(headerData, condition)
    });

    return response
}

export async function callApiGet(url_key, condition, token_flag = false) {

    const URL = await getURL(url_key)

    let token = await getToken()
    if (token.status == 999) {
        token = await getToken()
    }
    let response = await fetchAPIGet(URL+'/'+condition, token, condition)

    //Validate token

    if (response.status === STATUS.UNAUTHORIZED.CODE) { //401 token expire
        token = (token_flag) ? await getAccessToken() : null
        response = await fetchAPI(URL, token, headerData, condition)
    }

    //200 token valid
    const data = await response.json();

    return data

}

async function fetchAPIGet(URL, token) {

    consoleData("Call url", URL)

    let response = await fetch(URL, {
        method: ApiMaster.GET,
        headers: await getHeder(token)
    });

    return response
}

async function getHeder(token) {

    let response
    if (token != null) {
        response = ApiMaster.API_HEADERS_WITH_TOKEN
        response.Authorization = token.value.token_type + ' ' + token.value.access_token
    } else {
        response = ApiMaster.API_HEADERS_WITHOUT_TOKEN
    }

    consoleData("Header", response)
    return response
}

async function getBody(headerData, condition) {
    let response = ApiMaster.API_BODY
    response.headerData = headerData
    response.requestRecord = condition
    consoleData("Body", response)
    return JSON.stringify(response)
}

function consoleData(title, data) {
    console.log("\n" + "================")
    console.log(title + " : ", data)
    console.log("================" + "\n")
}
