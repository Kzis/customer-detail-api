import { call } from '../../utils/api-utils'

class BasicInfoDAO {

    constructor() {
        this.key = 'ClaimInfo';
    }

    static async findSearchByCustomerRef(partyId) {
        const headerData = {}
        const condition = {
            partyId: partyId
        }
        const data = await call("SearchByCustomerRef", headerData, condition,true)

        return data;
    }

    

}

export default BasicInfoDAO;