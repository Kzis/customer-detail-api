
import https_status from '../../master/http-status'
import InfiniteAdminDAO from './dao'
import ValidateUtils from '../../utils/validate-utils'
import JsonUtils from '../../utils/json-utils'
import AsyncUtils from '../../utils/async-utils'
import LogUtils from '../../utils/log-utils'
import DateUtils from '../../utils/date-utils'
import { upperCase, localeUpperCase } from "upper-case";

class InfiniteAdminService {


    static async insertComplyReceipt(body) {

        console.log("insertComplyReceipt")

        //INITIAL DATA
        let fileName = this.name
        let functionName = this.insertComplyReceipt.name

        let responseStatus = {}
        let responseData = {}

        try {

            let citizenId = body.citizenId
            let rp_no = body.rp_no
            let policy_no = body.policy_no
            let pay_period = body.pay_period

            //VALIDATE BODY
            if ((ValidateUtils.validateRequireField(citizenId)) ||
                ValidateUtils.validateRequireField(rp_no) ||
                ValidateUtils.validateRequireField(policy_no) ||
                ValidateUtils.validateRequireField(pay_period)) {

                responseStatus = JsonUtils.setResponseStatus(https_status.PARAMETER_REQUIRE)
                return JsonUtils.setJsonOutput(headerData, responseRecord, responseStatus)
            }

            //GET DATA
            let rpno = await InfiniteAdminDAO.searchRPNO(rp_no)

            if (rpno.rows.length > 0) {
                if (rpno.rows[0].rp_no != null) {
                    responseData.statusCode = 1
                    responseData.statusMsg = "FAIL"
                    responseData.MsgError = "rp_no : " + rpno.rows[0].rp_no + " มีอยู่ในระบบ"
                }
            } else {

                let party = await InfiniteAdminDAO.searchPartyId(citizenId)

                if (party != null) {
                    let data = await InfiniteAdminDAO.insertComplyReceipt(party.rows, rp_no, policy_no, pay_period)
                    if (data != null) {

                        //SET DATA RESPONS
                        responseData.statusCode = 0
                        responseData.statusMsg = "SUCCESS"
                        responseData.MsgError = ""

                    } else {
                        //SET DATA RESPONS
                        responseData.statusCode = 1
                        responseData.statusMsg = "FAIL"
                        responseData.MsgError = ""
                    }
                } else {
                    //SET DATA RESPONS
                    responseData.statusCode = 1
                    responseData.statusMsg = "FAIL"
                    responseData.MsgError = ""
                }

            }

        } catch (error) {
            console.log(error)
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
            responseData.MsgError = errorMessage
        } finally {
            responseData.objectError = responseStatus

            //RETURN DATA
            return responseData
        }

    }


    static async getComplyReceipt(body) {

        //INITIAL DATA
        let fileName = this.name
        let functionName = this.getComplyReceipt.name

        let responseStatus = {}
        let responseData = {}

        try {

            let rp_no = body.rp_no
            let policy_no = body.policy_no

            //VALIDATE BODY
            if (ValidateUtils.validateRequireField(rp_no) ||
                ValidateUtils.validateRequireField(policy_no)) {

                responseStatus = JsonUtils.setResponseStatus(https_status.PARAMETER_REQUIRE)
                return JsonUtils.setJsonOutput(headerData, responseRecord, responseStatus)
            }

            //GET DATA
            let data = await InfiniteAdminDAO.findByParams(rp_no, policy_no)

            //SET DATA RESPONS
            if (data != null) {
                responseData = data
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
        }
        finally {

            //RETURN DATA
            return responseData
        }

    }

    static async insertPrivilegeTracking(body) {

        //INITIAL DATA
        let fileName = this.name
        let functionName = this.insertPrivilegeTracking.name

        let responseStatus = {}
        let responseData = {}

        try {

            if (!ValidateUtils.validateRequireField(body.privilege)) {

                await AsyncUtils.asyncForEach(body.privilege, async (item) => {

                    let gov_id = ValidateUtils.convertToString(item.gov_id)
                    let privilege_id = ValidateUtils.convertToString(item.privilege_id)
                    let deliver_method = ValidateUtils.convertToString(item.deliver_method)
                    let deliver_date = ValidateUtils.convertToString(item.deliver_date)
                    let deliver_status = ValidateUtils.convertToString(item.deliver_status)
                    let tier_name = ValidateUtils.convertToString(item.tier_name)
                    let remark = ValidateUtils.convertToString(item.remark)
                    let tracking_number = ValidateUtils.convertToString(item.tracking_number)
                    let tracking_status = ValidateUtils.convertToString(item.tracking_status)
                    let receive_signee = ValidateUtils.convertToString(item.receive_signee)
                    let recipient_prename = ValidateUtils.convertToString(item.recipient_prename)
                    let recipient_firstname = ValidateUtils.convertToString(item.recipient_firstname)
                    let recipient_lastname = ValidateUtils.convertToString(item.recipient_lastname)
                    let address_line_1 = ValidateUtils.convertToString(item.address_line_1)
                    let address_line_2 = ValidateUtils.convertToString(item.address_line_2)
                    let province = null
                    let zip_code = null
                    let receive_date = null

                    //VALIDATE BODY
                    // if (ValidateUtils.validateRequireField(gov_id) ||
                    //     ValidateUtils.validateRequireField(privilege_id) ||
                    //     ValidateUtils.validateRequireField(deliver_method) ||
                    //     ValidateUtils.validateRequireField(deliver_date) ||
                    //     ValidateUtils.validateRequireField(deliver_status) ||
                    //     ValidateUtils.validateRequireField(tier_name) ||
                    //     ValidateUtils.validateRequireField(remark) ||
                    //     ValidateUtils.validateRequireField(tracking_number) ||
                    //     ValidateUtils.validateRequireField(tracking_status) ||
                    //     ValidateUtils.validateRequireField(receive_signee) ||
                    //     ValidateUtils.validateRequireField(recipient_prename) ||
                    //     ValidateUtils.validateRequireField(recipient_firstname) ||
                    //     ValidateUtils.validateRequireField(recipient_lastname) ||
                    //     ValidateUtils.validateRequireField(address_line_1) ||
                    //     ValidateUtils.validateRequireField(address_line_2)
                    // ) {

                    //     responseStatus = JsonUtils.setResponseStatus(https_status.PARAMETER_REQUIRE)
                    //     return JsonUtils.setJsonOutput(headerData, responseRecord, responseStatus)
                    // }

                    //SEARCH TIER_ID
                    let tier_id = await InfiniteAdminDAO.getTierId(tier_name)

                    if (!ValidateUtils.validateRequireField(tier_id)) {
                        //SEARCH TIER
                        let tier = await InfiniteAdminDAO.getTier(tier_id)
                        if (tier.rows.length > 0) {

                            //SEARCH PRIVILEGE
                            let privilege = await InfiniteAdminDAO.getPrivilege(tier.rows[0].tier_id)

                            if (privilege.rows.length > 0) {

                                let party = await InfiniteAdminDAO.searchPartyId(gov_id)

                                if (party != null) {
                                    await AsyncUtils.asyncForEach(privilege.rows, async (element) => {

                                        let data = await InfiniteAdminDAO.insertPrivilegeTracking(party, gov_id, privilege_id, deliver_method, deliver_date, receive_date, deliver_status, tier_name,
                                            remark, tracking_number, tracking_status, receive_signee, recipient_prename, recipient_firstname, recipient_lastname, address_line_1, address_line_2, province, zip_code,
                                            element.create_time, element.create_user_code, element.update_time, element.update_user_code)
                                        if (data != null && data != '') {
                                            responseData = {
                                                "statusCode": 1,
                                                "statusMsg": "SUCCESS",
                                                "MsgError": ""
                                            }
                                            return responseData
                                        } else {
                                            responseData = {
                                                "statusCode": 0,
                                                "statusMsg": "FAIL",
                                                "MsgError": ""
                                            }
                                            return responseData
                                        }
                                    })

                                } else {
                                    //SET DATA RESPONS
                                    responseData = {
                                        "statusCode": 0,
                                        "statusMsg": "FAIL",
                                        "MsgError": ""
                                    }
                                }

                            } else {
                                responseData = {
                                    "statusCode": 0,
                                    "statusMsg": "FAIL",
                                    "MsgError": "ไม่พบข้อมูล Privilege"
                                }
                            }

                        } else {
                            responseData = {
                                "statusCode": 0,
                                "statusMsg": "FAIL",
                                "MsgError": "ไม่พบข้อมูล Tier"
                            }
                        }

                    } else {
                        responseData = {
                            "statusCode": 0,
                            "statusMsg": "FAIL",
                            "MsgError": "ไม่พบข้อมูล Tier"
                        }
                    }

                });
            }

        } catch (error) {
            console.log(error)
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
        }
        finally {
            //MAP DATA 

            //RETURN DATA
            return responseData
        }

    }

    static async getPrivilegeTracking(body) {

        let headerData = JsonUtils.getHeaderData(body.headerData)
        let responseStatus = {}
        let responseData = []

        try {
            LogUtils.debug(headerData.messageId, this.name, this.getPrivilegeTracking.name, JSON.stringify(body), "getPrivilegeTracking")

            let gov_id = ValidateUtils.convertToString(body.requestRecord.gov_id)
            let emsCode = ValidateUtils.convertToString(body.requestRecord.emsCode)
            let deliver_method = ValidateUtils.convertToString(body.requestRecord.deliver_method)
            let deliver_date = ValidateUtils.convertToString(body.requestRecord.deliver_date)
            let deliver_status = ValidateUtils.convertToString(body.requestRecord.deliver_status)

            let data = await InfiniteAdminDAO.getPrivilegeTracking(gov_id, emsCode, deliver_method, deliver_date, deliver_status)

            await AsyncUtils.asyncForEach(data.rows, async (element) => {

                let data = {}
                data.govt_id = ValidateUtils.convertToString(element.govt_id)
                data.privilege_id = ValidateUtils.convertToString(element.privilege_id)
                data.name = ValidateUtils.convertToString(element.name)
                data.deliver_method = ValidateUtils.convertToString(element.deliver_method)
                data.deliver_date = DateUtils.setDateFormat(element.deliver_date, 'yyyy/mm/dd')
                data.deliver_status = ValidateUtils.convertToString(element.deliver_status)
                data.remark = ValidateUtils.convertToString(element.remark)
                data.tracking_number = ValidateUtils.convertToString(element.tracking_number)
                data.tracking_status = ValidateUtils.convertToString(element.tracking_status)
                data.receive_signee = ValidateUtils.convertToString(element.receive_signee)
                data.recipient_prename = ValidateUtils.convertToString(element.recipient_prename)
                data.recipient_firstname = ValidateUtils.convertToString(element.recipient_firstname)
                data.recipient_lastname = ValidateUtils.convertToString(element.recipient_lastname)
                data.address_line_1 = ValidateUtils.convertToString(element.address_line_1)
                data.address_line_2 = ValidateUtils.convertToString(element.address_line_2)
                responseData.push(data)
            })

            if (responseData != undefined || responseData != '') {
                responseStatus = JsonUtils.setResponseStatus(https_status.OK)
            } else {
                responseStatus = JsonUtils.setResponseStatus(https_status.NOT_FOUND)
            }

            return JsonUtils.setJsonOutput(headerData, responseData, responseStatus)

        } catch (error) {
            console.log(error);
            LogUtils.error(headerData.messageId, this.name, this.getPrivilegeTracking.name, JSON.stringify(body), err)
            responseStatus = JsonUtils.setResponseStatus(https_status.INTERNAL_SERVER_ERROR)
            return JsonUtils.setJsonOutput(headerData, responseStatus)
        }
    }

    static async getPreparePrivileage(body) {
        let headerData = JsonUtils.getHeaderData(body.headerData)
        let responseStatus = {}
        let responseData = []

        try {
            LogUtils.debug(headerData.messageId, this.name, this.getPreparePrivileage.name, JSON.stringify(body), "getPreparePrivileage")

            let idNo = ValidateUtils.convertToString(body.requestRecord.idNo)
            let name = ValidateUtils.convertToString(body.requestRecord.name)
            let lastname = ValidateUtils.convertToString(body.requestRecord.lastname)
            let tier = ValidateUtils.convertToString(body.requestRecord.tier)
            let province = ValidateUtils.convertToString(body.requestRecord.province)
            let postCode = ValidateUtils.convertToString(body.requestRecord.postCode)
            let typeCustomer = ValidateUtils.convertToString(body.requestRecord.typeCustomer)

            if (typeCustomer == '') {
                responseStatus = 'กรุณาระบุ typeCustomer'
                return JsonUtils.setJsonOutput(headerData, responseStatus)
            }

            let data = await InfiniteAdminDAO.getPreparePrivileage(idNo, name, lastname, tier, province, postCode, upperCase(typeCustomer))

            await AsyncUtils.asyncForEach(data.rows, async (element) => {
                let data = {}

                data.party_id = element.party_id
                data.govt_id = element.govt_id
                data.fname_th = element.fname_th
                data.lname_th = element.lname_th
                data.tier_id = element.tier_id
                data.program_id = element.program_id
                data.addtess1 = trim(element.addtess1)
                data.address2 = trim(element.address2)
                data.province = ValidateUtils.convertToString(element.province)
                data.zip_code = element.zip_code
                responseData.push(data)
            })

            if (responseData != undefined || responseData != '') {
                responseStatus = JsonUtils.setResponseStatus(https_status.OK)
            } else {
                responseStatus = JsonUtils.setResponseStatus(https_status.NOT_FOUND)
            }

            return JsonUtils.setJsonOutput(headerData, responseData, responseStatus)

        } catch (error) {
            console.log(error);
            LogUtils.error(headerData.messageId, this.name, this.getPreparePrivileage.name, JSON.stringify(body), err)
            responseStatus = JsonUtils.setResponseStatus(https_status.INTERNAL_SERVER_ERROR)
            return JsonUtils.setJsonOutput(headerData, responseStatus)
        }
    }

    static async insPrivileageAssign(body) {
        let headerData = JsonUtils.getHeaderData(body.headerData)
        let responseData = {}
        let data
        try {

            LogUtils.debug(headerData.messageId, this.name, this.insPrivileageAssign.name, JSON.stringify(body), "insPrivileageAssign")

            await AsyncUtils.asyncForEach(body.requestRecord, async (element) => {
                let party_id = ValidateUtils.convertToString(element.party_id)
                let tier_id = ValidateUtils.convertToString(element.tier_id)
                let program_id = ValidateUtils.convertToString(element.program_id)
                let deliver_method = '1'
                let deliver_date = new Date() + 7
                let deliver_status = '1'
                let remark = null

                let privilege = await InfiniteAdminDAO.getPrivilegeByTierAndProgramid(tier_id, program_id)
                // console.log('********************************');
                // console.log(privilege.rows);

                if (privilege.rows != '') {

                    data = await InfiniteAdminDAO.insPrivileageAssign(party_id, privilege.rows[0].privilege_id, deliver_method, deliver_date, deliver_status, remark)

                }
            })

            if (data != '') {
                responseData = {
                    "statusCode": 1,
                    "statusMsg": "SUCCESS",
                    "MsgError": ""
                }
                return responseData
            } else {
                responseData = {
                    "statusCode": 0,
                    "statusMsg": "FAIL",
                    "MsgError": ""
                }
                return responseData
            }

        } catch (error) {
            console.log(error);
            LogUtils.error(headerData.messageId, this.name, this.insPrivileageAssign.name, JSON.stringify(body), err)
            responseStatus = JsonUtils.setResponseStatus(https_status.INTERNAL_SERVER_ERROR)
            return JsonUtils.setJsonOutput(headerData, responseStatus)
        }

    }

    static async getDredownProvince() {

        let responseStatus = {}
        let responseData = {}
        let province = []

        try {
            LogUtils.debug('', this.name, this.getDredownProvince.name, '', "getDredownProvince")

            let data = await InfiniteAdminDAO.getDredownProvince()

            await AsyncUtils.asyncForEach(data.rows, async (element) => {
                province.push(element.province)
                console.log('**************** get ****************');

                console.log(element.province);

            })

            responseData = {
                'province': province
            }

            if (responseData != undefined || responseData != '') {
                responseStatus = JsonUtils.setResponseStatus(https_status.OK)
            } else {
                responseStatus = JsonUtils.setResponseStatus(https_status.NOT_FOUND)
            }

            return JsonUtils.setJsonOutput('', responseData, responseStatus)

        } catch (error) {
            console.log(error);
            LogUtils.error('', this.name, this.getDredownProvince.name, JSON.stringify(), err)
            responseStatus = JsonUtils.setResponseStatus(https_status.INTERNAL_SERVER_ERROR)
            return JsonUtils.setJsonOutput('', responseStatus)
        }
    }

    static async getDredownTier() {

        let responseStatus = {}
        let responseData = {}

        try {
            LogUtils.debug('', this.name, this.getDredownTier.name, '', "getDredownTier")

            let data = await InfiniteAdminDAO.getDredownTier()

            responseData = {
                'tier_name': data.rows
            }

            if (responseData != undefined || responseData != '') {
                responseStatus = JsonUtils.setResponseStatus(https_status.OK)
            } else {
                responseStatus = JsonUtils.setResponseStatus(https_status.NOT_FOUND)
            }

            return JsonUtils.setJsonOutput('', responseData, responseStatus)

        } catch (error) {
            console.log(error);
            LogUtils.error('', this.name, this.getDredownTier.name, JSON.stringify(), err)
            responseStatus = JsonUtils.setResponseStatus(https_status.INTERNAL_SERVER_ERROR)
            return JsonUtils.setJsonOutput('', responseStatus)
        }
    }

    static async updateTrackingEMS(body) {
        let headerData = JsonUtils.getHeaderData(body.headerData)
        let responseData = {}
        let data
        try {

            // LogUtils.debug(headerData.messageId, this.name, this.updateTrackingEMS.name, JSON.stringify(body), "updateTrackingEMS")

            await AsyncUtils.asyncForEach(body.requestRecord, async (element) => {


            })

            if (data != '') {
                responseData = {
                    "statusCode": 1,
                    "statusMsg": "SUCCESS",
                    "MsgError": ""
                }
                return responseData
            } else {
                responseData = {
                    "statusCode": 0,
                    "statusMsg": "FAIL",
                    "MsgError": ""
                }
                return responseData
            }

        } catch (error) {
            console.log(error);
            // LogUtils.error(headerData.messageId, this.name, this.updateTrackingEMS.name, JSON.stringify(body), err)
            responseStatus = JsonUtils.setResponseStatus(https_status.INTERNAL_SERVER_ERROR)
            return JsonUtils.setJsonOutput(headerData, responseStatus)
        }

    }

    static async insertTrackingStatus(body) {
        let headerData = JsonUtils.getHeaderData(body.headerData)
        let responseData = {}
        let responseStatus = {}
        let data
        try {

            // LogUtils.debug(headerData.messageId, this.name, this.updateTrackingStatus.name, JSON.stringify(body), "updateTrackingStatus")

            await AsyncUtils.asyncForEach(body.requestRecord, async (element) => {

                let tracking_number = element.tracking_number
                let seq = element.seq
                let status_date = element.status_date
                let place = element.place
                let status = element.status
                let recipient_name = element.recipient_name

                console.log(status_date, place, status, recipient_name);
                

                data = await InfiniteAdminDAO.insertTrackingStatus(tracking_number, seq, status_date, place, status, recipient_name)


            })

            if (data != '') {
                responseData = {
                    "statusCode": 1,
                    "statusMsg": "SUCCESS",
                    "MsgError": ""
                }
                return responseData
            } else {
                responseData = {
                    "statusCode": 0,
                    "statusMsg": "FAIL",
                    "MsgError": ""
                }
                return responseData
            }

        } catch (error) {
            console.log(error);
            // LogUtils.error(headerData.messageId, this.name, this.updateTrackingStatus.name, JSON.stringify(body), err)
            responseStatus = JsonUtils.setResponseStatus(https_status.INTERNAL_SERVER_ERROR)
            return JsonUtils.setJsonOutput(headerData, responseStatus)
        }

    }

}

function trim(str) {
    var trimContent = str.trim();
    return trimContent
}

export default InfiniteAdminService;
