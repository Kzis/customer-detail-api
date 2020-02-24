
import ClaimDao from './dao';
import JsonUtils from '../../utils/json-utils'
import LogUtils from '../../utils/log-utils'

class ClaimService {

    static async getClaimInquiry(body) {

        let headerData
        let responseRecord = []
        let responseStatus
        headerData = JsonUtils.getHeaderData(body.headerData)
        // let bodyData = body.requestRecord
        let responseDataFromClaimInfo = []
        
        try {
            console.log('find policylist by customer id')
            LogUtils.debug(body.headerData.messageId, this.policyNo, "GetClaimInquiry", JSON.stringify(body), "GetClaimInquiry")
            
            let messageId = body.headerData.messageId
            let sentDateTime = body.headerData.sentDateTime
            let partyId = body.requestRecord.partyId

            if (ValidateUtils.validateRequireField(partyId)) {
                responseStatus = JsonUtils.setResponseStatus(https_status.PARAMETER_REQUIRE)
                return JsonUtils.setJsonOutput(headerData, responseRecord, responseStatus)
            }

            //change to findby cus id
            console.log('all pol db 01')
            let polDb01 = await CustomersDAO.POL_DB_01_SearchPolicyByCustomerId(messageId, sentDateTime, partyId)

            //loop for get policy no
            for (let i = 0; i < polDb01.requestRecord.list_of_policy.length; i++) {

                console.log('in for loop polDb01.requestRecord.list_of_policy')

                headerData["recordPerPage"] = body.headerData.recordPerPage;
                headerData["requestPage"] = body.headerData.requestPage;
                headerData["totalRecord"] = body.headerData.totalRecord;
    
                let policyNo = polDb01.requestRecord[i].policyNo
                let orderNo = polDb01.requestRecord[i].orderNo
                let status = polDb01.requestRecord[i].status
                let claimOKDateFrom = polDb01.requestRecord[i].claimOKDateFrom
                let claimOKDateTo = polDb01.requestRecord[i].claimOKDateTo
                let receiveDateFrom = polDb01.requestRecord[i].receiveDateFrom
                let receiveDateTo = polDb01.requestRecord[i].receiveDateTo
                let accidentDateFrom = polDb01.requestRecord[i].accidentDateFrom
                let accidentDateTo = polDb01.requestRecord[i].accidentDateTo
    
                console.log('call claim info')
                responseDataFromClaimInfo = await ClaimDao.findClaimInfo(headerData, policyNo, orderNo, status, 
                    claimOKDateFrom, claimOKDateTo, receiveDateFrom, receiveDateTo, accidentDateFrom, accidentDateTo)

                console.log('response claim info')
                console.log(responseDataFromClaimInfo)
            }

            if (responseDataFromClaimInfo) {
                headerData = responseDataFromClaimInfo.headerData
                responseRecord.push(responseDataFromClaimInfo.responseRecord)
                responseStatus = responseDataFromClaimInfo.responseStatus
            }

            if (responseRecord === undefined || responseRecord.claimHeaderTypeList === 0) {
                responseStatus = JsonUtils.setResponseStatus(https_status.NOT_FOUND)
            } else {
                responseStatus = JsonUtils.setResponseStatus(https_status.OK)
            }

        } catch (err) {
            LogUtils.error(headerData.messageId, this.policyNo, "GetClaimInquiry", JSON.stringify(body), err)
            responseStatus = JsonUtils.setResponseStatus(https_status.INTERNAL_SERVER_ERROR)
            return JsonUtils.setJsonOutput(headerData, responseStatus)
        } finally {
            LogUtils.debug(headerData.messageId, this.policyNo, "GetClaimInquiry", JSON.stringify(JsonUtils.setJsonOutput(headerData, responseRecord, responseStatus)), "getClaimInquiry")
            return JsonUtils.setJsonOutput(headerData, responseRecord, responseStatus)
        }
    }

    static async getClaimDetail(body) {

        let headerData
        let responseRecord = []
        let responseStatus
        headerData = JsonUtils.getHeaderData(body.headerData)
        let bodyData = body.requestRecord
        
        try {
            console.log('call service')
            LogUtils.debug(body.headerData.messageId, this.policyNo, "GetClaimDetail", JSON.stringify(body), "GetClaimDetail")

            headerData["recordPerPage"] = body.headerData.recordPerPage
            headerData["requestPage"] = body.headerData.requestPage
            headerData["totalRecord"] = body.headerData.totalRecord

            let numberIdCase = bodyData.numberIdCase

            let data = await ClaimDao.findClaimDetail(headerData, numberIdCase)

            if (data) {
                headerData = data.headerData
                responseRecord.push(data.responseRecord)
                responseStatus = data.responseStatus
            }

            if (responseRecord === undefined || responseRecord === 0) {
                responseStatus = JsonUtils.setResponseStatus(https_status.NOT_FOUND)
            } else {
                responseStatus = JsonUtils.setResponseStatus(https_status.OK)
            }

        } catch (err) {
            LogUtils.error(headerData.messageId, this.policyNo, "GetClaimDetail", JSON.stringify(body), err)
            responseStatus = JsonUtils.setResponseStatus(https_status.INTERNAL_SERVER_ERROR)
            return JsonUtils.setJsonOutput(headerData, responseStatus)
        } finally {
            LogUtils.debug(headerData.messageId, this.policyNo, "getClaimDetail", JSON.stringify(JsonUtils.setJsonOutput(headerData, responseRecord, responseStatus)), "GetClaimDetail")
            return JsonUtils.setJsonOutput(headerData, responseRecord, responseStatus)
        }
    }

}
export default ClaimService;