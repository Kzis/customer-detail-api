import LookupUtils from '../../utils/lookup-utils'

class LookupService {

    static async getOccupation() {
        let data = await LookupUtils.lookupOccupation({})
        return data
    }

    static async getSubDistCode() {
        let data = await LookupUtils.lookupSubDistCode({})
        return data
    }

    static async getIncomeRange() {
        let data = await LookupUtils.lookupIncomeRange({})
        return data
    }

    static async getParticipantRole() {
        let data = await LookupUtils.lookupParticipantRole({})
        return data
    }

    static async getBloodGroup() {
        let data = await LookupUtils.lookupBloodGroup({})
        return data
    }

    static async getReligion() {
        let data = await LookupUtils.lookupReligion({})
        return data
    }

    static async getCountryCode() {
        let data = await LookupUtils.lookupCountryCode({})
        return data
    }

    static async getAll() {
        let data = await LookupUtils.lookupAll({})
        return data
    }

    static async getMaritalStatus() {
        let data = await LookupUtils.lookupMaritalStatus({})
        return data
    }

    static async getEducationLevel() {
        let data = await LookupUtils.lookupEducationLevel({})
        return data
    }

}


export default LookupService;