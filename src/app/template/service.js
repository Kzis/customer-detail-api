
import TemplateDAO from './dao';

import JsonUtils from '../../utils/json-utils'
import LogUtils from '../../utils/log-utils'
import https_status from '../../master/http-status'


class TemplateService {


    static async getTemplate(body) {

        let responseStatus
        let headerData
        let responseData

        try {
            headerData = JsonUtils.getHeaderData(body.headerData)

            LogUtils.debug(headerData.messageId, this.name, this.getTemplate.name, JSON.stringify(body), "getTemplate")

            let pid = body.requestRecord.pid
            let roleId = body.requestRecord.roleId

            responseData = await TemplateDAO.getTemplate(pid)

            if (responseData === undefined || responseData == null) {
                responseData = await TemplateDAO.getTemplateDefault(roleId)

                if (responseData === undefined || responseData == null) {
                    responseStatus = JsonUtils.setResponseStatus(https_status.NOT_FOUND)
                } else {
                    responseStatus = JsonUtils.setResponseStatus(https_status.OK)
                }

            } else {
                responseStatus = JsonUtils.setResponseStatus(https_status.OK)
            }

        } catch (err) {
            LogUtils.error(headerData.messageId, this.name, this.getTemplate.name, JSON.stringify(body), err)
            responseStatus = JsonUtils.setResponseStatus(https_status.INTERNAL_SERVER_ERROR)
            headerData = JsonUtils.getHeaderData(body.headerData)
            return JsonUtils.setJsonOutput(headerData, responseStatus)
        }
        finally {
            LogUtils.debug(headerData.messageId, this.name, this.getTemplate.name, JSON.stringify(JsonUtils.setJsonOutput(headerData, responseData, responseStatus)), "getTemplate")
            return JsonUtils.setJsonOutput(headerData, responseData, responseStatus)
        }

    }

    static async saveTemplate(body) {

        let responseStatus
        let headerData
        let responseData

        try {

            headerData = JsonUtils.getHeaderData(body.headerData)

            LogUtils.debug(headerData.messageId, this.name, this.getTemplate.name, JSON.stringify(body), "getTemplate")

            responseData = await TemplateDAO.saveTemplate(body.requestRecord)

            if (responseData === undefined || responseData == null) {
                responseStatus = JsonUtils.setResponseStatus(https_status.NOT_FOUND)
            } else {
                responseStatus = JsonUtils.setResponseStatus(https_status.OK)
            }

        } catch (err) {
            console.log(err)
            LogUtils.error(headerData.messageId, this.name, this.getTemplate.name, JSON.stringify(body), err)
            responseStatus = JsonUtils.setResponseStatus(https_status.INTERNAL_SERVER_ERROR)
            headerData = JsonUtils.getHeaderData(body.headerData)
            return JsonUtils.setJsonOutput(headerData, responseStatus)
        }
        finally {
            LogUtils.debug(headerData.messageId, this.name, this.getTemplate.name, JSON.stringify(JsonUtils.setJsonOutput(headerData, responseData, responseStatus)), "getTemplate")
            return JsonUtils.setJsonOutput(headerData, responseData, responseStatus)
        }

    }

}
export default TemplateService;
