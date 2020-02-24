import infoDAO from './dao';
import jsonUtils from '../../utils/json-utils'
import ValidateUtils from '../../utils/validate-utils'
class BasicInfoService {

    static async getBasicInfo(body) {

        let headerData = {}
        let responseStatus = {}
        let responseRecord = {}
        let fileName = this.name
        let functionName = this.getBasicInfo.name
        try {

            let partyId = body.requestRecord.partyId

            if (ValidateUtils.validateRequireField(partyId)) {

                responseStatus = JsonUtils.setResponseStatus(https_status.PARAMETER_REQUIRE)
                return JsonUtils.setJsonOutput(headerData, responseRecord, responseStatus)
            }

            let jsonOutput = await infoDAO.findSearchByCustomerRef(partyId)

            headerData = jsonOutput['headerData']
            responseStatus = jsonOutput['responseStatus']

            if (Array.isArray(jsonOutput.responseRecord)) {
                let objRes = jsonOutput['responseRecord'][0]

                responseRecord = {
                    "partyId": partyId,
                    "bloodGroup": objRes.blood_group,
                    "height": objRes.height,
                    "weight": objRes.weight
                }
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

    };

    static async getDemographicInfo(body) {

        let headerData = {}
        let responseStatus = {}
        let responseRecord = {}
        let fileName = this.name
        let functionName = this.getDemographicInfo.name
        try {

            let partyId = body.requestRecord.partyId

            if (ValidateUtils.validateRequireField(partyId)) {

                responseStatus = JsonUtils.setResponseStatus(https_status.PARAMETER_REQUIRE)
                return JsonUtils.setJsonOutput(headerData, responseRecord, responseStatus)
            }

            let jsonOutput = await infoDAO.findSearchByCustomerRef(partyId)

            headerData = jsonOutput['headerData']
            responseStatus = jsonOutput['responseStatus']
            if (Array.isArray(jsonOutput.responseRecord)) {
                const objRes = jsonOutput['responseRecord'][0]

                let interest = "";
                if (objRes.interest != null) {
                    objRes.interest.forEach(element => {
                        if (interest === "") {
                            interest = interest + "," + element.interest_th
                        } else {
                            interest = element.interest_th
                        }
                    });
                }
                console.log(objRes);

                responseRecord = {
                    "partyId": objRes.party_id,
                    "mar_stat": objRes.mar_stat_name_th,
                    "occupation": objRes.occupation_name_th,
                    "citizen": objRes.citizen,
                    "education": objRes.highest_education_level,
                    "race": objRes.race,
                    "interest": interest
                }
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

    };

}

export default BasicInfoService;