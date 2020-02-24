import { getUUID } from './api-utils'
import dataUtils from './date-utils'
import https_status from '../master/http-status'

class JsonUtils {

    static getJsonTemplate() {
        let template = {
            "cardForm": {
                "apiUrl": "",
                "method": "POST",
                "payload": {},
                "editable": "false",
                objectRender: {}
            }
        }
        return jsonCopy(template)
    }

    static mapData(keyName, editable, type, format, value) {
        let data = {
            "keyName": keyName,
            "editable": editable,
            "type": type,
            "format": format,
            "value": value
        }
        return data
    }

    static mapDataDropdown(id, dataMaster, keyName, editable) {
        let dataValue = []

        dataMaster.forEach((ele) => {
            let dataElement = {
                "key": ele.code,
                "value": ele.name_th,
                "selected": id == ele.code
            }
            dataValue.push(dataElement)
        })

        let data = {
            "keyName": keyName,
            "editable": editable,
            "type": "Array",
            "format": "Dropdown",
            "value": dataValue
        }

        return data
    }

    static mapDataTable(headerColumn, dataList, totalRecord) {

        let data = {
            "type": "TableObject",
            "headerColumn": headerColumn,
            "total": totalRecord,
            "dataList": dataList
        }

        return data
    }

    static mapDataColumn(type, format, value) {

        let data = {
            type: type,
            format: format,
            value: value != null ? value : ""
        }
        return data
    }

    static setJsonOutput(headerData, responseRecord, responseStatus) {
        let data = {
            "headerData": headerData,
            "responseRecord": responseRecord,
            "responseStatus": responseStatus
        }
        return data
    }

    static setResponseStatus(httpStatus) {
        let responseStatus = {
            statusCode: httpStatus.CODE !== 500 ? "S" : "E",
            errorCode: httpStatus.CODE,
            //errorMessageEN: httpStatus.TEXT_EN,
            errorMessage: httpStatus.TEXT_TH
        }
        return responseStatus
    }

    static getHeaderData(headerData) {

        let messageId
        let sentDateTime
        let responseDateTime

        if (headerData.messageId === undefined || headerData.messageId === "") {
            messageId = getUUID()
        } else {
            messageId = headerData.messageId
        }

        if (headerData.sentDateTime === undefined || headerData.sentDateTime === "") {
            sentDateTime = dataUtils.getDataToISOString(new Date(), 'dd-mm-yyyy HH:MM:ss')
        } else {
            sentDateTime = headerData.sentDateTime
        }

        if (headerData.responseDateTime === undefined || headerData.responseDateTime === "") {
            responseDateTime = dataUtils.getDataToISOString(new Date(), 'dd-mm-yyyy HH:MM:ss')
        } else {
            responseDateTime = headerData.responseDateTime
        }

        let data = {
            "messageId": messageId,
            "sentDateTime": sentDateTime,
            "responseDateTime": responseDateTime
        }
        return data
    }

    static isMockup(body) {
        if (body.requestRecord != undefined) {
            if (body.requestRecord.isMock != undefined) {
                return body.requestRecord.isMock == "Y"
            }
        }
        return false
    }

    static getMockData(body, responseRecord) {
        let headerData
        let responseStatus

        try {
            headerData = JsonUtils.getHeaderData(body.headerData)
            responseStatus = this.setResponseStatus(https_status.OK)
        } catch (err) {
            console.log(err)
        } finally {
            return this.setJsonOutput(headerData, responseRecord, responseStatus)
        }

    }

    static isEmptyValue(value) {
        if (value == "" || value == null || value == undefined) {
            return true
        }
        return false
    }

    static trim(str) {
        var trimContent = str.trim();
        return trimContent
    }
}


function jsonCopy(src) {
    return JSON.parse(JSON.stringify(src));
}


export default JsonUtils;