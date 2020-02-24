import { call } from '../../utils/api-utils'


class CalculateDAO {

    static async fineSearchByCalculatePolicyPremium(policy_no) {

        const headerData = {}

        const condition = {
            policyNo: policy_no
        }

        const data = await call("CalculatePolicyPremium", headerData, condition, true)

        return data;

    }

}

export default CalculateDAO;