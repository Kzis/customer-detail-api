
import CustomersDAO from './dao';
import JsonUtils from '../../utils/json-utils'
import DateUtils from '../../utils/date-utils'
import LogUtils from '../../utils/log-utils'
import AsyncUtils from '../../utils/async-utils'
import https_status from '../../master/http-status'
import PolicyDAO from '../policy/dao'
import TypeUtils from '../../utils/type-utils'
import ValidateUtils from '../../utils/validate-utils'
import MemberProfileDAO from '../memberprofile/dao'

class CustomerService {


    static async findSearchByCitizenId(body) {

        //INITIAL DATA
        let fileName = this.name
        let functionName = this.findSearchByCitizenId.name

        let headerColumn = getHeaderSearchCustomer()
        let dataList = null
        let total = 0
        let responseStatus = {}
        let responseData = null

        try {

            let citizenId = body.requestRecord.citizenId
            let paging = body.requestRecord.paging
            let perPage = body.requestRecord.perPage

            //VALIDATE BODY
            if ((ValidateUtils.validateRequireField(citizenId)) ||
                ValidateUtils.validateRequireField(paging) ||
                ValidateUtils.validateRequireField(perPage)) {

                responseStatus = JsonUtils.setResponseStatus(https_status.PARAMETER_REQUIRE)
                return JsonUtils.setJsonOutput(headerData, responseRecord, responseStatus)
            }

            //GET DATA
            let data = await CustomersDAO.findSearchByCitizenId(citizenId, paging, perPage)

            //SET DATA RESPONS
            total = data.headerData.totalRecord != null ? data.headerData.totalRecord : 0
            dataList = getDataListSearchCustomer(data)
            responseStatus = data.responseStatus

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
            //MAP DATA RESPOS
            responseData = getCardSearchCustomer(headerColumn, dataList, total)

            //RETURN DATA
            responseData.cardForm.objectError = responseStatus
            return responseData
        }

    }

    static async fineSearchByCustomerName(body) {

        //INITIAL DATA
        let fileName = this.name
        let functionName = this.fineSearchByCustomerName.name

        let headerColumn = getHeaderSearchCustomer()
        let dataList = null
        let total = 0
        let responseStatus = {}
        let responseData = null

        try {

            let firstName = body.requestRecord.firstName
            let lastName = body.requestRecord.lastName
            let paging = body.requestRecord.paging
            let perPage = body.requestRecord.perPage

            //VALIDATE BODY
            if ((ValidateUtils.validateRequireField(firstName) &&
                ValidateUtils.validateRequireField(lastName)) ||
                ValidateUtils.validateRequireField(paging) ||
                ValidateUtils.validateRequireField(perPage)) {
                responseStatus = JsonUtils.setResponseStatus(https_status.PARAMETER_REQUIRE)
                return JsonUtils.setJsonOutput(headerData, responseRecord, responseStatus)
            }

            // GET DATA
            let data = await CustomersDAO.fineSearchByCustomerName(firstName, lastName, paging, perPage)

            //SET DATA RESPONS
            total = data.headerData.totalRecord != null ? data.headerData.totalRecord : 0
            dataList = getDataListSearchCustomer(data)

            responseStatus = data.responseStatus
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
            //MAP DATA RESPOS
            responseData = getCardSearchCustomer(headerColumn, dataList, total)

            //RETURN DATA
            responseData.cardForm.objectError = responseStatus
            return responseData
        }
    }

    static async fineSearchByPolicyNo(body) {

        //INITIAL DATA
        let fileName = this.name
        let functionName = this.fineSearchByPolicyNo.name

        let headerColumn = getHeaderSearchCustomer()
        let dataList = null
        let total = 0
        let responseStatus = {}
        let responseData = null

        try {

            let policyNo = body.requestRecord.firstName
            let certNo = body.requestRecord.lastName
            let paging = body.requestRecord.paging
            let perPage = body.requestRecord.perPage

            //VALIDATE BODY
            if (ValidateUtils.validateRequireField(policyNo) ||
                ValidateUtils.validateRequireField(paging) ||
                ValidateUtils.validateRequireField(perPage)) {

                responseStatus = JsonUtils.setResponseStatus(https_status.PARAMETER_REQUIRE)
                return JsonUtils.setJsonOutput(headerData, responseRecord, responseStatus)
            }


            let data = await CustomersDAO.fineSearchByPolicyNo(policyNo, certNo, paging, perPage)

            //SET DATA RESPONS
            total = data.headerData.totalRecord != null ? data.headerData.totalRecord : 0
            dataList = getDataListSearchCustomer(data)

            responseStatus = data.responseStatus

        } catch (err) {

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
            //MAP DATA RESPOS
            responseData = getCardSearchCustomer(headerColumn, dataList, total)

            //RETURN DATA
            responseData.cardForm.objectError = responseStatus
            return responseData
        }
    }

    static async getStaticCard(body) {

        let headerData = {}
        let responseStatus = {}
        let responseRecord = {}
        let fileName = this.name
        let functionName = this.getStaticCard.name
        try {

            let partyId = body.requestRecord.partyId

            //VALIDATE BODY
            if (ValidateUtils.validateRequireField(partyId)) {
                responseStatus = JsonUtils.setResponseStatus(https_status.PARAMETER_REQUIRE)
                return JsonUtils.setJsonOutput(headerData, responseRecord, responseStatus)
            }

            let jsonOutput = await CustomersDAO.findSearchByCustomerRef(partyId);
            headerData = jsonOutput['headerData']
            responseStatus = jsonOutput['responseStatus']
            if (Array.isArray(jsonOutput.responseRecord)) {

                let objRes = jsonOutput.responseRecord[0]
                let parts = await objRes.birth_date.split('/');
                let birthDate = new Date(parts[2], parts[1] - 1, parts[0]);
                //console.log(birthDate);

                let age = DateUtils.calculateAge(birthDate);

                responseRecord = {
                    "partyId": objRes.party_id,
                    "firstName": objRes.fname_th,
                    "lastName": objRes.lname_th,
                    "citizenID": objRes.citizen,
                    "age": age,
                    "sex": objRes.gender
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
            return JsonUtils.setJsonOutput(headerData, responseRecord, responseStatus)
        }
    }

    static async searchCustomer(body) {

        let dataSearchCustomer
        let headerData
        let responseRecord = {}
        let resultList = []
        let allData = 0
        let responseStatus

        headerData = JsonUtils.getHeaderData(body.headerData)

        const setSearchCustomer = async () => {

            try {

                let requestPerPage = ValidateUtils.convertToString(body.headerData.requestPerPage)
                let requestPage = ValidateUtils.convertToString(body.headerData.requestPage)
                let citizenId = ValidateUtils.convertToString(body.requestRecord.citizenId)
                let firstName = ValidateUtils.convertToString(body.requestRecord.firstName)
                let lastName = ValidateUtils.convertToString(body.requestRecord.lastName)
                let policyNo = ValidateUtils.convertToString(body.requestRecord.policyNo)
                let certNo = ValidateUtils.convertToString(body.requestRecord.certNo)

                if (ValidateUtils.validateRequireField(citizenId) &&
                    ValidateUtils.validateRequireField(firstName) &&
                    ValidateUtils.validateRequireField(lastName) &&
                    ValidateUtils.validateRequireField(policyNo)) {

                    responseStatus = JsonUtils.setResponseStatus(https_status.PARAMETER_REQUIRE)
                    return JsonUtils.setJsonOutput(headerData, responseRecord, responseStatus)
                }

                if (ValidateUtils.checkLength(citizenId, 20) &&
                    ValidateUtils.checkLength(firstName, 100) &&
                    ValidateUtils.checkLength(lastName, 100) &&
                    ValidateUtils.checkLength(policyNo, 8)) {

                    responseStatus = JsonUtils.setResponseStatus(https_status.PARAMETER_LENGTH_INVALID)
                    return JsonUtils.setJsonOutput(headerData, responseRecord, responseStatus)
                }

                if (policyNo != '') {
                    if (!ValidateUtils.checkPolicy(policyNo, certNo)) {
                        responseStatus = JsonUtils.setResponseStatus(https_status.PARAMETER_LENGTH_INVALID_POLICY_CASE)
                        return JsonUtils.setJsonOutput(headerData, responseRecord, responseStatus)
                    }
                }


                LogUtils.debug(headerData.messageId, this.name, this.searchCustomer.name, JSON.stringify(body), "searchCustomer")

                if (trim(citizenId) != '' || trim(firstName) != '' || trim(lastName) != '') {

                    // if (firstName.length < 3 && lastName.length < 3) {
                    //     responseStatus = 'กรุณาระบุ firstName และ lastName อย่างน้อย 3 ตัวอักษร'
                    //     return JsonUtils.setJsonOutput(headerData, responseStatus)
                    // } else if (firstName.length < 3) {
                    //         responseStatus = 'กรุณาระบุ firstName อย่างน้อย 3 ตัวอักษร'
                    //         return JsonUtils.setJsonOutput(headerData, responseStatus)
                    // } else if (lastName.length < 3) {
                    //     responseStatus = 'กรุณาระบุ lastName อย่างน้อย 3 ตัวอักษร'
                    //     return JsonUtils.setJsonOutput(headerData, responseStatus)
                    // } else {
                    //     return null
                    // }   
                    // console.log('*************************************************');

                    // console.log(firstName.length, lastName.length);


                    // if (citizenId == '') {
                    //     if (firstName.length < 3 || lastName.length == 0) {
                    //         responseStatus = 'กรุณาระบุ firstName อย่างน้อย 3 ตัวอักษร'
                    //         return JsonUtils.setJsonOutput(headerData, responseStatus)
                    //     } else if (lastName.length < 3 || lastName.length == 0) {
                    //         responseStatus = 'กรุณาระบุ lastName อย่างน้อย 3 ตัวอักษร'
                    //         return JsonUtils.setJsonOutput(headerData, responseStatus)
                    //     } else if (firstName.length == 0 && lastName.length == 0) {
                    //         responseStatus = 'กรุณาระบุ firstName และ lastName อย่างน้อย 3 ตัวอักษร'
                    //         return JsonUtils.setJsonOutput(headerData, responseStatus)
                    //     }
                    // }

                    dataSearchCustomer = await CustomersDAO.searchCustomer(requestPage, requestPerPage, trim(citizenId), trim(firstName), trim(lastName), trim(policyNo), trim(certNo))
                    allData = dataSearchCustomer.rows[0].alldata
                    responseRecord.allData = Math.floor(allData)
                    await AsyncUtils.asyncForEach(dataSearchCustomer.rows, async (element) => {

                        let data = {}

                        //let policyInfo = await CustomersDAO.searchPolicy(element.party_id, '', '')

                        data.partyId = ValidateUtils.convertToInteger(element.party_id),
                            data.pnameTh = ValidateUtils.convertToString(element.pname_th),
                            data.fnameTh = ValidateUtils.convertToString(element.fname_th),
                            data.lnameTh = ValidateUtils.convertToString(element.lname_th),
                            data.govtId = ValidateUtils.convertToString(element.govt_id),
                            //data.birthDate = DateUtils.setDateFormat(element.birth_date, 'dd/mm/yyyy'),
                            data.birthDate = DateUtils.getDateYearTH(element.birth_dateforbd),
                            data.race = ValidateUtils.convertToString(element.race),
                            data.gender = ValidateUtils.convertToString(element.gender),
                            data.citizen = ValidateUtils.convertToString(element.citizen),
                            data.bloodGroup = ValidateUtils.convertToString(element.blood_group),
                            data.height = ValidateUtils.convertToString(element.height),
                            data.weight = ValidateUtils.convertToString(element.weight)
                        //if (policyInfo != undefined) {
                        //    data.policyNumber = policyInfo.rows
                        //}
                        resultList.push(data)
                    });
                } else if (trim(policyNo) != '' || trim(certNo) != '') {
                    dataSearchCustomer = await CustomersDAO.searchCustomerPolicyNoAndCertNo(requestPage, requestPerPage, trim(policyNo), trim(certNo))
                    console.log(dataSearchCustomer.rows);

                    await AsyncUtils.asyncForEach(dataSearchCustomer.rows, async (element) => {

                        let data = {}

                        // let policyInfo = await CustomersDAO.searchPolicy('', element.policy_no, element.cert_no)

                        data.partyId = ValidateUtils.convertToInteger(element.party_id),
                            data.pnameTh = ValidateUtils.convertToString(element.pname_th),
                            data.fnameTh = ValidateUtils.convertToString(element.fname_th),
                            data.lnameTh = ValidateUtils.convertToString(element.lname_th),
                            data.govtId = ValidateUtils.convertToString(element.govt_id),
                            //data.birthDate = DateUtils.setDateFormat(element.birth_date, 'dd/mm/yyyy'),
                            data.birthDate = DateUtils.getDateYearTH(element.birth_dateforbd),
                            data.race = ValidateUtils.convertToString(element.race),
                            data.gender = ValidateUtils.convertToString(element.gender),
                            data.citizen = ValidateUtils.convertToString(element.citizen),
                            data.bloodGroup = ValidateUtils.convertToString(element.blood_group),
                            data.height = ValidateUtils.convertToString(element.height),
                            data.weight = ValidateUtils.convertToString(element.weight)
                        // if (policyInfo != undefined) {
                        //     data.policyNumber = policyInfo.rows
                        // } 
                        resultList.push(data)
                    });
                }

                responseRecord.resultList = resultList

                if (responseRecord === undefined || responseRecord == 0) {
                    responseStatus = JsonUtils.setResponseStatus(https_status.NOT_FOUND)
                } else {
                    responseStatus = JsonUtils.setResponseStatus(https_status.OK)
                }

            } catch (err) {
                console.log(err);

                LogUtils.error(headerData.messageId, this.name, this.searchCustomer.name, JSON.stringify(body), err)
                responseStatus = JsonUtils.setResponseStatus(https_status.INTERNAL_SERVER_ERROR)
                headerData = JsonUtils.getHeaderData(body.headerData)
                return JsonUtils.setJsonOutput(headerData, responseStatus)

            } finally {
                LogUtils.debug(headerData.messageId, this.name, this.searchCustomer.name, JSON.stringify(JsonUtils.setJsonOutput(headerData, responseRecord, responseStatus)), "searchCustomer")
                return JsonUtils.setJsonOutput(headerData, responseRecord, responseStatus)
            }
        }

        return setSearchCustomer()
    }

    static async searchByCustomerRef(body) {

        let headerData = JsonUtils.getHeaderData(body.headerData)
        let responseRecord
        let responseStatus = {}
        let homePhone = []
        let mobilePhone = []
        let email = []
        let address = []
        let socialmedia = []
        let partyId
        let itemPerson = {}
        let itemHomePhone = {}
        let itemMobilePhone = {}
        let itemEmail = {}
        let itemAddress = {}
        let itemSocialmedia = {}
        let dataPerson
        let dataHomePhone
        let dataMobilePhone
        let dataEmail
        let dataAddress
        let dataSocialmedia
        let dataHomeCustomerTier;
        let tierName = ""

        try {
            LogUtils.debug(headerData.messageId, this.name, this.searchByCustomerRef.name, JSON.stringify(body), "searchByCustomerRef")

            partyId = body.requestRecord.partyId

            if (ValidateUtils.validateRequireField(partyId)) {
                responseStatus = JsonUtils.setResponseStatus(https_status.PARAMETER_REQUIRE)
                return JsonUtils.setJsonOutput(headerData, responseRecord, responseStatus)
            }

            if (ValidateUtils.checkLength(partyId, 8)) {
                responseStatus = JsonUtils.setResponseStatus(https_status.PARAMETER_LENGTH_INVALID)
                return JsonUtils.setJsonOutput(headerData, responseRecord, responseStatus)
            }

            dataHomeCustomerTier = await MemberProfileDAO.getCustomerTier(partyId);

            if (dataHomeCustomerTier != undefined && dataHomeCustomerTier.rows != undefined) {
                tierName = dataHomeCustomerTier.rows[0] === undefined ? "" : dataHomeCustomerTier.rows[0].tier_name
            }

            if (ValidateUtils.validateRequireField(partyId)) {
                responseStatus = JsonUtils.setResponseStatus(https_status.PARAMETER_REQUIRE)
                return JsonUtils.setJsonOutput(headerData, responseRecord, responseStatus)
            }

            dataHomePhone = await CustomersDAO.searchByCustomerRefHomePhone(partyId)
            if (dataHomePhone !== undefined) {
                dataHomePhone.rows.forEach((index) => {
                    itemHomePhone = {
                        "phoneId": ValidateUtils.convertToString(index.phone_id),
                        "homePhone": ValidateUtils.convertToString(index.phone_number),
                        "extension": ValidateUtils.convertToString(index.extension),
                        "phoneType": ValidateUtils.convertToString(index.phone_type),
                        "sequence": ValidateUtils.convertToInteger(index.sequence)
                    }
                    homePhone.push(itemHomePhone)
                })
            }

            dataMobilePhone = await CustomersDAO.searchByCustomerRefMobilePhone(partyId)
            if (dataMobilePhone !== undefined) {
                dataMobilePhone.rows.forEach((index) => {
                    itemMobilePhone = {
                        "phoneId": ValidateUtils.convertToString(index.phone_id),
                        "mobilePhone": ValidateUtils.convertToInteger(index.phone_number),
                        "extension": ValidateUtils.convertToString(index.extension),
                        "phoneType": ValidateUtils.convertToString(index.phone_type),
                        "sequence": ValidateUtils.convertToInteger(index.sequence),
                        "isReciveSms": ValidateUtils.convertToBoolean(index.is_receive_sms)
                    }
                    mobilePhone.push(itemMobilePhone)
                })
            }

            dataEmail = await CustomersDAO.searchByCustomerRefEmail(partyId)
            if (dataEmail !== undefined) {
                dataEmail.rows.forEach((index) => {
                    itemEmail = {
                        "emailId": ValidateUtils.convertToString(index.email_id),
                        "addrLine": ValidateUtils.convertToString(index.addr_line)
                    }
                    email.push(itemEmail)
                })
            }

            dataAddress = await CustomersDAO.searchByCustomerRefAddress(partyId)

            if (dataAddress !== undefined) {
                dataAddress.rows.forEach((index) => {

                    let fullAddress = concatAddress(index)

                    itemAddress = {

                        "addressId": ValidateUtils.convertToString(index.address_id),
                        "houseNumber": ValidateUtils.convertToString(index.house_number),
                        "building": ValidateUtils.convertToString(index.building),
                        "villageName": ValidateUtils.convertToString(index.village_name),
                        "floor": ValidateUtils.convertToString(index.floor),
                        "room": ValidateUtils.convertToString(index.room),
                        "villageNumber": ValidateUtils.convertToString(index.village_number),
                        "road": ValidateUtils.convertToString(index.road),
                        "alley": ValidateUtils.convertToString(index.alley),
                        "lane": ValidateUtils.convertToString(index.lane),
                        "subDistrict": ValidateUtils.convertToString(index.sub_district),
                        "district": ValidateUtils.convertToString(index.district),
                        "province": ValidateUtils.convertToString(index.province),
                        "subDistrictCode": ValidateUtils.convertToInteger(index.subDistrictCode),
                        "zipCode": ValidateUtils.convertToString(index.zip_code),
                        "fullAddress": fullAddress
                    }
                    address.push(itemAddress)
                })
            }

            dataSocialmedia = await CustomersDAO.searchByCustomerRefSocialmedia(partyId)
            if (dataSocialmedia !== undefined) {
                dataSocialmedia.rows.forEach((social) => {
                    itemSocialmedia = {
                        "sequence": ValidateUtils.convertToInteger(social.sequence),
                        "nameTh": ValidateUtils.convertToString(social.name_th),
                        "nameEn": ValidateUtils.convertToString(social.name_en),
                        "accountReference": ValidateUtils.convertToString(social.account_reference)
                    }

                    socialmedia.push(itemSocialmedia)
                })
            }

            dataPerson = await CustomersDAO.searchByCustomerRefPerson(partyId)

            let age = 0
            if (dataPerson !== undefined) {

                dataPerson.rows.forEach((index) => {
                    age = index.birth_date == null ? "" : DateUtils.calculateAge(index.birth_date)
                    itemPerson = {
                        "customerTier": ValidateUtils.convertToString(tierName),
                        "partyId": ValidateUtils.convertToInteger(index.party_id),
                        "pnameTh": ValidateUtils.convertToString(index.pname_th),
                        "fnameTh": ValidateUtils.convertToString(index.fname_th),
                        "lnameTh": ValidateUtils.convertToString(index.lname_th),
                        "govtId": ValidateUtils.convertToString(index.govt_id),
                        "birthDate": index.birth_dateforbd == null ? "00/00/0000" : DateUtils.getDateYearTH(index.birth_dateforbd),
                        "age": ValidateUtils.convertToString(age),
                        "gender": ValidateUtils.convertToString(index.gender),
                        "homePhone": ValidateUtils.convertToString(homePhone),
                        "mobilePhone": ValidateUtils.convertToString(mobilePhone),
                        "email": ValidateUtils.convertToString(email),
                        "address": ValidateUtils.convertToString(address),
                        "socialmedia": ValidateUtils.convertToString(socialmedia)
                    }
                })
                //responseRecord.push(itemPerson)
                responseRecord = itemPerson
            }

            if (responseRecord === undefined || responseRecord === null) {
                responseRecord = null
                responseStatus = JsonUtils.setResponseStatus(https_status.NOT_FOUND)
            } else {
                responseStatus = JsonUtils.setResponseStatus(https_status.OK)
            }

        } catch (err) {
            console.log(err);

            LogUtils.error(headerData.messageId, this.name, this.searchByCustomerRef.name, JSON.stringify(body), err)
            responseStatus = JsonUtils.setResponseStatus(https_status.INTERNAL_SERVER_ERROR)
            headerData = JsonUtils.getHeaderData(body.headerData)
            return JsonUtils.setJsonOutput(headerData, responseStatus)
        } finally {
            LogUtils.debug(headerData.messageId, this.name, this.searchByCustomerRef.name, JSON.stringify(JsonUtils.setJsonOutput(headerData, responseRecord, responseStatus)), "searchCustomerRef")
            return JsonUtils.setJsonOutput(headerData, responseRecord, responseStatus)
        }
    }


    static async searchNextPremiumSummary(body) {

        let paymentList = []
        let totalPremium = 0
        let responseRecord = {}
        let responseStatus = {}
        let POL_DB_01

        let headerData = JsonUtils.getHeaderData(body.headerData)

        const setNextPremiumSummary = async () => {
            try {

                let messageId = body.headerData.messageId
                let sentDateTime = body.headerData.sentDateTime
                let partyId = body.requestRecord.partyId

                if (ValidateUtils.validateRequireField(partyId)) {
                    responseStatus = JsonUtils.setResponseStatus(https_status.PARAMETER_REQUIRE)
                    return JsonUtils.setJsonOutput(headerData, responseRecord, responseStatus)
                }

                if (ValidateUtils.checkLength(partyId, 8)) {
                    responseStatus = JsonUtils.setResponseStatus(https_status.PARAMETER_LENGTH_INVALID)
                    return JsonUtils.setJsonOutput(headerData, responseRecord, responseStatus)
                }

                POL_DB_01 = await CustomersDAO.POL_DB_01_SearchPolicyByCustomerId(messageId, sentDateTime, partyId)

                LogUtils.debug(headerData.messageId, this.name, this.searchNextPremiumSummary.name, JSON.stringify(body), "searchNextPremiumSummary")

                if (POL_DB_01 != undefined) {
                    await AsyncUtils.asyncForEach(POL_DB_01.responseRecord.list_of_policy, async (element) => {

                        let policy = {}
                        let policyInfo = await PolicyDAO.getPolicyPremium(element.policyno)
                        if (policyInfo.responseRecord.nextDueDate != null || responseRecord.nextPayPeriod != null) {
                            if (policyInfo.responseRecord.nextDueDate != '00/00/0000' || responseRecord.nextPayPeriod != '0000') {
                                if (policyInfo.responseRecord.premium != 0) {
                                    policy.policyNo = ValidateUtils.convertToString(element.policyno)
                                    policy.certNo = ValidateUtils.convertToString(element.certno)
                                    policy.nextDueDate = ValidateUtils.convertToString(policyInfo.responseRecord.nextDueDate)
                                    policy.payPeriod = ValidateUtils.convertToString(policyInfo.responseRecord.nextPayPeriod)
                                    policy.premium = ValidateUtils.convertToString(policyInfo.responseRecord.premium)
                                    policy.type = ValidateUtils.convertToString(element.type)
                                    totalPremium += policy.premium
                                    paymentList.push(policy)
                                }
                            }
                        }
                    });

                    responseRecord.totalPremium = totalPremium
                    responseRecord.paymentList = paymentList

                    let partyId = body.requestRecord.partyId

                    if (partyId === undefined) {
                        responseStatus = JsonUtils.setResponseStatus(https_status.PARAMETER_REQUIRE)
                        return JsonUtils.setJsonOutput(headerData, responseRecord, responseStatus)
                    }
                    responseStatus = JsonUtils.setResponseStatus(https_status.OK)

                } else {
                    responseStatus = JsonUtils.setResponseStatus(https_status.NOT_FOUND)
                }

            } catch (err) {
                LogUtils.error(headerData.messageId, this.name, this.searchNextPremiumSummary.name, JSON.stringify(body), err)
                responseStatus = JsonUtils.setResponseStatus(https_status.INTERNAL_SERVER_ERROR)
                headerData = JsonUtils.getHeaderData(body.headerData)
                return JsonUtils.setJsonOutput(headerData, responseStatus)
            } finally {
                LogUtils.debug(headerData.messageId, this.name, this.searchNextPremiumSummary.name, JSON.stringify(JsonUtils.setJsonOutput(headerData, responseRecord, responseStatus)), "searchNextPremiumSummary")
                return JsonUtils.setJsonOutput(headerData, responseRecord, responseStatus)
            }
        }
        return setNextPremiumSummary()
    }

    static async setPolicyPremium(responseRecord, element, paymentList) {

        let data = {}

        data.policy_no = element.policy_no
        data.cert_no = element.cert_no
        data.nextDueDate = responseRecord.nextDueDate
        data.payPeriod = responseRecord.payPeriod
        data.premium = responseRecord.premium
        paymentList.push(data)

    }

    //=======================================================================================================

    static async receiptDetail(body) {

        let headerData = {}
        let responseRecord = {}
        let responseStatus = {}
        let rider = {}
        let rpNo
        let type
        let payDate
        try {

            headerData = JsonUtils.getHeaderData(body.headerData)
            LogUtils.debug(headerData.messageId, this.name, this.receiptDetail.name, JSON.stringify(body), "receiptDetail")

            rpNo = body.requestRecord.rpNo
            type = body.requestRecord.type
            payDate = body.requestRecord.payDate

            if (ValidateUtils.validateRequireField(rpNo) ||
                ValidateUtils.validateRequireField(type) ||
                ValidateUtils.validateRequireField(payDate) ||
                type.length < 2
            ) {

                responseStatus = JsonUtils.setResponseStatus(https_status.PARAMETER_REQUIRE)
                return JsonUtils.setJsonOutput(headerData, responseRecord, responseStatus)

            } else {

                let typeTrue = TypeUtils.convertType(type)
                let totalPremium = 0
                let totalExtraPremium = 0
                let totalTopup = 0
                let data
                let listData = ""
                let resData = []
                let itemData = {}
                let n
                let m
                let dataRiderType
                let listRT = []
                switch (typeTrue) {
                    case 'OL':
                        data = await CustomersDAO.searchRiderTypeOLWhl(rpNo, payDate)
                        if (data == '' || data.rows == '') {
                            data = await CustomersDAO.searchRiderTypeOLWhlPayDate(rpNo, payDate)
                        }
                        listData = ""
                        resData = []
                        itemData = {}
                        n = 0
                        m = 18
                        if (data !== undefined) {
                            if (data.rows != '') {
                                data.rows.forEach(index => {
                                    listData += index.ridertext
                                });
                                let total = (listData.length - 15) / 18

                                itemData = {
                                    "riderType": "ชว",
                                    "premium": parseFloat(listData.substring((0), (9))).toFixed(2),
                                    "extraPremium": parseFloat(listData.substring((9), (15))).toFixed(2)
                                }
                                resData.push(itemData)

                                for (let i = 0; i < total; i++) {
                                    itemData = {
                                        "riderType": listData.substring((15 + n), (18 + n)),
                                        "premium": parseFloat(listData.substring((18 + n), (27 + n))).toFixed(2),
                                        "extraPremium": parseFloat(listData.substring((27 + n), (33 + n))).toFixed(2)
                                    }
                                    n += m
                                    resData.push(itemData)
                                }
                            }
                        }
                        responseRecord.riderList = resData
                        if (resData != '') {
                            resData.forEach(index => {
                                totalPremium = totalPremium + parseFloat(index.premium)
                                totalExtraPremium = totalExtraPremium + parseFloat(index.extraPremium)
                            });
                        }
                        break;
                    case 'WHL':
                        data = await CustomersDAO.searchRiderTypeOLWhl(rpNo, payDate)
                        if (data == '' || data.rows == '') {
                            data = await CustomersDAO.searchRiderTypeOLWhlPayDate(rpNo, payDate)
                        }
                        listData = ""
                        resData = []
                        itemData = {}
                        n = 0
                        m = 18
                        if (data !== undefined) {
                            if (data.rows != '') {
                                data.rows.forEach(index => {
                                    listData += index.ridertext
                                });
                                let total = (listData.length - 15) / 18

                                itemData = {
                                    "riderType": "ชว",
                                    "premium": parseFloat(listData.substring((0), (9))).toFixed(2),
                                    "extraPremium": parseFloat(listData.substring((9), (15))).toFixed(2)
                                }
                                resData.push(itemData)

                                for (let i = 0; i < total; i++) {
                                    itemData = {
                                        "riderType": listData.substring((15 + n), (18 + n)),
                                        "premium": parseFloat(listData.substring((18 + n), (27 + n))).toFixed(2),
                                        "extraPremium": parseFloat(listData.substring((27 + n), (33 + n))).toFixed(2)
                                    }
                                    n += m
                                    resData.push(itemData)
                                }
                            }
                        }
                        responseRecord.riderList = resData
                        if (resData != '') {
                            resData.forEach(index => {
                                totalPremium = totalPremium + parseFloat(index.premium)
                                totalExtraPremium = totalExtraPremium + parseFloat(index.extraPremium)
                            });
                        }
                        break;
                    case 'IND':
                        data = await CustomersDAO.searchRiderTypeInd(rpNo, payDate)
                        if (data == '' || data.rows == '') {
                            data = await CustomersDAO.searchRiderTypeIndPayDate(rpNo, payDate)
                        }
                        listData = ""
                        resData = []
                        itemData = {}
                        n = 0
                        m = 10
                        if (data !== undefined) {
                            if (data.rows != '') {
                                data.rows.forEach(index => {
                                    listData += index.ridertext
                                });
                                let total = (listData.length - 7) / 10

                                itemData = {
                                    "riderType": "ชว",
                                    "premium": parseFloat(listData.substring((0), (4))).toFixed(2),
                                    "extraPremium": parseFloat(listData.substring((4), (7))).toFixed(2)
                                }
                                resData.push(itemData)

                                for (let i = 0; i < total; i++) {
                                    itemData = {
                                        "riderType": listData.substring((7 + n), (10 + n)),
                                        "premium": parseFloat(listData.substring((10 + n), (14 + n))).toFixed(2),
                                        "extraPremium": parseFloat(listData.substring((14 + n), (17 + n))).toFixed(2)
                                    }
                                    n += m
                                    resData.push(itemData)
                                }
                            }
                        }
                        responseRecord.riderList = resData
                        if (data == '' || data.rows == '') {
                            resData.forEach(index => {
                                totalPremium = totalPremium + parseFloat(index.premium)
                                totalExtraPremium = totalExtraPremium + parseFloat(index.extraPremium)
                            });
                        }
                        break;
                    case 'UL':
                        data = await CustomersDAO.searchRiderTypeUl(rpNo, payDate)
                        if (data == '' || data.rows == '') {
                            data = await CustomersDAO.searchRiderTypeUlPayDate(rpNo, payDate)
                        }
                        listData = ""
                        resData = []
                        itemData = {}
                        n = 0
                        m = 18

                        if (data !== undefined) {
                            if (data.rows != '') {
                                data.rows.forEach(index => {
                                    listData += index.ridertext
                                });
                                let total = (listData.length - 24) / 18

                                let totalTopup = parseFloat(listData.substring(15, 24)).toFixed(2)

                                itemData = {
                                    "riderType": "ชว",
                                    "premium": parseFloat(listData.substring(0, 9)).toFixed(2),
                                    "extraPremium": parseFloat(listData.substring(9, 15)).toFixed(2)
                                }
                                resData.push(itemData)

                                for (let i = 0; i < total; i++) {
                                    itemData = {
                                        "riderType": listData.substring((24 + n), (27 + n)),
                                        "premium": parseFloat(listData.substring((27 + n), (36 + n))).toFixed(2),
                                        "extraPremium": parseFloat(listData.substring((36 + n), (42 + n))).toFixed(2)
                                    }
                                    n += m
                                    resData.push(itemData)
                                }
                            }
                        }
                        responseRecord.riderList = resData
                        if (resData != '') {
                            resData.forEach(index => {
                                totalPremium = totalPremium + parseFloat(index.premium)
                                totalExtraPremium = totalExtraPremium + parseFloat(index.extraPremium)
                            });
                        }
                        break;
                    case 'ULIP':
                        data = await CustomersDAO.searchRiderTypeUlip(rpNo, payDate)
                        if (data == '' || data.rows == '') {
                            data = await CustomersDAO.searchRiderTypeUlipPayDate(rpNo, payDate)
                        }
                        listData = ""
                        resData = []
                        itemData = {}
                        if (data !== undefined) {
                            if (data.rows != '') {
                                data.rows.forEach((index) => {
                                    itemData = {
                                        "riderType": index.ridertype,
                                        "premium": parseFloat(index.premium).toFixed(2),
                                        "extraPremium": parseFloat(index.extrapremium).toFixed(2)
                                    }
                                    resData.push(itemData)
                                })
                            }
                        }
                        responseRecord.riderList = resData
                        if (resData != '') {
                            resData.forEach(index => {
                                totalPremium = totalPremium + parseFloat(index.premium)
                                totalExtraPremium = totalExtraPremium + parseFloat(index.extraPremium)
                            });
                        }
                        break;
                    case 'CL':
                        data = await CustomersDAO.searchRiderTypeCl(rpNo, payDate)
                        if (data == '' || data.rows == '') {
                            data = await CustomersDAO.searchRiderTypeClPayDate(rpNo, payDate)
                        }
                        listData = ""
                        resData = []
                        itemData = {}
                        n = 0
                        m = 18
                        if (data !== undefined) {
                            if (data.rows != '') {
                                data.rows.forEach(index => {
                                    listData += index.ridertext
                                });
                                let total = (listData.length - 15) / 18

                                itemData = {
                                    "riderType": "ชว",
                                    "premium": parseFloat(listData.substring((0), (9))).toFixed(2),
                                    "extraPremium": parseFloat(listData.substring((9), (15))).toFixed(2)
                                }
                                resData.push(itemData)

                                for (let i = 0; i < total; i++) {
                                    itemData = {
                                        "riderType": listData.substring((15 + n), (18 + n)),
                                        "premium": parseFloat(listData.substring((18 + n), (27 + n))).toFixed(2),
                                        "extraPremium": parseFloat(listData.substring((27 + n), (33 + n))).toFixed(2)
                                    }
                                    n += m
                                    resData.push(itemData)
                                }
                            }
                        }

                        responseRecord.riderList = resData
                        if (resData != '') {
                            resData.forEach(index => {
                                totalPremium = totalPremium + parseFloat(index.premium)
                                totalExtraPremium = totalExtraPremium + parseFloat(index.extraPremium)
                            });
                        }
                        break;
                }

                dataRiderType = await PolicyDAO.getRiderType(headerData, resData)
                resData.forEach(ele => {
                    dataRiderType.responseRecord.list_rider.forEach(element => {

                        if (ele.riderType == element.riderType) {
                            let dataRT = {}
                            dataRT.riderType = element.riderType + " : " + element.riderName
                            dataRT.premium = ele.premium
                            dataRT.extraPremium = ele.extraPremium
                            listRT.push(dataRT)
                        }
                    })
                })

                responseRecord.riderList = listRT
                responseRecord.totalPremium = totalPremium.toFixed(2)
                responseRecord.totalExtraPremium = totalExtraPremium.toFixed(2)
                responseRecord.totalTopup = totalTopup.toFixed(2)

                if (responseRecord.riderList === undefined || responseRecord.riderList == 0 || responseRecord.riderList === "") {
                    responseStatus = JsonUtils.setResponseStatus(https_status.NOT_FOUND)
                } else {
                    responseStatus = JsonUtils.setResponseStatus(https_status.OK)
                }
            }

        } catch (err) {
            LogUtils.error(headerData.messageId, this.name, this.receiptDetail.name, JSON.stringify(body), err)
            responseStatus = JsonUtils.setResponseStatus(https_status.INTERNAL_SERVER_ERROR)
            return JsonUtils.setJsonOutput(headerData, responseStatus)
        } finally {
            LogUtils.debug(headerData.messageId, this.name, this.receiptDetail.name, JSON.stringify(JsonUtils.setJsonOutput(headerData, responseRecord, responseStatus)), "receiptDetail")
            return JsonUtils.setJsonOutput(headerData, responseRecord, responseStatus)
        }
    }

    static async policyStrategyUnitlink(body) {

        let headerData
        let responseRecord = []
        let responseStatus
        let strategyList = []


        headerData = JsonUtils.getHeaderData(body.headerData)

        try {

            LogUtils.debug(headerData.messageId, this.name, this.policyStrategyUnitlink.name, JSON.stringify(body), "policyStrategyUnitlink")


            let policyNo = body.requestRecord.policyNo

            if (ValidateUtils.validateRequireField(policyNo)) {
                responseStatus = JsonUtils.setResponseStatus(https_status.PARAMETER_REQUIRE)
                return JsonUtils.setJsonOutput(headerData, responseRecord, responseStatus)
            }

            if (ValidateUtils.checkLength(policyNo, 8)) {
                responseStatus = JsonUtils.setResponseStatus(https_status.PARAMETER_LENGTH_INVALID)
                return JsonUtils.setJsonOutput(headerData, responseRecord, responseStatus)
            }

            let policyStrategyDetail = await CustomersDAO.searchByPolicyStrategyDetailWherePolicyno(policyNo)

            policyStrategyDetail.rows.forEach(element => {
                let data = {}
                data.premiumType = ValidateUtils.convertToString(element.premiumtype)
                data.fundId = ValidateUtils.convertToString(element.fundcode)
                data.fundName = ValidateUtils.convertToString(element.fundthainame)
                data.percenTage = ValidateUtils.convertToString(element.percentage)
                strategyList.push(data)
            })

            responseRecord = {
                "strategyList": strategyList
            }

            if (responseRecord.strategyList === undefined || responseRecord.strategyList == '') {
                responseStatus = JsonUtils.setResponseStatus(https_status.NOT_FOUND)
            } else {
                responseStatus = JsonUtils.setResponseStatus(https_status.OK)
            }

        } catch (err) {
            LogUtils.error(headerData.messageId, this.name, this.policyStrategyUnitlink.name, JSON.stringify(body), err)
            responseStatus = JsonUtils.setResponseStatus(https_status.INTERNAL_SERVER_ERROR)
            return JsonUtils.setJsonOutput(headerData, responseStatus)
        } finally {
            LogUtils.debug(headerData.messageId, this.name, this.policyStrategyUnitlink.name, JSON.stringify(JsonUtils.setJsonOutput(headerData, responseRecord, responseStatus)), "policyStrategyUnitlink")
            return JsonUtils.setJsonOutput(headerData, responseRecord, responseStatus)
        }
    }

    static async costOfInsurance(body) {

        let headerData
        let responseRecord = []
        let responseStatus

        headerData = JsonUtils.getHeaderData(body.headerData)

        let YYYYMM
        let MMYYYY
        let policyno
        let type
        let transactionCost = []
        let data
        let sumTotal = 0

        try {


            policyno = ValidateUtils.convertToString(body.requestRecord.policyNo)
            type = TypeUtils.convertType(body.requestRecord.type)

            if (ValidateUtils.validateRequireField(policyno) ||
                ValidateUtils.validateRequireField(type)) {
                responseStatus = JsonUtils.setResponseStatus(https_status.PARAMETER_REQUIRE)
                return JsonUtils.setJsonOutput(headerData, responseRecord, responseStatus)
            }

            if (ValidateUtils.checkLength(policyno, 8)) {
                responseStatus = JsonUtils.setResponseStatus(https_status.PARAMETER_LENGTH_INVALID)
                return JsonUtils.setJsonOutput(headerData, responseRecord, responseStatus)
            }

            for (var i = 0; i < 6; i++) {
                YYYYMM = DateUtils.getDateNowYYMMDD(543, (i * -1), 0).substring(0, 6)
                MMYYYY = YYYYMM.substring(4, 6) + "/" + YYYYMM.substring(0, 4)

                if (type === 'UL') {
                    data = await CustomersDAO.searchCostOfInsuranceUL(policyno, YYYYMM)
                } else if (type === 'ULIP') {
                    data = await CustomersDAO.searchCostOfInsuranceULINK(policyno, YYYYMM)
                }
                let cost = {
                    "policyMonth": "MM/YYYY",
                    "coi": 0,
                    "pf": 0,
                    "ep": 0,
                    "rider": 0,
                    "extra": 0,
                    "total": 0
                }
                sumTotal = 0

                if (!isEmptyValue(data)) {

                    //console.log("wan ===> ",data)

                    if (data.rowCount != 0) {
                        await AsyncUtils.asyncForEach(data.rows, async (element) => {
                            cost.policyMonth = MMYYYY
                            switch (element.transactiontype) {
                                case 'COI':
                                    cost.coi = parseFloat(element.payment).toFixed(2)
                                    sumTotal = sumTotal + parseFloat(element.payment)
                                    break;
                                case 'PF':
                                    cost.pf = parseFloat(element.payment).toFixed(2)
                                    sumTotal = sumTotal + parseFloat(element.payment)
                                    break;
                                case 'EP':
                                    cost.ep = parseFloat(element.payment).toFixed(2)
                                    sumTotal = sumTotal + parseFloat(element.payment)
                                    break;
                                case 'RID':
                                    cost.rider = parseFloat(element.payment).toFixed(2)
                                    sumTotal = sumTotal + parseFloat(element.payment)
                                    break;
                                case 'extra':
                                    cost.extra = parseFloat(element.payment).toFixed(2)
                                    sumTotal = sumTotal + parseFloat(element.payment)
                                    break;
                            }
                        })
                        cost.total = sumTotal.toFixed(2)
                        transactionCost.push(cost)
                    }
                }
            }
            responseRecord = {
                "transactionCost": transactionCost
            }
        } catch (err) {
            console.log(err);
            responseStatus = JsonUtils.setResponseStatus(https_status.INTERNAL_SERVER_ERROR)
            return JsonUtils.setJsonOutput(headerData, responseStatus)
        } finally {
            return JsonUtils.setJsonOutput(headerData, responseRecord, responseStatus)
        }
    }


    static async posTransaction(body) {

        let headerData
        let responseRecord = []
        let responseStatus

        headerData = JsonUtils.getHeaderData(body.headerData)

        try {

            let partyId = body.requestRecord.partyId
            let inputDate = body.requestRecord.inputDate != '' ? body.requestRecord.inputDate : '6'

            let policyNo = {}
            let transactionList = []

            if (ValidateUtils.validateRequireField(partyId)) {
                responseStatus = JsonUtils.setResponseStatus(https_status.PARAMETER_REQUIRE)
                return JsonUtils.setJsonOutput(headerData, responseRecord, responseStatus)
            }

            if (ValidateUtils.checkLength(partyId, 8)) {
                responseStatus = JsonUtils.setResponseStatus(https_status.PARAMETER_LENGTH_INVALID)
                return JsonUtils.setJsonOutput(headerData, responseRecord, responseStatus)
            }

            policyNo = await CustomersDAO.searchByParty_id(partyId)
            
            await AsyncUtils.asyncForEach(policyNo.rows, async (element) => {
                let posTransaction = await CustomersDAO.searchbyPosTransaction(element.policy_no, DateUtils.getBackwardDate(inputDate))

                posTransaction.rows.forEach(element => {
                    let data = {}
                    let value = ""

                    if (element.nameandbenefit === 'Y') {
                        let nameandbenefit = 'กรมธรรม์และสัญญาแนบท้าย'
                        value += nameandbenefit
                    }

                    if (element.masterandrider === 'Y') {
                        let masterandrider = 'ชื่อและผู้รับผลประโยชน์'
                        if (value != "") {
                            value += "," + masterandrider
                        } else {
                            value += masterandrider
                        }
                    }

                    if (element.address === 'Y') {
                        let address = 'ที่อยู่'
                        if (value != "") {
                            value += "," + address
                        } else {
                            value += address
                        }
                    }

                    if (element.olddata === 'Y') {
                        let olddata = 'ข้อมูลบุคคลอื่น'
                        if (value != "") {
                            value += "," + olddata
                        } else {
                            value += olddata
                        }
                    }

                    data.policyNo = element.policyno
                    data.transactionDate = element.inputdate
                    data.transactionDesc = value

                    transactionList.push(data)
                })
            })

            responseRecord = {
                "transactionList": transactionList
            }
       
            if (policyNo.rows === undefined || policyNo.rows == '') {
                responseStatus = JsonUtils.setResponseStatus(https_status.NOT_FOUND)
            } else {
                responseStatus = JsonUtils.setResponseStatus(https_status.OK)
            }

        } catch (err) {
            console.log(err);
            LogUtils.error(headerData.messageId, this.name, this.posTransaction.name, JSON.stringify(body), err)
            responseStatus = JsonUtils.setResponseStatus(https_status.INTERNAL_SERVER_ERROR)
            return JsonUtils.setJsonOutput(headerData, responseStatus)
        } finally {
            return JsonUtils.setJsonOutput(headerData, responseRecord, responseStatus)
        }
    }

    static async calculateBenefitlnfo(body) {

        let headerData
        let responseRecord = {}
        let responseStatus
        let benifitList = []
        let totalAmount = 0
        let POL_DB_01

        headerData = JsonUtils.getHeaderData(body.headerData)

        try {

            LogUtils.debug(headerData.messageId, this.name, this.calculateBenefitlnfo.name, JSON.stringify(body), "")

            let messageId = body.headerData.messageId
            let sentDateTime = body.headerData.sentDateTime
            let partyId = body.requestRecord.partyId
            let policyNo = body.requestRecord.policyNo
            let certNo = body.requestRecord.certNo

            if (ValidateUtils.validateRequireField(partyId)) {
                responseStatus = JsonUtils.setResponseStatus(https_status.PARAMETER_REQUIRE)
                return JsonUtils.setJsonOutput(headerData, responseRecord, responseStatus)
            }

            if (ValidateUtils.checkLength(partyId, 8)) {
                responseStatus = JsonUtils.setResponseStatus(https_status.PARAMETER_LENGTH_INVALID)
                return JsonUtils.setJsonOutput(headerData, responseRecord, responseStatus)
            }

            POL_DB_01 = await CustomersDAO.POL_DB_01_SearchPolicyByCustomerId(messageId, sentDateTime, partyId)

            LogUtils.debug(headerData.messageId, this.name, this.calculateBenefitlnfo.name, JSON.stringify(body), "calculateBenefitlnfo")

            if (POL_DB_01 != undefined) {
                await AsyncUtils.asyncForEach(POL_DB_01.responseRecord.list_of_policy, async (element) => {

                    //เงินปันผล(Divined)
                    let divinedlnfo = await CustomersDAO.getBenefitlnfo(element.policyno, '1', DateUtils.getDateNowDDMMYYYY())
                    console.log('******************** get divined ******************');
                    console.log(divinedlnfo);

                    if (divinedlnfo.responseRecord.cashReturnDividenedMs != null) {
                        let cashReturnDividenedMs = divinedlnfo.responseRecord.cashReturnDividenedMs
                        await AsyncUtils.asyncForEach(cashReturnDividenedMs, async (cashReturn) => {
                            await AsyncUtils.asyncForEach(cashReturn.cashNotRecievedTypes, async (dividentRecieved) => {

                                let divined = {}
                                divined.policyNo = element.policyno
                                divined.certNo = element.certno

                                divined.type = "เงินปันผล"
                                divined.year = dividentRecieved.recieveYear
                                divined.payDate = dividentRecieved.recieveDate
                                divined.amount = parseFloat(dividentRecieved.receiveAmount)
                                divined.interest = parseFloat(dividentRecieved.receiveInterest)
                                totalAmount += parseFloat(dividentRecieved.receiveAmount) + parseFloat(dividentRecieved.receiveInterest)
                                benifitList.push(divined)
                            });
                        });
                    }

                    //เงินจ่ายคืน(Reimbursement)
                    let reimbursementInfo = await CustomersDAO.getBenefitlnfo(element.policyno, '2', DateUtils.getDateNowDDMMYYYY())
                    console.log('******************** get reimbursementInfo ******************');
                    console.log(reimbursementInfo);
                    if (reimbursementInfo.responseRecord.cashReturnCanMs != null) {

                        let cashReturnCanMs = reimbursementInfo.responseRecord.cashReturnCanMs
                        await AsyncUtils.asyncForEach(cashReturnCanMs, async (cashReturn) => {
                            await AsyncUtils.asyncForEach(cashReturn.cashNotRecievedTypes, async (cashRecieved) => {

                                let reimbursement = {}
                                reimbursement.policyNo = element.policyno
                                reimbursement.certNo = element.certno

                                reimbursement.type = "เงินจ่ายคืน"
                                reimbursement.year = cashRecieved.recieveYear
                                reimbursement.payDate = cashRecieved.recieveDate
                                reimbursement.amount = parseFloat(cashRecieved.receiveAmount)
                                reimbursement.interest = parseFloat(cashRecieved.recieveInterest)
                                totalAmount += parseFloat(cashRecieved.receiveAmount) + parseFloat(cashRecieved.recieveInterest)
                                benifitList.push(reimbursement)
                            });
                        });
                    }
                });

                //responseRecord.partyId = partyId
                responseRecord.benifitList = benifitList
                responseRecord.totalAmount = totalAmount

                responseStatus = JsonUtils.setResponseStatus(https_status.OK)

            } else {
                responseStatus = JsonUtils.setResponseStatus(https_status.NOT_FOUND)
            }

        } catch (err) {
            console.log(err);

            LogUtils.error(headerData.messageId, this.name, this.calculateBenefitlnfo.name, JSON.stringify(body), err)
            responseStatus = JsonUtils.setResponseStatus(https_status.INTERNAL_SERVER_ERROR)
            headerData = JsonUtils.getHeaderData(body.headerData)
            return JsonUtils.setJsonOutput(headerData, responseStatus)
        } finally {
            LogUtils.debug(headerData.messageId, this.name, this.calculateBenefitlnfo.name, JSON.stringify(JsonUtils.setJsonOutput(headerData, responseRecord, responseStatus)), "")
            return JsonUtils.setJsonOutput(headerData, responseRecord, responseStatus)
        }
    }

    static async calculatePolicyLoan(body) {

        let headerData
        let resp = []
        let responseRecord = {}
        let responseStatus
        let POL_DB_01
        let totalLoad = 0

        headerData = JsonUtils.getHeaderData(body.headerData)
        const calculatePolicyLoan = async () => {
            try {

                LogUtils.debug(headerData.messageId, this.name, this.calculatePolicyLoan.name, JSON.stringify(body), "calculatePolicyLoan")
                let calLoanList = []

                let messageId = body.headerData.messageId
                let sentDateTime = body.headerData.sentDateTime
                let partyId = body.requestRecord.partyId

                if (ValidateUtils.validateRequireField(partyId)) {
                    responseStatus = JsonUtils.setResponseStatus(https_status.PARAMETER_REQUIRE)
                    return JsonUtils.setJsonOutput(headerData, responseRecord, responseStatus)
                }

                if (ValidateUtils.checkLength(partyId, 8)) {
                    responseStatus = JsonUtils.setResponseStatus(https_status.PARAMETER_LENGTH_INVALID)
                    return JsonUtils.setJsonOutput(headerData, responseRecord, responseStatus)
                }

                POL_DB_01 = await CustomersDAO.POL_DB_01_SearchPolicyByCustomerId(messageId, sentDateTime, partyId)
                LogUtils.debug(headerData.messageId, this.name, this.calculatePolicyLoan.name, JSON.stringify(body), "calculatePolicyLoan")

                if (POL_DB_01 != undefined) {

                    await AsyncUtils.asyncForEach(POL_DB_01.responseRecord.list_of_policy, async (element) => {

                        let calLoan = {}
                        let loanPremium = await CustomersDAO.findGetLoadPremium(headerData, element.policyno, element.certno, element.type)

                        calLoan.policyNo = element.policyno
                        calLoan.certNo = element.certno
                        calLoan.loanAmount = loanPremium.responseRecord.comloanamount
                        calLoan.type = element.type
                        totalLoad += totalLoad + loanPremium.responseRecord.comloanamount

                        calLoanList.push(calLoan)
                    });

                    responseRecord.calLoanList = calLoanList
                    responseRecord.totalLoanAmount = totalLoad
                    responseStatus = JsonUtils.setResponseStatus(https_status.OK)

                } else {
                    responseStatus = JsonUtils.setResponseStatus(https_status.NOT_FOUND)
                }

            } catch (err) {
                LogUtils.debug(headerData.messageId, this.name, this.calculatePolicyLoan.name, JSON.stringify(body), err)
            } finally {
                LogUtils.debug(headerData.messageId, this.name, this.calculateBenefitlnfo.name, JSON.stringify(JsonUtils.setJsonOutput(headerData, responseRecord, responseStatus)), "")
                return JsonUtils.setJsonOutput(headerData, responseRecord, responseStatus)
            }
        }

        return calculatePolicyLoan()
    }

    static async serviceRequestList(body) {
        let headerData = JsonUtils.getHeaderData(body.headerData)
        let responseRecord = {}
        let responseStatus = {}
        let srList = []
        let inputDateBackwardDate
        let backwardDate
        try {

            LogUtils.debug(headerData.messageId, this.name, this.serviceRequestList.name, JSON.stringify(body), "serviceRequestList")

            let citizenId = body.requestRecord.citizenId
            // let inputDate = body.requestRecord.inputDate

            if (ValidateUtils.validateRequireField(citizenId)) {

                responseStatus = JsonUtils.setResponseStatus(https_status.PARAMETER_REQUIRE)
                return JsonUtils.setJsonOutput(headerData, responseRecord, responseStatus)
            }

            // inputDateBackwardDate = DateUtils.getBackwardDate(inputDate)
            // backwardDate = DateUtils.getDataToISOString(inputDateBackwardDate, 'yyyymmdd')
            // let dataCC = await CustomersDAO.searchSrListCC(citizenId, backwardDate)
            let dataCC = await CustomersDAO.searchSrListCC(citizenId)
            if (dataCC != undefined) {
                await AsyncUtils.asyncForEach(dataCC.recordset, async (element) => {
                    let itemDataCC = {}
                    itemDataCC.srNo = element.sr_number
                    itemDataCC.createDate = element.created_date
                    itemDataCC.contactChannel = "Contact Center - CC"
                    itemDataCC.contactMethod = element.contactmethod
                    itemDataCC.contactPerson = element.contact_first_name + " " + element.contact_last_name
                    itemDataCC.subjectType = element.subjecttype
                    itemDataCC.mainSubject = element.mainsubject
                    itemDataCC.subSubject = (element.subsubject === null ? "" : element.subsubject)
                    itemDataCC.srStatus = element.statusdesc
                    itemDataCC.entityId = element.entity_id

                    srList.push(itemDataCC)
                })
            }

            let dataACC = await CustomersDAO.searchSrListACC(citizenId)
            if (dataACC != undefined) {
                await AsyncUtils.asyncForEach(dataACC.recordset, async (element) => {
                    console.log("wan data acc ==> ", element.sr_number)
                    let itemDataACC = {}
                    itemDataACC.srNo = element.sr_number
                    itemDataACC.createDate = element.reg_time
                    itemDataACC.contactChannel = "Contact Center - ACC"
                    itemDataACC.contactMethod = element.contactmethod
                    itemDataACC.contactPerson = element.prename + " " + element.firstname + " " + element.lastname
                    itemDataACC.subjectType = element.subjecttype
                    itemDataACC.mainSubject = element.mainsubject
                    itemDataACC.subSubject = element.subsubject
                    itemDataACC.srStatus = element.statusdesc
                    itemDataACC.entityId = ""

                    srList.push(itemDataACC)
                })
            }

            if (srList.length == 0) {
                responseStatus = JsonUtils.setResponseStatus(https_status.NOT_FOUND)
            } else {
                responseRecord = {
                    "srList": srList
                }
                responseStatus = JsonUtils.setResponseStatus(https_status.OK)
            }

            return JsonUtils.setJsonOutput(headerData, responseRecord, responseStatus)

        } catch (err) {
            console.log(err);
            LogUtils.error(headerData.messageId, this.name, this.serviceRequestList.name, JSON.stringify(body), err)
            responseStatus = JsonUtils.setResponseStatus(https_status.INTERNAL_SERVER_ERROR)
            return JsonUtils.setJsonOutput(headerData, responseStatus)
        }
    }

    static async serviceRequestDetail(body) {
        let headerData = JsonUtils.getHeaderData(body.headerData)
        let responseRecord = {}
        let responseStatus = {}
        let itemData = {}
        try {

            LogUtils.debug(headerData.messageId, this.name, this.serviceRequestDetail.name, JSON.stringify(body), "serviceRequestDetail")

            let srNo = body.requestRecord.srNo
            let contactChannel = body.requestRecord.contactChannel
            let entityId = body.requestRecord.entityId

            switch (contactChannel) {
                case 'Contact Center - CC':

                    if (ValidateUtils.validateRequireField(srNo) || ValidateUtils.validateRequireField(contactChannel)
                        || ValidateUtils.validateRequireField(entityId)) {

                        responseStatus = JsonUtils.setResponseStatus(https_status.PARAMETER_REQUIRE)
                        return JsonUtils.setJsonOutput(headerData, responseRecord, responseStatus)
                    }

                    let dataCC = await CustomersDAO.searchSrDetailCC(srNo, entityId)
                    if (dataCC != undefined) {
                        await AsyncUtils.asyncForEach(dataCC.recordset, async (element) => {

                            itemData.subjectType = element.subjectType
                            itemData.mainSubject = element.mainSubject
                            itemData.subSubject = element.subSubject
                            itemData.contactChannel = "Contact Center - CC"
                            itemData.contactMethod = element.contactMethod
                            itemData.reference = element.sr_number
                            itemData.detail = element.description
                            itemData.srOwner = element.first_name_th + " " + element.last_name_th
                        })
                    }
                    break;
                case 'Contact Center - ACC':

                    if (ValidateUtils.validateRequireField(srNo) || ValidateUtils.validateRequireField(contactChannel)) {

                        responseStatus = JsonUtils.setResponseStatus(https_status.PARAMETER_REQUIRE)
                        return JsonUtils.setJsonOutput(headerData, responseRecord, responseStatus)
                    }

                    let dataACC = await CustomersDAO.searchSrDetailACC(srNo)
                    if (dataACC != undefined) {
                        await AsyncUtils.asyncForEach(dataACC.recordset, async (element) => {

                            itemData.subjectType = element.subjectType
                            itemData.mainSubject = element.mainSubject
                            itemData.subSubject = element.subSubject
                            itemData.contactChannel = "Contact Center - ACC"
                            itemData.contactMethod = element.contactMethod
                            itemData.reference = element.sr_number
                            itemData.detail = element.descp
                            itemData.srOwner = element.srOwner
                        })
                    }
                    break;
            }

            if (itemData.length == 0) {
                responseStatus = JsonUtils.setResponseStatus(https_status.NOT_FOUND)
            } else {
                responseRecord = itemData
                responseStatus = JsonUtils.setResponseStatus(https_status.OK)
            }

            return JsonUtils.setJsonOutput(headerData, responseRecord, responseStatus)

        } catch (err) {
            console.log(err);
            LogUtils.error(headerData.messageId, this.name, this.serviceRequestDetail.name, JSON.stringify(body), err)
            responseStatus = JsonUtils.setResponseStatus(https_status.INTERNAL_SERVER_ERROR)
            return JsonUtils.setJsonOutput(headerData, responseStatus)
        }
    }

    static async appUNWList(body) {
        return null
    }

    static async claimInquiry(body) {
        let headerData = JsonUtils.getHeaderData(body.headerData)
        let responseRecord = {}
        let responseStatus = {}
        let claimList = []
        let test = []
        try {
            LogUtils.debug(headerData.messageId, this.name, this.claimInquiry.name, JSON.stringify(body), "claimInquiry")
            let messageId = ValidateUtils.convertToString(body.headerData.messageId)
            let sentDateTime = ValidateUtils.convertToString(body.headerData.sentDateTime)
            let partyId = ValidateUtils.convertToString(body.requestRecord.partyId)
            let inputDate = ValidateUtils.convertToString(body.requestRecord.inputDate) != '' ? ValidateUtils.convertToString(body.requestRecord.inputDate) : '6'
            let accidentDateTo = DateUtils.setDateFormat(new Date(), 'dd/mm/yyyy')

            let POLDB01 = await CustomersDAO.POL_DB_01_SearchPolicyByCustomerId(messageId, sentDateTime, partyId)

            await AsyncUtils.asyncForEach(POLDB01.responseRecord.list_of_policy, async (element) => {

                // get data CLM01
                if (element.policyno.length > 4) {
                    let claimInquiry = await CustomersDAO.searchClaimInquiry(element.policyno, '', '', '', '', '', '', DateUtils.getBackwardDate(inputDate), accidentDateTo)

                    await AsyncUtils.asyncForEach(claimInquiry.responseRecord.claimHeaderTypeList, async (element) => {
                        let data = {}

                        let dataTest = {}
                        //console.log("wan element.orderNo ===> ", element.orderNo)
                        //console.log("wan test ===> ", test.length)
                        let chkOrderNo = element.orderNo
                        let chk = 0

                        if (test.length > 0) {

                            for (let i = 0; i < test.length; i++) {

                                if (chkOrderNo == test[i]) {
                                    //console.log("chkOrderNo ===> ", chkOrderNo)
                                    //console.log("test[i] ===> ", test[i])
                                    chk = 1
                                }
                            }
                        }
                        //console.log("wan chk ===> ", chk)

                        if (chk != 1) {
                            // get data CLM02
                            let claimDetail = await CustomersDAO.searchClaimDetail(element.orderNo)

                            data.orderNo = ValidateUtils.convertToString(element.orderNo)
                            data.claimType = ValidateUtils.convertToString(claimDetail.responseRecord.claimDetailType[0].claimType)
                            data.accidentDate = ValidateUtils.convertToString(element.accidentDate)
                            data.remark = ValidateUtils.convertToString(element.remark)
                            data.claimOkDate = ValidateUtils.convertToString(element.claimOkDate)

                            claimList.push(data)

                            dataTest = element.orderNo
                            test.push(dataTest)
                        }
                    })
                }

            })

            //console.log("wan test ===> ", test)

            responseRecord = {
                "claimHeaderTypeList": claimList
            }

            if (claimList.length == 0) {
                responseStatus = JsonUtils.setResponseStatus(https_status.NOT_FOUND)
            } else {
                responseStatus = JsonUtils.setResponseStatus(https_status.OK)
            }

            return JsonUtils.setJsonOutput(headerData, responseRecord, responseStatus)

        } catch (err) {
            console.log(err);
            LogUtils.error(headerData.messageId, this.name, this.claimInquiry.name, JSON.stringify(body), err)
            responseStatus = JsonUtils.setResponseStatus(https_status.INTERNAL_SERVER_ERROR)
            return JsonUtils.setJsonOutput(headerData, responseStatus)
        }
    }

    static async claimDetail(body) {

        let headerData = JsonUtils.getHeaderData(body.headerData)
        let responseRecord = []
        let claimDetailList = []
        let mdaClaim = []
        let responseStatus = {}

        try {
            LogUtils.debug(headerData.messageId, this.name, this.claimDetail.name, JSON.stringify(body), "claimDetail")
            let numberIdCase = body.requestRecord.numberIdCase
            let claimDetail = await CustomersDAO.searchClaimDetail(numberIdCase)

            if (claimDetail.responseStatus.statusCode == 'E') {
                responseStatus = JsonUtils.setResponseStatus(https_status.NOT_FOUND)
                return JsonUtils.setJsonOutput(headerData, '', responseStatus)
            }
            await AsyncUtils.asyncForEach(claimDetail.responseRecord.claimDetailType, async (element) => {
                let data = {}

                let claimInquiry = await CustomersDAO.searchClaimInquiry(element.policyNo, numberIdCase, '', '', '', '', '', '', '')

                let mdaClaimDetail = await CustomersDAO.mdaClaimDetail(claimInquiry.responseRecord.claimHeaderTypeList[0].orderNo, element.remarkNo)

                for (let i = 1; i < mdaClaimDetail.detail.items.item.length - 1; i++) {
                    mdaClaim.push(mdaClaimDetail.detail.items.item[i])
                }

                data.policyNo = ValidateUtils.convertToString(element.policyNo)
                data.claimType = ValidateUtils.convertToString(element.claimType)
                data.amount = ValidateUtils.convertToInteger(element.amount)
                data.claimPayDate = ValidateUtils.convertToString(element.claimPayDate)
                data.recieveType = ValidateUtils.convertToString(element.recieveType)
                data.approveDate = ValidateUtils.convertToString(element.approveDate)
                data.remarkNo = ValidateUtils.convertToString(element.remarkNo)
                data.orderNo = ValidateUtils.convertToString(claimInquiry.responseRecord.claimHeaderTypeList[0].orderNo)
                data.receiveDate = ValidateUtils.convertToString(claimInquiry.responseRecord.claimHeaderTypeList[0].receiveDate)
                data.accidentDate = ValidateUtils.convertToString(claimInquiry.responseRecord.claimHeaderTypeList[0].accidentDate)
                data.payDetail = mdaClaim
                claimDetailList.push(data)
            })

            responseRecord = {
                "claimDetailList": claimDetailList
            }
            if (responseRecord != undefined || responseRecord != '') {
                responseStatus = JsonUtils.setResponseStatus(https_status.OK)
            }

            return JsonUtils.setJsonOutput(headerData, responseRecord, responseStatus)

        } catch (err) {
            console.log(err);
            LogUtils.error(headerData.messageId, this.name, this.claimDetail.name, JSON.stringify(body), err)
            responseStatus = JsonUtils.setResponseStatus(https_status.INTERNAL_SERVER_ERROR)
            return JsonUtils.setJsonOutput(headerData, responseStatus)
        }
    }

}

function getHeaderSearchCustomer() {
    return ['FirstName', 'LastName', 'CitizenID', 'PolicyNumber']
}

function getDataListSearchCustomer(data) {
    let dataList = []
    let party_id = []
    let citizen_Id = []
    let count_party_id = 0
    let count_citizen_Id = 0

    if (data.responseRecord != null) {

        data.responseRecord.forEach(element => {
            party_id.push(element.party_id)
        })

        data.responseRecord.forEach(element => {
            citizen_Id.push(element.govt_id)
        })

        data.responseRecord.forEach(element => {

            let tempData = []
            let value = ''

            if (element.policyNumber != null) {
                element.policyNumber.forEach(ele => {
                    value = value + ele.policy_No + ele.cert_No + ' ,'
                });
            }

            let fname_th = JsonUtils.mapDataColumn("String", "n", element.fname_th)
            let lname_th = JsonUtils.mapDataColumn("String", "n", element.lname_th)
            let govt_id = JsonUtils.mapDataColumn("String", "n", element.govt_id)
            let policy = JsonUtils.mapDataColumn("String", "n", value.substring(0, value.length - 2))

            tempData.push(fname_th)
            tempData.push(lname_th)
            tempData.push(govt_id)
            tempData.push(policy)


            let columnData = {
                partyId: party_id[count_party_id++],
                citizenId: citizen_Id[count_citizen_Id++],
                columnData: tempData
            }

            dataList.push(columnData)

        });
    }

    return dataList
}

function getCardSearchCustomer(headerColumn, dataList, total) {

    let response = JsonUtils.getJsonTemplate()

    response.cardForm.objectRender = {
        contactList: JsonUtils.mapDataTable(headerColumn, dataList, total)
    }

    return response
}

function concatAddress(index) {
    let fullAddress = "";
    fullAddress = fullAddress + (isEmptyValue(index.house_number) ? "" : "เลขที่ " + index.house_number + " ")
    fullAddress = fullAddress + (isEmptyValue(index.building) ? "" : "อาคาร/ตึก " + index.building + " ")
    fullAddress = fullAddress + (isEmptyValue(index.floor) ? "" : "ชั้น " + index.floor + " ")
    fullAddress = fullAddress + (isEmptyValue(index.room) ? "" : "ห้อง " + index.room + " ")
    fullAddress = fullAddress + (isEmptyValue(index.village_number) ? "" : "หมู่ที่ " + index.village_number + " ")
    fullAddress = fullAddress + (isEmptyValue(index.village_name) ? "" : "หมู่บ้าน " + index.village_name + " ")
    fullAddress = fullAddress + (isEmptyValue(index.alley) ? "" : "ตรอก " + index.alley + " ")
    fullAddress = fullAddress + (isEmptyValue(index.lane) ? "" : "ซอย " + index.lane + " ")
    fullAddress = fullAddress + (isEmptyValue(index.road) ? "" : "ถนน " + index.road + " ")
    fullAddress = fullAddress + (isEmptyValue(index.sub_district) ? "" : "ต. " + index.sub_district + " ")
    fullAddress = fullAddress + (isEmptyValue(index.district) ? "" : "อ. " + index.district + " ")
    fullAddress = fullAddress + (isEmptyValue(index.province) ? "" : "จ. " + index.province + " ")
    fullAddress = fullAddress + (isEmptyValue(index.zip_code) ? "" : "" + index.zip_code)
    return fullAddress
}
function isEmptyValue(value) {
    if (value == "" || value == null || value == undefined) {
        return true
    }
    return false
}

function trim(str) {
    var trimContent = str.trim();
    return trimContent
}


export default CustomerService;
