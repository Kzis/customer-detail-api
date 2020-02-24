
import { call, getUUID, callWithOutToken } from '../../utils/api-utils'

class PolicyDataServiceDAO {

    constructor() {
        this.key = 'policyDataService';
    }

    static async policyDetailsOL(messageId, sentDateTime, responseDateTime, policyno, type) {

        const headerData = {
            messageId: messageId,
            sentDateTime: sentDateTime,
            responseDateTime: responseDateTime
        }

        const condition = {
            policyno: policyno,
            type: type
        }

        const data = await call("PolicyDetailsOL", headerData, condition, false)
        return data;
    }

    static async policyDetailsCL(messageId, sentDateTime, policyno, certno, type) {

        const headerData = {
            messageId: messageId,
            sentDateTime: sentDateTime
        }

        const condition = {
            policyno: policyno,
            certno: certno,
            type: type
        }

        const data = await call("PolicyDetailsCL", headerData, condition, false)
        return data;
    }

    static async policyDetailsUnitLink(messageId, sentDateTime, policyno, type) {

        const headerData = {
            messageId: messageId,
            sentDateTime: sentDateTime
        }

        const condition = {
            policyno: policyno,
            type: type
        }

        const data = await call("PolicyDetailsUnitLink", headerData, condition, false)
        return data;
    }

    static async nextPayPeriod(body) {

        const headerData = {
            messageId: body.headerData.messageId,
            sentDateTime: body.headerData.sentDateTime
        }

        const condition = {
            nextPayPeriod: body.requestRecord.nextPayPeriod
        }

        const data = await call("NextPayPeriod", headerData, condition, false)
        return data;
    }

    static async getLoanPremium(messageId, sentDateTime, policyno, certno, type) {

        const headerData = {
            messageId: messageId,
            sentDateTime: sentDateTime
        }

        const condition = {
            policyno: policyno,
            certno: certno,
            type: type
        }

        const data = await call("GetLoanPremium", headerData, condition, false)
        return data;
    }

    static async getRiderDetial(messageId, sentDateTime, responseDateTime, policyno, certno, type) {

        const headerData = {
            messageId: messageId,
            sentDateTime: sentDateTime,
            responseDateTime: responseDateTime
        }

        const condition = {
            policyno: policyno,
            certno: certno,
            type: type
        }

        const data = await call("GetRiderDetial", headerData, condition, false)

        return data;
    }

    static async getBeneficiaryInfo(messageId, sentDateTime, policyno, certno, type) {

        const headerData = {
            messageId: messageId,
            sentDateTime: sentDateTime
        }

        const condition = {
            policyno: policyno,
            certno: certno,
            type: type
        }

        const data = await call("GetBeneficiaryInfo", headerData, condition, false)
        return data;
    }

    static async getPaymentHistory(messageId, sentDateTime, policyno, certno, type) {

        const headerData = {
            messageId: messageId,
            sentDateTime: sentDateTime
        }

        const condition = {
            policyno: policyno,
            certno: certno,
            type: type
        }

        const data = await call("GetPaymentHistory", headerData, condition, false)
        return data;
    }

    static async getCoverageOverview(messageId, sentDateTime, customer_id) {

        const headerData = {
            messageId: messageId,
            sentDateTime: sentDateTime
        }

        const condition = {
            customer_id: customer_id
        }

        const data = await call("GetCoverageOverview", headerData, condition, false)
        return data;
    }

    static async getCoverageOverview(messageId, sentDateTime, customer_id) {

        const headerData = {
            messageId: messageId,
            sentDateTime: sentDateTime
        }

        const condition = {
            customer_id: customer_id
        }

        const data = await call("GetCoverageOverview", headerData, condition, false)
        return data;
    }

    static async claimInquiry(
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
    ) {

        const headerData = {
            messageId: messageId,
            sentDateTime: sentDateTime,
            responseDateTime: responseDateTime,
            recordPerPage: recordPerPage,
            requestPage: requestPage,
            totalRecord: totalRecord
        }

        const condition = {
            policyNo: policyNo,
            orderNo: orderNo,
            status: status,
            claimOKDateFrom: claimOKDateFrom,
            claimOKDateTo: claimOKDateTo,
            accidentDateFrom: accidentDateFrom,
            accidentDateTo: accidentDateTo,
            receiveDateFrom: receiveDateFrom,
            receiveDateTo: receiveDateTo
        }

        const data = await call("ClaimInquiry", headerData, condition, true)
        return data;
    }

    static async claimDetail(messageId, sentDateTime, responseDateTime, recordPerPage, requestPage, totalRecord, numberIdCase) {

        const headerData = {
            messageId: messageId,
            sentDateTime: sentDateTime,
            responseDateTime: responseDateTime,
            recordPerPage: recordPerPage,
            requestPage: requestPage,
            totalRecord: totalRecord
        }

        const condition = {
            numberIdCase: numberIdCase
        }

        const data = await call("ClaimDetail", headerData, condition, true)
        return data;
    }

    static async searchDisplayPolicyList(messageId, sentDateTime, responseDateTime, partyId) {

        const headerData = {
            messageId: messageId,
            sentDateTime: sentDateTime,
            responseDateTime: responseDateTime
        }

        const condition = {
            partyId: partyId
        }

        const data = await call("DisplayPolicyList", headerData, condition, false)

        return data;
    }

    static async actualValuePolicy( messageId, sentDateTime, responseDateTime, policyNo, type) {

        const headerData = {
            messageId: messageId,
            sentDateTime: sentDateTime,
            responseDateTime: responseDateTime
        }

        const condition = {
            policyNo: policyNo,
            type: type
        }

        const data = await call("ActualValuePolicy", headerData, condition, false)

        return data;
    }


}

export default PolicyDataServiceDAO;
