
import PolicyDAO from './dao';
import jsonUtils from '../../utils/json-utils'

class PolicyService {

    static async getPolicyList(body) {

        let headerData = {}
        let responseStatus = {}
        let list_of_policy = []


        try {

            let data = await PolicyDAO.getPolicyList(body.partyId, body.citizenId)

            headerData = data.headerData
            responseStatus = data.responseStatus

            data.responseRecord.list_of_policy.forEach(element => {
                let policy_no = ''
                let cert_no = ''
                let policy_name = ''
                let policy_effective_date = ''
                let policy_mature_date = ''
                let policy_sum = ''
                let policy_status = ''

                policy_no = policy_no + element.policy_no
                cert_no = cert_no + element.book_no
                policy_name = policy_name + element.policy_name
                policy_effective_date = policy_effective_date + element.policy_effective_date
                policy_mature_date = policy_mature_date + element.policy_mature_date
                policy_sum = policy_sum + element.policy_sum
                policy_status = policy_status + element.policy_status

                list_of_policy.push(
                    {
                        policy_no: policy_no,
                        cert_no: cert_no,
                        plan_name: policy_name,
                        effective_date: policy_effective_date,
                        mature_date: policy_mature_date,
                        policy_sum: policy_sum,
                        policy_status: policy_status

                    })

            });

        } catch (error) {
            let errorMessage = "";
            let logErrorMessage = "";
            try {
                errorMessage = error.message
                logErrorMessage = error.stack
            } catch (err) {
                errorMessage = err
            }
            responseStatus.errorCode = 500
            responseStatus.fileName = fileName
            responseStatus.functionName = functionName
            responseStatus.errorMessage = errorMessage
            responseStatus.logErrorMessage = logErrorMessage
        } finally {
            let responseRecord = {
                list_of_policy
            }

            let response = {
                headerData,
                responseStatus,
                responseRecord
            }
            return response
        }

    }

    static async getPolicyDisplay(body) {

        let headerData = {}
        let responseStatus = {}
        let responseRecord = {}
        try {
            let data = await PolicyDAO.getPolicyDisplay(body.policy_no, body.cert_no)

            headerData = data.headerData
            responseStatus = data.responseStatus

            responseRecord = {
                policy_no: data.responseRecord.policy_no,
                cert_no: data.responseRecord.cert_no,
                effective_date: data.responseRecord.policy_effactive_date,
                mature_date: data.responseRecord.policy_mature_date,
                plan_code: data.responseRecord.plan_code,
                plan_name: data.responseRecord.policy_name,
                endownment_year: data.responseRecord.coverage_year,
                pay_mode: data.responseRecord.policy_mode,
                policy_status1: data.responseRecord.policy_status1 + " - " + data.responseRecord.policy_status1_desc,
                policy_status2: data.responseRecord.policy_status2 + " - " + data.responseRecord.policy_status2_desc
            }

        } catch (error) {
            let errorMessage = "";
            let logErrorMessage = "";
            try {
                errorMessage = error.message
                logErrorMessage = error.stack
            } catch (err) {
                errorMessage = err
            }
            responseStatus.errorCode = 500
            responseStatus.fileName = fileName
            responseStatus.functionName = functionName
            responseStatus.errorMessage = errorMessage
            responseStatus.logErrorMessage = logErrorMessage
        } finally {
            return jsonUtils.setJsonOutput(headerData, responseStatus, responseRecord)
        }
    }

    static async getPolicyPremium(body) {
        let headerData = {}
        let responseStatus = {}
        let responseRecord = {}
        try {
            let data = await PolicyDAO.getPolicyPremium(body.policyNo)

            headerData = data.headerData
            responseStatus = data.responseStatus

            responseRecord = {
                pay_period: data.responseRecord.payPeriod,
                pay_date: data.responseRecord.payDate,
                next_duedate: data.responseRecord.nextDueDate,
                next_pay_period: data.responseRecord.nextPayPeriod,
                life_premium: data.responseRecord.lifePremium,
                rider_premium: data.responseRecord.riderPremium,
                total_premium: data.responseRecord.topupPremiun
            }
        } catch (error) {
            let errorMessage = "";
            let logErrorMessage = "";
            try {
                errorMessage = error.message
                logErrorMessage = error.stack
            } catch (err) {
                errorMessage = err
            }
            responseStatus.errorCode = 500
            responseStatus.fileName = fileName
            responseStatus.functionName = functionName
            responseStatus.errorMessage = errorMessage
            responseStatus.logErrorMessage = logErrorMessage
        } finally {
            return jsonUtils.setJsonOutput(headerData, responseStatus, responseRecord)
        }


    }


    static async getPolicyLoan(body) {
        let headerData = {}
        let responseStatus = {}
        let responseRecord = {}
        try {
            let data = await PolicyDAO.getPolicyLoan(body.policyNo)

            headerData = data.headerData
            responseStatus = data.responseStatus

            responseRecord = {
                loan_amount: data.responseRecord.loanAmount,
                loan_interest_rate: data.responseRecord.loanInterestRate,
                loan_date: data.responseRecord.loanDate,
                receipt_date: data.responseRecord.receiptDate,
                due_date: data.responseRecord.dueDate
            }
        } catch (error) {
            let errorMessage = "";
            let logErrorMessage = "";
            try {
                errorMessage = error.message
                logErrorMessage = error.stack
            } catch (err) {
                errorMessage = err
            }
            responseStatus.errorCode = 500
            responseStatus.fileName = fileName
            responseStatus.functionName = functionName
            responseStatus.errorMessage = errorMessage
            responseStatus.logErrorMessage = logErrorMessage
        } finally {
            return jsonUtils.setJsonOutput(headerData, responseStatus, responseRecord)
        }
    }

}
export default PolicyService;