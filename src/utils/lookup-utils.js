
import { call } from '../utils/api-utils'

class LookupUtils {

    static async lookupSubDistCode(condition) {
        const messageData = await call("LookupSubDistrictCode", {}, condition, true)
        const responseRecord = messageData['responseRecord'][0]
        const lookupDistrict = responseRecord.lookupDistrict
        return lookupDistrict
    }

    static async lookupIncomeRange(condition) {
        const messageData = await call("LookupIncomeRange", {}, condition, true)
        const responseRecord = messageData['responseRecord'][0]
        const lookupIncomeRange = responseRecord.lookupIncomeRange
        return lookupIncomeRange
    }

    static async lookupParticipantRole(condition) {
        const messageData = await call("LookupParticipantRole", {}, condition, true)
        const responseRecord = messageData['responseRecord'][0]
        const lookupParticipantRole = responseRecord.lookupParticipantRole
        return lookupParticipantRole
    }

    static async lookupBloodGroup(condition) {
        const messageData = await call("LookupBloodGroup", {}, condition, true)
        const responseRecord = messageData['responseRecord'][0]
        const lookupBloodGroup = responseRecord.lookupBloodGroup
        return lookupBloodGroup
    }

    static async lookupReligion(condition) {
        const messageData = await call("LookupBloodGroup", {}, condition, true)
        const responseRecord = messageData['responseRecord'][0]
        const lookupReligion = responseRecord.lookupReligion
        return lookupReligion
    }

    static async lookupCountryCode(condition) {
        const messageData = await call("LookupCountryCode", {}, condition, true)
        const responseRecord = messageData['responseRecord'][0]
        const lookupCountryCode = responseRecord.lookupCountryCode
        return lookupCountryCode
    }

    static async lookupAll(condition) {
        const messageData = await call("LookupAll", {}, condition, true)
        const responseRecord = messageData['responseRecord'][0]
        return responseRecord
    }

    static async lookupOccupation(condition) {
        const messageData = await call("LookupOccupation", {}, condition, true)
        const responseRecord = messageData['responseRecord'][0]
        const lookupOccupation = responseRecord.lookupOccupation
        return lookupOccupation
    }

    static async lookupMaritalStatus(condition) {
        const messageData = await call("LookupMaritalStatus", {}, condition, true)
        const responseRecord = messageData['responseRecord'][0]
        const lookupMaritalStatus = responseRecord.lookupMaritalStatus
        return lookupMaritalStatus
    }

    static async lookupEducationLevel(condition) {
        const messageData = await call("LookupEducationLevel", {}, condition, true)
        const responseRecord = messageData['responseRecord'][0]
        const lookupEducationLevel = responseRecord.lookupEducationLevel
        return lookupEducationLevel
    }

}

export default LookupUtils;