
import { call, getUUID, callWithOutToken } from '../../utils/api-utils'
import DateNow from '../../utils/date-utils'

class PolicyDAO {

    constructor() {
        this.key = 'policy';
    }

    static async getPolicyList(partyId, citizenId) {

        const headerData = {
            messageId: getUUID(),
            sentDateTime: DateNow.getDateNow()
        }

        const condition = {
            customer_id: partyId,
            gov_id: citizenId
        }

        const data = await call("POL_DB_01_SearchPolicyByCustomerId", headerData, condition, false)
        return data;
    }

    static async getPolicyDisplay(policy_no, cert_no) {

        const headerData = {
            messageId: getUUID(),
            sentDateTime: DateNow.getDateNow()
        }
        const condition = {
            policy_no: policy_no,
            book_no: cert_no

        }

        const data = await call("PolicyDisplay", headerData, condition, false)
        return data;
    }

    static async getPolicyPremium(policyno) {

        const headerData = {}

        const condition = {
            policyNo: policyno
        }

        const data = await call("PolicyPremium", headerData, condition, true)

        return data
    }

    static async getPolicyLoan(policyNo) {

        const headerData = {}

        const condition = {
            policyNo: policyNo
        }

        const data = await call("PolicyLoan", headerData, condition, false)
        return data;
    }

    static async getRiderType(headData,resData) {

        const headerData = {
            messageId: headData.messageId,
            sentDateTime: headData.sentDateTime
        }

        const condition = {
            riderTypeList: resData
        }

        const data = await call("RiderType", headerData, condition, false)
        return data;
    }
}

export default PolicyDAO;
