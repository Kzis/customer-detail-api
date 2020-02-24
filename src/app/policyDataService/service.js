
import PolicyDAO from './dao';
import JsonUtils from '../../utils/json-utils'
import LogUtils from '../../utils/log-utils'
import https_status from '../../master/http-status'
import ValidateUtils from '../../utils/validate-utils'

class PolicyDataService {

    static async policyDetailsOL(body) {

        let headerData = JsonUtils.getHeaderData(body.headerData)
        let responseStatus
        let messageId = body.headerData.messageId
        let sentDateTime = body.headerData.sentDateTime
        let responseDateTime = body.headerData.responseDateTime

        let policyno = body.requestRecord.policyno
        let type = body.requestRecord.type

        LogUtils.debug(headerData.messageId, this.name, this.policyDetailsOL.name, JSON.stringify(body), "policyDetailsOL")

        try {
            let data = await PolicyDAO.policyDetailsOL(messageId, sentDateTime, responseDateTime, policyno, type)
            LogUtils.debug(headerData.messageId, this.name, this.policyDetailsOL.name, JSON.stringify(data), "policyDetailsOL")
            return data
        } catch (err) {
            LogUtils.error(headerData.messageId, this.name, this.policyDetailsOL.name, JSON.stringify(body), err)
            responseStatus = JsonUtils.setResponseStatus(https_status.INTERNAL_SERVER_ERROR)
            return JsonUtils.setJsonOutput(headerData, null, responseStatus)
        }
    }

    static async policyDetailsCL(body) {

        let headerData = JsonUtils.getHeaderData(body.headerData)
        let responseStatus
        let messageId = body.headerData.messageId
        let sentDateTime = body.headerData.sentDateTime

        let policyno = body.requestRecord.policyno
        let certno = body.requestRecord.certno
        let type = body.requestRecord.type

        LogUtils.debug(headerData.messageId, this.name, this.policyDetailsCL.name, JSON.stringify(body), "policyDetailsCL")

        try {
            let data = await PolicyDAO.policyDetailsCL(messageId, sentDateTime, policyno, certno, type)
            LogUtils.debug(headerData.messageId, this.name, this.policyDetailsCL.name, JSON.stringify(data), "policyDetailsCL")
            return data
        } catch (err) {
            LogUtils.error(headerData.messageId, this.name, this.policyDetailsCL.name, JSON.stringify(body), err)
            responseStatus = JsonUtils.setResponseStatus(https_status.INTERNAL_SERVER_ERROR)
            return JsonUtils.setJsonOutput(headerData, null, responseStatus)
        }
    }

    static async policyDetailsUnitLink(body) {

        let headerData = JsonUtils.getHeaderData(body.headerData)
        let responseStatus
        let messageId = body.headerData.messageId
        let sentDateTime = body.headerData.sentDateTime

        let policyno = body.requestRecord.policyno
        let type = body.requestRecord.type

        LogUtils.debug(headerData.messageId, this.name, this.policyDetailsUnitLink.name, JSON.stringify(body), "policyDetailsUnitLink")

        try {
            let data = await PolicyDAO.policyDetailsUnitLink(messageId, sentDateTime, policyno, type)
            LogUtils.debug(headerData.messageId, this.name, this.policyDetailsUnitLink.name, JSON.stringify(data), "policyDetailsUnitLink")
            return data
        } catch (err) {
            LogUtils.error(headerData.messageId, this.name, this.policyDetailsUnitLink.name, JSON.stringify(body), err)
            responseStatus = JsonUtils.setResponseStatus(https_status.INTERNAL_SERVER_ERROR)
            return JsonUtils.setJsonOutput(headerData, null, responseStatus)
        }
    }

    static async nextPayPeriod(body) {
        
        let headerData = JsonUtils.getHeaderData(body.headerData)
        let responseStatus
  
        LogUtils.debug(body.headerData.messageId, this.name, this.nextPayPeriod.name, JSON.stringify(body), "nextPayPeriod")

        try {
            let data = await PolicyDAO.nextPayPeriod(body)
            LogUtils.debug(body.headerData.messageId, this.name, this.nextPayPeriod.name, JSON.stringify(data), "nextPayPeriod")
            return data
        } catch (err) {
            LogUtils.error(body.headerData.messageId, this.name, this.nextPayPeriod.name, JSON.stringify(body), err)
            responseStatus = JsonUtils.setResponseStatus(https_status.INTERNAL_SERVER_ERROR)
            return JsonUtils.setJsonOutput(headerData, null, responseStatus)
        } 
    }

    static async getLoanPremium(body) {

        let headerData = JsonUtils.getHeaderData(body.headerData)
        let responseStatus
        let messageId = body.headerData.messageId
        let sentDateTime = body.headerData.sentDateTime

        let policyno = body.requestRecord.policyno
        let certno = body.requestRecord.certno
        let type = body.requestRecord.type

        try {
            LogUtils.debug(headerData.messageId, this.name, this.getLoanPremium.name, JSON.stringify(body), "getLoanPremium")
            let data = await PolicyDAO.getLoanPremium(messageId, sentDateTime, policyno, certno, type)
            LogUtils.debug(headerData.messageId, this.name, this.getLoanPremium.name, JSON.stringify(data), "getLoanPremium")
            return data
        } catch (err) {
            LogUtils.error(headerData.messageId, this.name, this.getLoanPremium.name, JSON.stringify(body), err)
            responseStatus = JsonUtils.setResponseStatus(https_status.INTERNAL_SERVER_ERROR)
            return JsonUtils.setJsonOutput(headerData, null, responseStatus)
        }
    }

    static async getRiderDetial(body) {

        let headerData = JsonUtils.getHeaderData(body.headerData)
        let responseStatus
        let messageId = body.headerData.messageId
        let sentDateTime = body.headerData.sentDateTime
        let responseDateTime = body.headerData.responseDateTime
        let policyno = body.requestRecord.policyno
        let certno = body.requestRecord.certno
        let type = body.requestRecord.type

        LogUtils.debug(headerData.messageId, this.name, this.getRiderDetial.name, JSON.stringify(body), "getRiderDetial")

        try {
            let data = await PolicyDAO.getRiderDetial(messageId, sentDateTime, responseDateTime, policyno, certno, type)
            LogUtils.debug(headerData.messageId, this.name, this.getRiderDetial.name, JSON.stringify(data), "getRiderDetial")
            return data
        } catch (err) {
            LogUtils.error(headerData.messageId, this.name, this.getRiderDetial.name, JSON.stringify(body), err)
            responseStatus = JsonUtils.setResponseStatus(https_status.INTERNAL_SERVER_ERROR)
            return JsonUtils.setJsonOutput(headerData, null, responseStatus)
        }
    }

    static async getBeneficiaryInfo(body) {

        let headerData = JsonUtils.getHeaderData(body.headerData)
        let responseStatus
        let messageId = body.headerData.messageId
        let sentDateTime = body.headerData.sentDateTime
        let policyno = body.requestRecord.policyno
        let certno = body.requestRecord.certno
        let type = body.requestRecord.type

        LogUtils.debug(headerData.messageId, this.name, this.getBeneficiaryInfo.name, JSON.stringify(body), "getBeneficiaryInfo")

        try {
            let data = await PolicyDAO.getBeneficiaryInfo(messageId, sentDateTime, policyno, certno, type)
            LogUtils.debug(headerData.messageId, this.name, this.getBeneficiaryInfo.name, JSON.stringify(data), "getBeneficiaryInfo")
            return data
        } catch (err) {
            LogUtils.error(headerData.messageId, this.name, this.getBeneficiaryInfo.name, JSON.stringify(body), err)
            responseStatus = JsonUtils.setResponseStatus(https_status.INTERNAL_SERVER_ERROR)
            return JsonUtils.setJsonOutput(headerData, null, responseStatus)
        }
    }

    static async getPaymentHistory(body) {

        let headerData = JsonUtils.getHeaderData(body.headerData)
        let responseStatus
        let messageId = body.headerData.messageId
        let sentDateTime = body.headerData.sentDateTime
        let policyno = body.requestRecord.policyno
        let certno = body.requestRecord.certno
        let type = body.requestRecord.type

        LogUtils.debug(headerData.messageId, this.name, this.getPaymentHistory.name, JSON.stringify(body), "getPaymentHistory")

        try {
            let data = await PolicyDAO.getPaymentHistory(messageId, sentDateTime, policyno, certno, type)
            LogUtils.debug(headerData.messageId, this.name, this.getPaymentHistory.name, JSON.stringify(data), "getPaymentHistory")
            return data
        } catch (err) {
            LogUtils.error(headerData.messageId, this.name, this.getPaymentHistory.name, JSON.stringify(body), err)
            responseStatus = JsonUtils.setResponseStatus(https_status.INTERNAL_SERVER_ERROR)
            return JsonUtils.setJsonOutput(headerData, null, responseStatus)
        }
    }

    static async getCoverageOverview(body) {

        let headerData = JsonUtils.getHeaderData(body.headerData)
        let responseStatus
        let messageId = body.headerData.messageId
        let sentDateTime = body.headerData.sentDateTime
        let customer_id = body.requestRecord.customer_id

        LogUtils.debug(headerData.messageId, this.name, this.getCoverageOverview.name, JSON.stringify(body), "getCoverageOverview")

        try {
            let data = await PolicyDAO.getCoverageOverview(messageId, sentDateTime, customer_id)
            LogUtils.debug(headerData.messageId, this.name, this.getCoverageOverview.name, JSON.stringify(data), "getCoverageOverview")
            return data
        } catch (err) {
            LogUtils.error(headerData.messageId, this.name, this.getCoverageOverview.name, JSON.stringify(body), err)
            responseStatus = JsonUtils.setResponseStatus(https_status.INTERNAL_SERVER_ERROR)
            return JsonUtils.setJsonOutput(headerData, null, responseStatus)
        }
    }

    static async claimInquiry(body) {

        let headerData = JsonUtils.getHeaderData(body.headerData)
        let responseStatus
        let messageId = body.headerData.messageId
        let sentDateTime = body.headerData.sentDateTime
        let responseDateTime = body.headerData.responseDateTime
        let recordPerPage = body.headerData.recordPerPage
        let requestPage = body.headerData.requestPage
        let totalRecord = body.headerData.totalRecord

        let policyNo = body.requestRecord.policyNo
        let orderNo = body.requestRecord.orderNo
        let status = body.requestRecord.status
        let claimOKDateFrom = body.requestRecord.claimOKDateFrom
        let claimOKDateTo = body.requestRecord.claimOKDateTo
        let accidentDateFrom = body.requestRecord.accidentDateFrom
        let accidentDateTo = body.requestRecord.accidentDateTo
        let receiveDateFrom = body.requestRecord.receiveDateFrom
        let receiveDateTo = body.requestRecord.receiveDateTo

        LogUtils.debug(headerData.messageId, this.name, this.claimInquiry.name, JSON.stringify(body), "claimInquiry")

        try {

            let data = await PolicyDAO.claimInquiry(
                messageId,
                sentDateTime,
                responseDateTime,
                recordPerPage,
                requestPage,
                totalRecord,
                policyNo,
                orderNo,
                status,
                claimOKDateFrom,
                claimOKDateTo,
                accidentDateFrom,
                accidentDateTo,
                receiveDateFrom,
                receiveDateTo
            )
            LogUtils.debug(headerData.messageId, this.name, this.claimInquiry.name, JSON.stringify(data), "claimInquiry")
            return data
        } catch (err) {
            LogUtils.error(headerData.messageId, this.name, this.claimInquiry.name, JSON.stringify(body), err)
            responseStatus = JsonUtils.setResponseStatus(https_status.INTERNAL_SERVER_ERROR)
            return JsonUtils.setJsonOutput(headerData, null, responseStatus)
        }
    }

    static async claimDetail(body) {

        let headerData = JsonUtils.getHeaderData(body.headerData)
        let responseStatus
        let messageId = body.headerData.messageId
        let sentDateTime = body.headerData.sentDateTime
        let responseDateTime = body.headerData.responseDateTime
        let recordPerPage = body.headerData.recordPerPage
        let requestPage = body.headerData.requestPage
        let totalRecord = body.headerData.totalRecord
        let numberIdCase = body.requestRecord.numberIdCase

        LogUtils.debug(headerData.messageId, this.name, this.claimDetail.name, JSON.stringify(body), "claimDetail")

        try {

            let data = await PolicyDAO.claimDetail(
                messageId,
                sentDateTime,
                responseDateTime,
                recordPerPage,
                requestPage,
                totalRecord,
                numberIdCase
            )
            LogUtils.debug(headerData.messageId, this.name, this.claimDetail.name, JSON.stringify(data), "claimDetail")
            return data
        } catch (err) {
            LogUtils.error(headerData.messageId, this.name, this.claimDetail.name, JSON.stringify(body), err)
            responseStatus = JsonUtils.setResponseStatus(https_status.INTERNAL_SERVER_ERROR)
            return JsonUtils.setJsonOutput(headerData, null, responseStatus)
        } finally {

        }
    }

    static async displayPolicyList(body) {

        let headerData = JsonUtils.getHeaderData(body.headerData)
        let responseStatus
        let partyId = ValidateUtils.convertToString(body.requestRecord.partyId)
        let messageId = ValidateUtils.convertToString(body.headerData.messageId)
        let sentDateTime = ValidateUtils.convertToString(body.headerData.sentDateTime)
        let responseDateTime = ValidateUtils.convertToString(body.headerData.responseDateTime)

        LogUtils.debug(headerData.messageId, this.name, this.displayPolicyList.name, JSON.stringify(body), "displayPolicyList")

        try {
            let data = await PolicyDAO.searchDisplayPolicyList(messageId, sentDateTime, responseDateTime, partyId)
            LogUtils.debug(headerData.messageId, this.name, this.displayPolicyList.name, JSON.stringify(data), "displayPolicyList")
            return data
        } catch (err) {
            LogUtils.error(headerData.messageId, this.name, this.displayPolicyList.name, JSON.stringify(body), err)
            responseStatus = JsonUtils.setResponseStatus(https_status.INTERNAL_SERVER_ERROR)
            headerData = JsonUtils.getHeaderData(body.headerData)
            return JsonUtils.setJsonOutput(headerData, null, responseStatus)
        }
    }

    static async actualValuePolicy(body) {

        let headerData = JsonUtils.getHeaderData(body.headerData)
        let responseStatus
        let policyNo = ValidateUtils.convertToString(body.requestRecord.policyNo)
        let type = ValidateUtils.convertToString(body.requestRecord.type)
        let messageId = ValidateUtils.convertToString(body.headerData.messageId)
        let sentDateTime = ValidateUtils.convertToString(body.headerData.sentDateTime)
        let responseDateTime = ValidateUtils.convertToString(body.headerData.responseDateTime)

        LogUtils.debug(headerData.messageId, this.name, this.actualValuePolicy.name, JSON.stringify(body), "actualValuePolicy")

        try {
            let data = await PolicyDAO.actualValuePolicy(messageId, sentDateTime, responseDateTime, policyNo, type)
            
            LogUtils.debug(headerData.messageId, this.name, this.actualValuePolicy.name, JSON.stringify(data), "actualValuePolicy")
            return data
        } catch (err) {
            LogUtils.error(headerData.messageId, this.name, this.actualValuePolicy.name, JSON.stringify(body), err)
            responseStatus = JsonUtils.setResponseStatus(https_status.INTERNAL_SERVER_ERROR)
            headerData = JsonUtils.getHeaderData(body.headerData)
            return JsonUtils.setJsonOutput(headerData, null, responseStatus)
        }
    }

}

export default PolicyDataService;