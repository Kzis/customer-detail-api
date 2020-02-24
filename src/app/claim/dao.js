
import { call, getUUID, callWithOutToken } from '../../utils/api-utils'
import DateNow from '../../utils/date-utils'

class ClaimDAO {
    
    constructor() {
        this.state = {};
    }

    static async findClaimInfo(...rest) {

        const headerData = rest[0]

        const condition = {
            policyNo: rest[1],
            orderNo: rest[2],
            status: rest[3],
            claimOKDateFrom: rest[4],
            claimOKDateTo: rest[5],
            receiveDateFrom: rest[6],
            receiveDateTo: rest[7],
            accidentDateFrom: rest[8],
            accidentDateTo: rest[9]
        }

        const data = await call("GetClaimInquiry", headerData, condition, true)

        return data;
    }

    static async findClaimDetail(...rest) {

        const headerData = rest[0]

        const condition = {
            numberIdCase: rest[1]
        }

        const data = await call("GetClaimDetail", headerData, condition, true)

        return data;
    }
}

export default ClaimDAO;
