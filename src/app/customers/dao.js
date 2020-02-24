
import CustomersModel from './model'
import { call, callApiGet } from '../../utils/api-utils'
import DataBaseUtils from '../../utils/database-utils'
import DateUtils from '../../utils/date-utils'
import ValidateUtils from '../../utils/validate-utils'

class CustomersDAO {

    constructor() {
        this.key = 'customers';
    }

    static async findSearchByCitizenId(citizenId, paging, perPage) {

        const headerData = {
            recordPerPage: perPage,
            requestPage: paging
        }

        const condition = {
            citizenId: citizenId
        }

        const data = await call("SearchByCitizenId", headerData, condition)

        return data;
    }


    static async fineSearchByCustomerName(firstName, lastName, paging, perPage) {

        const headerData = {
            recordPerPage: perPage,
            requestPage: paging
        }

        const condition = {
            firstName: firstName,
            lastName: lastName

        }

        const data = await call("SearchByCustomerName", headerData, condition, true)

        return data;

    }

    static async fineSearchByPolicyNo(policyNo, certNo, paging, perPage) {

        const headerData = {
            recordPerPage: perPage,
            requestPage: paging
        }

        //     let headerData
        //     let responseRecord = []
        //     let responseStatus

        //     headerData = JsonUtils.getHeaderData(body.headerData)

        //     try {

        //         //set data

        //         let detaTransactionCost = {

        //             "policyMonth": "02/2562",
        //             "coi": 123,
        //             "pf": 546,
        //             "ep": 400,
        //             "rider": 500,
        //             "extra": 600,
        //             "total": 14050
        //         }
        //         let detaTransactionCost2 = {

        //             "policyMonth": "02/2562",
        //             "coi": 124,
        //             "pf": 546,
        //             "ep": 400,
        //             "rider": 500,
        //             "extra": 600,
        //             "total": 14050
        //         }

        //         let transactionCostList = [
        //             detaTransactionCost,
        //             detaTransactionCost2
        //         ]
        //         responseRecord = {
        //             "transactionCost": transactionCostList
        //         }


        //     } catch (err) {
        //         console.log(err);
        //     } finally {
        //         responseStatus = JsonUtils.setResponseStatus(https_status.OK)
        //         return JsonUtils.setJsonOutput(headerData, responseRecord, responseStatus)
        //     }
        // }
        const condition = {
            policyNo: policyNo,
            certNo: certNo,
        }

        const data = await call("SearchByPolicyNo", headerData, condition, true)
        //console.log(data);


        return data;

    }


    static async findSearchByCustomerRef(id) {

        const header = {
        }

        const condition = {
            partyId: id
        }

        const data = await call("SearchByCustomerRef", header, condition, true)

        return data;

    }

    static async searchCustomer(requestPage, requestPerPage, citizenId, firstName, lastName, policyNo, certNo) {

        let client = await DataBaseUtils.getConnectionsCustomerParty()
        let offset = ((requestPage - 1) * requestPerPage + 1) - 1
        let count = 1

        let where = ''
        let condition = ''
        let paramsValues = []
        let orderBy = ''
        // let from = 'from party.party party'
        //     + ' ' + 'inner join party.person person on party.party_id = person.party_id'
        //     + ' ' + 'left join policy.policy_participant policy_participant on party.party_id = policy_participant.party_id '
        let from = 'from party.person person'
            + ' ' + 'inner join party.party party on party.party_id = person.party_id'
            + ' ' + 'left join policy.policy_participant policy_participant on policy_participant.party_id = person.party_id and policy_participant.participant_role = ' + '1'
        let groupBy = 'group by person.party_id, person.pname_th, person.fname_th, person.lname_th, party.govt_id, person.race,'
            + ' ' + 'person.birth_date, person.gender, person.citizen, person.blood_group, person.height, person.weight'

        orderBy = orderBy + 'order by person.party_id, fname_th, lname_th'

        if (requestPage != '' && requestPerPage != '') {
            orderBy = orderBy + ' offset ' + offset + ' limit ' + requestPerPage
        }

        condition = condition + ' 1 = 1 '

        if (citizenId != '' && citizenId != undefined) {
            condition = condition + ' and party.govt_id = $' + count++
            paramsValues.push(citizenId)
        }

        // if (firstName.substring(firstName.length - 1) == '*') {
        // if (firstName != '' && firstName != undefined) {
        //     condition = condition + ' and fname_th like $' + count++
        // paramsValues.push(firstName.substring(0, firstName.length - 1) + '%')
        // }
        // } else {
        if (firstName != '' && firstName != undefined) {
            condition = condition + ' and fname_th like $' + count++
            paramsValues.push(firstName + '%')
        }
        // }

        // if (lastName.substring(lastName.length - 1) == '*') {
        // if (lastName != '' && lastName != undefined) {
        //     condition = condition + ' and lname_th like $' + count++
        //     paramsValues.push(lastName.substring(0, lastName.length - 1) + '%')
        // }
        // } else {
        if (lastName != '' && lastName != undefined) {
            condition = condition + ' and lname_th like $' + count++
            paramsValues.push(lastName + '%')
        }
        // }

        if (policyNo != '' && policyNo != undefined) {
            condition = condition + ' and policy_no = $' + count++
            paramsValues.push(policyNo)
        }

        if (certNo != '' && certNo != undefined) {
            condition = condition + ' and cert_no = $' + count++
            paramsValues.push(certNo)
        }

        if (condition != '') {
            where = 'where' + condition
        }
        let birth_date = "TO_CHAR(person.birth_date, 'yyyy-mm-dd') as birth_dateforbd"
        let queryString = {
            text: 'SELECT count(*) over() as allData, person.party_id :: integer, person.pname_th, person.fname_th,'
                + 'person.lname_th, party.govt_id, person.race, person.birth_date,'
                + 'person.gender, person.citizen, person.blood_group, person.height, person.weight, '
                + birth_date
                + ' ' + from
                + ' ' + where
                + ' ' + groupBy
                + ' ' + orderBy,
            values: paramsValues,
        }

        console.log("wan queryString ==> ", queryString)
        let data = await DataBaseUtils.execute(client, queryString)

        return data
    }

    static async searchCustomerPolicyNoAndCertNo(requestPage, requestPerPage, policyNo, certNo) {

        let client = await DataBaseUtils.getConnectionsCustomerParty()
        let offset = ((requestPage - 1) * requestPerPage + 1) - 1
        let count = 1

        let where = ''
        let condition = ''
        let paramsValues = []
        let order = ''

        let from = 'from party.person person'
            + ' ' + 'inner join party.party party on party.party_id = person.party_id'
            + ' ' + 'left join policy.policy_participant policy_participant on policy_participant.party_id = person.party_id and policy_participant.participant_role = ' + '1'

        order = order + 'order by person.party_id, person.pname_th, person.fname_th'

        if (requestPage != '' && requestPerPage != '') {
            order = order + ' offset ' + offset + ' limit ' + requestPerPage
        }
        
        condition = condition + ' 1 = 1 '

        if (policyNo != '' && policyNo != undefined) {
            condition = condition + ' and policy_participant.policy_no = $' + count++
            paramsValues.push(policyNo)
        }

        if (certNo != '' && certNo != undefined) {
            condition = condition + ' and policy_participant.cert_no = $' + count++
            paramsValues.push(certNo)
        }

        if (condition != '') {
            where = 'where' + condition
        }
        let birth_date = "TO_CHAR(person.birth_date, 'yyyy-mm-dd') as birth_dateforbd"
        let queryString = {
            text: 'SELECT count(*) over() as allData, person.party_id :: integer, person.pname_th, person.fname_th, person.lname_th, party.govt_id,'
                + 'person.race, person.birth_date, policy_participant.policy_no, policy_participant.cert_no,'
                + 'person.gender, person.citizen, person.blood_group, person.height, person.weight, '
                + birth_date
                + ' ' + from
                + ' ' + where
                + ' ' + order,
            values: paramsValues,
        }

        let data = await DataBaseUtils.execute(client, queryString)

        return data
    }

    static async searchPolicy(party_id, policy_no, cert_no) {

        let client = await DataBaseUtils.getConnectionsCustomerParty()

        let paramsValues = []
        let condition = ''
        let where
        let count = 1

        if (party_id != '' && party_id != undefined) {
            condition = condition + ' ' + 'AND policy_participant.party_id = $' + count++
            paramsValues.push(party_id)
        }

        if (policy_no != '' && policy_no != undefined) {
            condition = condition + ' ' + 'AND policy_participant.policy_no = $' + count++
            paramsValues.push(policy_no)
        }

        if (cert_no != '' && cert_no != undefined) {
            condition = condition + ' ' + 'AND policy_participant.cert_no = $' + count++
            paramsValues.push(cert_no)
        }

        where = 'where 1=1' + condition

        if (policy_no != null || cert_no != null) {
            let queryString = {
                text: 'select policy_participant.policy_no ,policy_participant.cert_no, policy_participant.personid, policy_participant.participant_role :: integer'
                    + ' ' + 'FROM policy.policy_participant policy_participant left JOIN party.party party ON party.party_id = policy_participant.party_id'
                    + ' ' + where,
                values: paramsValues,
            }

            let data = await DataBaseUtils.execute(client, queryString)

            return data
        }
    }

    static async searchByCustomerRefPerson(partyId) {
        let client = await DataBaseUtils.getConnectionsCustomerParty()
        let condition
        let paramsValues = []
        if (partyId !== '' && partyId != undefined) {
            condition = ' and party.party_id = $1'
            paramsValues.push(partyId)
        }
        let birth_date = "TO_CHAR(person.birth_date, 'yyyy-mm-dd') as birth_dateforbd"
        let queryString = {
            text: 'select person.party_id :: integer, person.pname_th, person.fname_th, '
                + 'person.lname_th, party.govt_id, person.birth_date, person.gender, '
                + birth_date
                + ' from party.party party '
                + 'inner join party.person person on '
                + 'party.party_id = person.party_id '
                + 'where 1=1 ' + condition,
            values: paramsValues
        }

        let data = await DataBaseUtils.execute(client, queryString)

        return data
    }

    static async searchByCustomerRefHomePhone(partyId) {
        let client = await DataBaseUtils.getConnectionsCustomerParty()
        let condition
        let paramsValues = []
        if (partyId !== '' && partyId != undefined) {
            condition = ' and party.party_id = $1'
            paramsValues.push(partyId)
        }
        let queryString = {
            text: ' select phone.phone_id, phone.phone_number, phone.extension, '
                + ' party_phone.phone_type, party_phone.sequence '
                + ' from party.party party '
                + ' inner join party.party_phone party_phone on '
                + ' party.party_id = party_phone.party_id '
                + ' and party_phone.phone_type = ' + "'T'"
                + ' inner join contact.phone phone on '
                + ' party_phone.phone_id = phone.phone_id '
                + ' where 1=1 ' + condition
                + ' order by party_phone.last_update desc, party_phone.sequence desc ',
            values: paramsValues
        }

        let data = await DataBaseUtils.execute(client, queryString)

        return data
    }

    static async searchByCustomerRefMobilePhone(partyId) {
        let client = await DataBaseUtils.getConnectionsCustomerParty()
        let condition
        let paramsValues = []
        if (partyId !== '' && partyId != undefined) {
            condition = ' and party.party_id = $1'
            paramsValues.push(partyId)
        }
        let queryString = {
            text: ' select phone.phone_id, phone.phone_number, phone.extension, '
                + ' party_phone.phone_type, party_phone.sequence ,party_phone.is_receive_sms '
                + ' from party.party party '
                + ' inner join party.party_phone party_phone on '
                + ' party.party_id = party_phone.party_id '
                + ' and party_phone.phone_type = ' + "'M'"
                + ' inner join contact.phone phone on '
                + ' party_phone.phone_id = phone.phone_id '
                + ' where 1=1 ' + condition
                + ' order by party_phone.last_update desc, party_phone.sequence desc ',
            values: paramsValues
        }

        let data = await DataBaseUtils.execute(client, queryString)

        return data
    }

    static async searchByCustomerRefEmail(partyId) {
        let client = await DataBaseUtils.getConnectionsCustomerParty()
        let condition
        let paramsValues = []
        if (partyId !== '' && partyId != undefined) {
            condition = ' and party.party_id = $1'
            paramsValues.push(partyId)
        }
        let queryString = {
            text: ' select email.email_id, email.addr_line '
                + ' from party.party party '
                + ' inner join party.party_email party_email on '
                + ' party.party_id = party_email.party_id '
                + ' inner join contact.email email on '
                + ' party_email.email_id = email.email_id '
                + ' where 1=1 ' + condition
                + ' order by party_email.last_update desc ',
            values: paramsValues
        }

        let data = await DataBaseUtils.execute(client, queryString)

        return data
    }

    static async searchByCustomerRefAddress(partyId) {
        let client = await DataBaseUtils.getConnectionsCustomerParty()
        let condition
        let paramsValues = []
        if (partyId !== '' && partyId != undefined) {
            condition = ' and party.party_id = $1'
            paramsValues.push(partyId)
        }
        let queryString = {
            text: 'select address.address_id, address.house_number, address.building, '
                + 'address.village_name, address.floor, address.room, '
                + 'address.village_number, address.road, address.alley, '
                + 'address.lane, lookupsub_district.sub_district, '
                + 'lookupsub_district.district, lookupsub_district.province, '
                + 'address.zip_code '
                + 'from party.party party '
                + 'inner join party.party_address party_address on '
                + 'party.party_id = party_address.party_id '
                + 'inner join contact.address address on '
                + 'party_address.address_id = address.address_id '
                + 'left join lookup.sub_district lookupsub_district on '
                + 'address.sub_district = '
                + 'cast((coalesce(lookupsub_district.sub_district_code , ' + "'0'"
                + ')) as integer) '
                + 'and address.zip_code = lookupsub_district.zip_code '
                + ' where 1=1 ' + condition
                + ' order by address.last_update',
            values: paramsValues
        }
        console.log("wann ===> ", queryString)
        let data = await DataBaseUtils.execute(client, queryString)

        return data
    }

    static async searchByCustomerRefSocialmedia(partyId) {
        let client = await DataBaseUtils.getConnectionsCustomerParty()
        let condition
        let paramsValues = []
        if (partyId !== '' && partyId != undefined) {
            condition = ' and socialmedia.party_id = $1'
            paramsValues.push(partyId)
        }
        let queryString = {
            text: 'select '
                + ' socialmedia.sequence, '
                + ' lookupsocialmedia.name_th, '
                + ' lookupsocialmedia.name_en, '
                + ' socialmedia.account_reference, '
                + ' lookupsocialmedia.code '
                + ' from party.party party '
                + ' INNER JOIN   party.socialmedia socialmedia ON party.party_id = socialmedia.party_id '
                + ' INNER JOIN lookup.socialmedia lookupsocialmedia ON socialmedia.socialmedia = lookupsocialmedia.code  '
                + ' where 1=1 ' + condition
                + 'order by socialmedia.last_update',
            values: paramsValues
        }
        let data = await DataBaseUtils.execute(client, queryString)

        return data
    }

    static async searchByParty_id(partyId) {

        let client = await DataBaseUtils.getConnectionsCustomerParty()
        let condition
        let paramsValues = []

        condition = 'party_id = $1'
        paramsValues.push(partyId)

        let queryString = {
            text: 'select policy_no, cert_no from customer."policy".policy_participant where'
                + ' ' + condition,
            values: paramsValues
        }
        let data = await DataBaseUtils.execute(client, queryString)
        return data
    }

    static async searchByPolicyStrategyDetailWherePolicyno(policyNo) {

        //let client = await DataBaseUtils.getConnectionsUnitlink()
        let client = await DataBaseUtils.getConnectionsPolicy()

        let condition
        let paramsValues = []
        let from = 'from unitlink.policy_strategy_detail as psd inner join ulip.fund as f on psd.fundid = f.fundid'

        condition = 'where policyno = $1'
        paramsValues.push(policyNo)

        let queryString = {
            text: 'select psd.premiumType, f.fundcode, f.fundthainame, psd.percentage'
                + ' ' + from
                + ' ' + condition,
            values: paramsValues
        }

        let data = await DataBaseUtils.execute(client, queryString)

        return data
    }

    static async searchCostOfInsuranceULINK(policyNo, YYYYMM) {
        //let client = await DataBaseUtils.getConnectionsUnitlink()
        let client = await DataBaseUtils.getConnectionsPolicy()
        let paramsValues = []
        if (policyNo !== '' && policyNo != undefined) {
            paramsValues.push(policyNo)
        }
        let queryString = {
            text: " SELECT " +
                " POLICYNO, " +
                //" POLICYMONTH, " +
                " TRANSACTIONTYPE, " +
                " SUM(PAYMENT) AS PAYMENT " +
                " FROM UNITLINK.ULIPSTATEMENT" + YYYYMM + " " +
                " WHERE POLICYNO = $1 AND " +
                " TRANSACTIONTYPE IN ('COI','PF','EP','RID') " +
                //" GROUP BY POLICYNO,POLICYMONTH,TRANSACTIONTYPE "
                " GROUP BY POLICYNO,TRANSACTIONTYPE "
            , values: paramsValues
        }

        let data = await DataBaseUtils.execute(client, queryString)
        return data
    }

    static async searchCostOfInsuranceUL(policyNo, YYYYMM) {
        let client = await DataBaseUtils.getConnectionsPolicy()
        let paramsValues = []
        if (policyNo !== '' && policyNo != undefined) {
            paramsValues.push(policyNo)
        }
        let queryString = {
            text: " SELECT " +
                " POLICYNO, " +
                //" POLICYMONTH, " +
                " TRANSACTIONTYPE, " +
                " SUM(PAYMENT) AS PAYMENT " +
                " FROM UNIVERSAL.ULSTATEMENT" + YYYYMM + " " +
                " WHERE POLICYNO = $1 AND " +
                " TRANSACTIONTYPE IN ('COI','PF','EP','RID') " +
                //" GROUP BY POLICYNO,POLICYMONTH,TRANSACTIONTYPE "
                " GROUP BY POLICYNO,TRANSACTIONTYPE "
            , values: paramsValues
        }

        //console.log("wan ===> ",queryString)

        let data = await DataBaseUtils.execute(client, queryString)
        return data
    }

    static async getBenefitlnfo(policyNo, typeData, dateData) {

        const headerData = {}
        const condition = {
            policyNo: policyNo,
            typeData: typeData,
            date: dateData
        }

        const data = await call("CalculateBenefit", headerData, condition, true)

        return data;
    }

    static async findSearchPolicyByCustomerId(headerData, customerId) {

        const condition = {
            customer_id: customerId
        }

        const data = await call("POL_DB_01_SearchPolicyByCustomerId", headerData, condition, true)

        return data;

    }

    static async findGetLoadPremium(headerData, policyNo, certNo, type) {

        const condition = {
            policyno: policyNo,
            certno: certNo,
            type: type
        }

        const data = await call("GetLoanPremium", headerData, condition, true)

        return data;

    }

    static async searchRiderTypeOLWhl(rpNo, payDate) {

        //let client = await DataBaseUtils.getConnectionsCollection()
        let client = await DataBaseUtils.getConnectionsPos()
        let paramsValues = []

        if (rpNo !== '' && rpNo !== undefined) {
            paramsValues.push(rpNo)
        }
        // SELECT RPRIDER.RIDERTEXT FROM RECEIPT.RPRIDER
        // WHERE RPRIDER.RPNO = '910127190901' ORDER BY SEQNO
        let queryString = {
            text: " SELECT RPRIDER.RIDERTEXT FROM RECEIPT.RPRIDER " +
                " WHERE RPRIDER.RPNO = $1 " +
                " ORDER BY SEQNO "
            , values: paramsValues
        }
        let data = await DataBaseUtils.execute(client, queryString)
        return data
    }

    static async searchRiderTypeOLWhlPayDate(rpNo, payDate) {

        //let client = await DataBaseUtils.getConnectionsCollection()
        let client = await DataBaseUtils.getConnectionsPos()
        let paramsValues = []

        if (rpNo !== '' && rpNo !== undefined) {
            paramsValues.push(rpNo)
        }
        // SELECT RPRIDER.RIDERTEXT FROM RECEIPT.RPRIDER
        // WHERE RPRIDER.RPNO = '000600016136' ORDER BY SEQNO
        let queryString = {
            text: " SELECT RPRIDER" + payDate +
                ".RIDERTEXT " +
                " FROM RECEIPT.RPRIDER" + payDate +
                " WHERE RPRIDER" + payDate +
                ".RPNO = $1 " +
                " ORDER BY SEQNO "
            , values: paramsValues
        }

        let data = await DataBaseUtils.execute(client, queryString)

        return data
    }

    static async searchRiderTypeInd(rpNo, payDate) {

        //let client = await DataBaseUtils.getConnectionsCollection()
        let client = await DataBaseUtils.getConnectionsPos()
        let paramsValues = []

        if (rpNo !== '' && rpNo !== undefined) {
            paramsValues.push(rpNo)
        }
        // SELECT IRPRIDER.RIDERTEXT FROM RECEIPT.IRPRIDER 
        // WHERE IRPRIDER.RPNO = '000520003560' ORDER BY SEQNO
        let queryString = {
            text: " SELECT IRPRIDER.RIDERTEXT FROM RECEIPT.IRPRIDER " +
                " WHERE IRPRIDER.RPNO = $1 " +
                " ORDER BY SEQNO "
            , values: paramsValues
        }

        let data = await DataBaseUtils.execute(client, queryString)
        return data
    }

    static async searchRiderTypeIndPayDate(rpNo, payDate) {

        //let client = await DataBaseUtils.getConnectionsCollection()
        let client = await DataBaseUtils.getConnectionsPos()
        let paramsValues = []

        if (rpNo !== '' && rpNo !== undefined) {
            paramsValues.push(rpNo)
        }
        // SELECT IRPRIDER.RIDERTEXT FROM RECEIPT.IRPRIDER 
        // WHERE IRPRIDER.RPNO = '000520003560' ORDER BY SEQNO
        let queryString = {
            text: " SELECT IRPRIDER" + payDate +
                ".RIDERTEXT " +
                " FROM RECEIPT.IRPRIDER" + payDate +
                " WHERE IRPRIDER" + payDate +
                ".RPNO = $1 " +
                " ORDER BY SEQNO "
            , values: paramsValues
        }

        let data = await DataBaseUtils.execute(client, queryString)
        return data
    }

    static async searchRiderTypeUl(rpNo, payDate) {

        let client = await DataBaseUtils.getConnectionsPolicy()
        let paramsValues = []

        if (rpNo !== '' && rpNo !== undefined) {
            paramsValues.push(rpNo)
        }
        // SELECT ULRPRIDER.RIDERTEXT FROM UNIVERSAL.ULRPRIDER 
        // WHERE ULRPRIDER.RPNO = '041620050391' ORDER BY SEQNO
        let queryString = {
            text: " SELECT ULRPRIDER.RIDERTEXT FROM UNIVERSAL.ULRPRIDER " +
                " WHERE ULRPRIDER.RPNO = $1 " +
                " ORDER BY SEQNO "
            , values: paramsValues
        }

        let data = await DataBaseUtils.execute(client, queryString)
        return data
    }

    static async searchRiderTypeUlPayDate(rpNo, payDate) {

        let client = await DataBaseUtils.getConnectionsPolicy()
        let paramsValues = []

        if (rpNo !== '' && rpNo !== undefined) {
            paramsValues.push(rpNo)
        }
        // SELECT ULRPRIDER.RIDERTEXT FROM UNIVERSAL.ULRPRIDER 
        // WHERE ULRPRIDER.RPNO = '041620050391' ORDER BY SEQNO
        let queryString = {
            text: " SELECT ULRPRIDER" + payDate +
                ".RIDERTEXT " +
                " FROM RECEIPT.ULRPRIDER" + payDate +
                " WHERE ULRPRIDER" + payDate +
                ".RPNO = $1 " +
                " ORDER BY SEQNO "
            , values: paramsValues
        }

        let data = await DataBaseUtils.execute(client, queryString)
        return data
    }

    static async searchRiderTypeUlip(rpNo, payDate) {

        let client = await DataBaseUtils.getConnectionsPolicy()
        //let client = await DataBaseUtils.getConnectionsUnitlink()
        let paramsValues = []

        if (rpNo !== '' && rpNo !== undefined) {
            paramsValues.push(rpNo)
        }
        //SELECT ULIPRPRIDER.RIDERTYPE, ULIPRPRIDER.PREMIUM, ULIPRPRIDER.EXTRAPREMIUM 
        //FROM UNITLINK.ULIPRPRIDER 
        //WHERE ULIPRPRIDER.RPNO = '000600031308'
        let queryString = {
            text: " SELECT ULIPRPRIDER.RIDERTYPE, ULIPRPRIDER.PREMIUM, ULIPRPRIDER.EXTRAPREMIUM " +
                " FROM UNITLINK.ULIPRPRIDER " +
                " WHERE ULIPRPRIDER.RPNO = $1 "
            , values: paramsValues
        }

        let data = await DataBaseUtils.execute(client, queryString)
        return data
    }

    static async searchRiderTypeUlipPayDate(rpNo, payDate) {

        let client = await DataBaseUtils.getConnectionsPolicy()
        //let client = await DataBaseUtils.getConnectionsUnitlink()
        let paramsValues = []

        if (rpNo !== '' && rpNo !== undefined) {
            paramsValues.push(rpNo)
        }
        //SELECT ULIPRPRIDER.RIDERTYPE, ULIPRPRIDER.PREMIUM, ULIPRPRIDER.EXTRAPREMIUM 
        //FROM UNITLINK.ULIPRPRIDER 
        //WHERE ULIPRPRIDER.RPNO = '000600031308'
        let queryString = {
            text: " SELECT ULIPRPRIDER" + payDate +
                ".RIDERTYPE, " +
                "  ULIPRPRIDER" + payDate +
                ".PREMIUM, " +
                "  ULIPRPRIDER" + payDate +
                ".EXTRAPREMIUM " +
                " FROM UNITLINK.ULIPRPRIDER" + payDate +
                " WHERE ULIPRPRIDER" + payDate +
                ".RPNO = $1 "
            , values: paramsValues
        }

        let data = await DataBaseUtils.execute(client, queryString)
        return data
    }

    static async searchRiderTypeCl(rpNo, payDate) {

        //let client = await DataBaseUtils.getConnectionsCollection()
        let client = await DataBaseUtils.getConnectionsPos()
        let paramsValues = []

        if (rpNo !== '' && rpNo !== undefined) {
            paramsValues.push(rpNo)
        }
        // SELECT CLRPRIDER.RIDERTEXT FROM COLLECTION.CLRPRIDER 
        // WHERE CLRPRIDER.RPNO = '774610000001' ORDER BY SEQNO
        let queryString = {
            text: " SELECT CLRPRIDER.RIDERTEXT FROM COLLECTION.CLRPRIDER " +
                " WHERE CLRPRIDER.RPNO = $1 " +
                " ORDER BY SEQNO "
            , values: paramsValues
        }

        let data = await DataBaseUtils.execute(client, queryString)
        return data
    }

    static async searchRiderTypeClPayDate(rpNo, payDate) {

        //let client = await DataBaseUtils.getConnectionsCollection()
        let client = await DataBaseUtils.getConnectionsPos()
        let paramsValues = []

        if (rpNo !== '' && rpNo !== undefined) {
            paramsValues.push(rpNo)
        }
        // SELECT CLRPRIDER.RIDERTEXT FROM COLLECTION.CLRPRIDER 
        // WHERE CLRPRIDER.RPNO = '774610000001' ORDER BY SEQNO
        let queryString = {
            text: " SELECT CLRPRIDER" + payDate +
                ".RIDERTEXT " +
                " FROM COLLECTION.CLRPRIDER" + payDate +
                " WHERE CLRPRIDER" + payDate +
                ".RPNO = $1 " +
                " ORDER BY SEQNO "
            , values: paramsValues
        }

        let data = await DataBaseUtils.execute(client, queryString)
        return data
    }

    static async POL_DB_01_SearchPolicyByCustomerId(messageId, sentDateTime, partyId) {

        const headerData = {
            messageId: messageId,
            sentDateTime: sentDateTime
        }

        const condition = {
            customer_id: partyId
        }

        const data = await call("POL_DB_01_SearchPolicyByCustomerId", headerData, condition, true)

        //console.log(data);

        return data;

    }

    static async searchbyPosTransaction(policyno, inputDate) {

        let date = DateUtils.setDateFormat(new Date(), 'yyyymmdd')

        let client = await DataBaseUtils.getConnectionsPos()
        let condition
        let paramsValues = []

        if (policyno != '' && policyno != undefined) {
            condition = 'where policyno = $1 and inputdate BETWEEN ' + "'" + DateUtils.setDateFormat(inputDate, 'yyyymmdd') + "'" + ' and ' + "'" + date + "'"
            paramsValues.push(policyno)
        }

        let from = 'from pos.srvservice.alhistchange'
        let order = 'order by inputdate'
        let queryString = {
            text: 'select policyno, inputdate, nameandbenefit, masterandrider, address, olddata'
                + ' ' + from
                + ' ' + condition
                + ' ' + order,
            values: paramsValues
        }

        let data = await DataBaseUtils.execute(client, queryString)

        return data
    }

    static async searchClaimDetail(numberIdCase) {

        const headerData = {}

        const condition = {
            numberIdCase: numberIdCase
        }

        const data = await call("GetClaimDetail", headerData, condition, true)

        return data;
    }

    static async searchClaimInquiry(policyNo, orderNo, status, claimOKDateFrom, claimOKDateTo, receiveDateFrom,
        receiveDateTo, accidentDateFrom, accidentDateTo) {

        const headerData = {
            messageId: "",
            sentDateTime: "",
            responseDateTime: "",
            recordPerPage: "500",
            requestPage: "1",
            totalRecord: "500"
        }

        const condition = {
            policyNo: ValidateUtils.convertToString(policyNo),
            orderNo: ValidateUtils.convertToString(orderNo),
            status: ValidateUtils.convertToString(status),
            claimOKDateFrom: ValidateUtils.convertToString(claimOKDateFrom),
            claimOKDateTo: ValidateUtils.convertToString(claimOKDateTo),
            receiveDateFrom: ValidateUtils.convertToString(receiveDateFrom),
            receiveDateTo: ValidateUtils.convertToString(receiveDateTo),
            accidentDateFrom: accidentDateFrom != '' ? DateUtils.setDateFormat(accidentDateFrom, 'dd/mm/yyyy') : accidentDateFrom,
            accidentDateTo: ValidateUtils.convertToString(accidentDateTo)
        }

        const data = await call("GetClaimInquiry", headerData, condition, true)

        return data;
    }

    static async mdaClaimDetail(orderNo, remarkNo) {

        const data = await callApiGet("MdaClaimDetail", orderNo + remarkNo, true)

        return data;
    }

    // static async searchSrListCC(citizenId, backwardDate) {
    static async searchSrListCC(citizenId) {

        let connectionDB = await DataBaseUtils.getConnectionsCommonDB()
        let configDB = {
            user: connectionDB.user,
            password: connectionDB.password,
            server: connectionDB.server,
            database: connectionDB.database,
            port: connectionDB.port
        }

        // select top 10
        // sr.sr_number, sr.created_date, sr.contact_first_name,
        // sr.contact_last_name, c1.code_name as contactmethod,
        // c2.code_name as statusdesc, c3.code_name as subjecttype,
        // c4.code_name as mainsubject, c5.code_name as subsubject,
        // sre.entity_id
        // from tb_sr_01 sr
        // left join tb_sr_entity sre on sr.sr_number = sre.sr_number
        // left join tb_cust_01 cust on cust.cust_code = sr.cust_code
        // left join code_book c1 on sr.source_code = c1.code_id and c1.code_type = 'sr_source'
        // left join code_book c2 on sr.status_code = c2.code_id and c2.code_type = 'sr_status'
        // left join code_book c3 on sre.entity_sub_type_code = c3.etc_1 and c3.code_type = 'sr_sub_type'
        // left join code_book c4 on sre.entity_subject_code = c4.etc_1
        // and c4.code_type = 'sr_category' and c4.parent_code_id = c3.code_id
        // left join code_book c5 on sre.entity_sub_subject_code = c5.etc_1 and c5.code_type = 'sr_sub_category'
        // where cust.per_id_no = '3450700590529'  and sr.service_group = 'service request'
        // order by sre.created_date desc, sre.created_time desc

        let queryString = " select top 10 " +
            " sr.sr_number, sr.created_date, sr.contact_first_name, " +
            " sr.contact_last_name, c1.code_name as contactmethod, " +
            " c2.code_name as statusdesc, c3.code_name as subjecttype, " +
            " c4.code_name as mainsubject, c5.code_name as subsubject, " +
            " sre.entity_id " +
            " from tb_sr_01 sr " +
            " left join tb_sr_entity sre on sr.sr_number = sre.sr_number " +
            " left join tb_cust_01 cust on cust.cust_code = sr.cust_code " +
            " left join code_book c1 on sr.source_code = c1.code_id and c1.code_type = 'sr_source' " +
            " left join code_book c2 on sr.status_code = c2.code_id and c2.code_type = 'sr_status' " +
            " left join code_book c3 on sre.entity_sub_type_code = c3.etc_1 and c3.code_type = 'sr_sub_type' " +
            " left join code_book c4 on sre.entity_subject_code = c4.etc_1 " +
            " and c4.code_type = 'sr_category' and c4.parent_code_id = c3.code_id " +
            " left join code_book c5 on sre.entity_sub_subject_code = c5.etc_1 and c5.code_type = 'sr_sub_category' " +
            " where cust.per_id_no = '" + citizenId + "' " +
            " and sr.service_group = 'service request' " +
            " order by sre.created_date desc, sre.created_time desc "

        let data = await DataBaseUtils.executeMsSQL(configDB, queryString)
        return data
    }

    static async searchSrListACC(citizenId) {

        let connectionDB = await DataBaseUtils.getConnectionsCommon3DB()
        let configDB = {
            user: connectionDB.user,
            password: connectionDB.password,
            server: connectionDB.server,
            database: connectionDB.database,
            port: connectionDB.port
        }

        // select top 10 
        // sr.sr_number ,sr.reg_time ,
        // case isnumeric(n.prename) when 1 then pn.code_name
        // else n.prename end as prename ,
        // n.firstname ,n.lastname ,c1.code_name as contactmethod ,
        // c4.code_name as statusdesc ,sr.title as subjecttype ,
        // c2.code_name as mainsubject ,c3.code_name as subsubject
        // from l_sr sr
        // left join l_codebook c1 on sr.channel_code = c1.code_id
        // and c1.code_type = 'sr_channel'
        // left join l_codebook c2 on sr.type_code = c2.code_id
        // and c2.code_type = 'sr_type'
        // left join l_codebook c3 on sr.sub_type_code = c3.code_id
        // and c3.code_type = 'sr_sub_type'
        // left join l_codebook c4 on sr.status_code = c4.code_id
        // and c4.code_type = 'sr_status'
        // left join ( select distinct user_id,employ_name,position_id,org_cd
        // from dbo.vw_l_usermaster) o on o.position_id = sr.owner_code
        // left join tb_mast m on sr.policy_no = m.policyno
        // left join tb_name n on m.nameid = n.nameid
        // left join tb_person p on n.personid = p.personid
        // left join tb_prename pn on n.prename = pn.etc_1
        // where sr.type_code in (04,05,06,10)
        // and sr.sub_type_code in (07,08,09,31,11,12,13,94,14,72,33)
        // and p.referenceid = '3419900293925'
        // order by sr.reg_time desc

        let queryString = " select top 10  " +
            " sr.sr_number ,sr.reg_time , " +
            " case isnumeric(n.prename) when 1 then pn.code_name " +
            " else n.prename end as prename , " +
            " n.firstname ,n.lastname ,c1.code_name as contactmethod , " +
            " c4.code_name as statusdesc ,sr.title as subjecttype , " +
            " c2.code_name as mainsubject ,c3.code_name as subsubject " +
            " from l_sr sr " +
            " left join l_codebook c1 on sr.channel_code = c1.code_id " +
            " and c1.code_type = 'sr_channel' " +
            " left join l_codebook c2 on sr.type_code = c2.code_id " +
            " and c2.code_type = 'sr_type' " +
            " left join l_codebook c3 on sr.sub_type_code = c3.code_id " +
            " and c3.code_type = 'sr_sub_type' " +
            " left join l_codebook c4 on sr.status_code = c4.code_id " +
            " and c4.code_type = 'sr_status' " +
            " left join ( select distinct user_id,employ_name,position_id,org_cd " +
            " from dbo.vw_l_usermaster) o on o.position_id = sr.owner_code " +
            " left join tb_mast m on sr.policy_no = m.policyno " +
            " left join tb_name n on m.nameid = n.nameid " +
            " left join tb_person p on n.personid = p.personid " +
            " left join tb_prename pn on n.prename = pn.etc_1 " +
            " where sr.type_code in (04,05,06,10) " +
            " and sr.sub_type_code in (07,08,09,31,11,12,13,94,14,72,33) " +
            " and p.referenceid = '" + citizenId + "' " +
            " order by sr.reg_time desc "

        console.log("wan configDB acc ==> ", configDB)
        console.log("wan queryString acc ==> ", queryString)

        let data = await DataBaseUtils.executeMsSQL(configDB, queryString)

        console.log("wan data acc ==> ", data)
        return data
    }

    static async searchSrDetailCC(srNo, entityId) {

        let connectionDB = await DataBaseUtils.getConnectionsCommonDB()
        let configDB = {
            user: connectionDB.user,
            password: connectionDB.password,
            server: connectionDB.server,
            database: connectionDB.database,
            port: connectionDB.port
        }

        // select sr.sr_number, sre.description, c1.code_name as contactmethod,
        // c3.code_name as subjecttype, c4.code_name as mainsubject, c5.code_name as subsubject,
        // u.first_name_th, u.last_name_th
        // from tb_sr_01 sr
        // left join tb_sr_entity sre on sr.sr_number = sre.sr_number
        // left join code_book c1 on sr.source_code = c1.code_id and c1.code_type = 'sr_source'
        // left join code_book c3 on sre.entity_sub_type_code = c3.etc_1 and c3.code_type = 'sr_sub_type'
        // left join code_book c4 on sre.entity_subject_code = c4.etc_1 
        // and c4.code_type = 'sr_category' and c4.parent_code_id = c3.code_id
        // left join code_book c5 on sre.entity_sub_subject_code = c5.etc_1 and c5.code_type = 'sr_sub_category'
        // left join user_info u on sr.created_by = u.user_id
        // where sr.service_group = 'service request'
        // and sr.sr_number = 'SR1612160397'
        // and sre.entity_id = '2365149'

        let queryString = " select sr.sr_number, sre.description, c1.code_name as contactMethod, " +
            " c3.code_name as subjectType, c4.code_name as mainSubject, c5.code_name as subSubject, " +
            " u.first_name_th, u.last_name_th " +
            " from tb_sr_01 sr " +
            " left join tb_sr_entity sre on sr.sr_number = sre.sr_number " +
            " left join code_book c1 on sr.source_code = c1.code_id and c1.code_type = 'sr_source' " +
            " left join code_book c3 on sre.entity_sub_type_code = c3.etc_1 and c3.code_type = 'sr_sub_type' " +
            " left join code_book c4 on sre.entity_subject_code = c4.etc_1  " +
            " and c4.code_type = 'sr_category' and c4.parent_code_id = c3.code_id " +
            " left join code_book c5 on sre.entity_sub_subject_code = c5.etc_1 and c5.code_type = 'sr_sub_category' " +
            " left join user_info u on sr.created_by = u.user_id " +
            " where sr.service_group = 'service request' " +
            " and sr.sr_number = '" + srNo + "' " +
            " and sre.entity_id = '" + entityId + "' "

        let data = await DataBaseUtils.executeMsSQL(configDB, queryString)
        return data
    }

    static async searchSrDetailACC(srNo) {

        let connectionDB = await DataBaseUtils.getConnectionsCommon3DB()
        let configDB = {
            user: connectionDB.user,
            password: connectionDB.password,
            server: connectionDB.server,
            database: connectionDB.database,
            port: connectionDB.port
        }

        // select sr.sr_number, sr.descp,
        // c1.code_name as contactmethod, sr.title as subjecttype,
        // c2.code_name as mainsubject, c3.code_name as subsubject
        // ,isnull(o.employ_name,'') as owner_name
        // from l_sr sr
        // left join code_book c1 on sr.channel_code= c1.code_id and c1.code_type = 'sr_channel'
        // left join code_book c2 on sr.type_code = c2.code_id and c2.code_type = 'sr_type'
        // left join code_book c3 on sr.sub_type_code = c3.code_id and c3.code_type = 'sr_sub_type'
        // left join (select distinct user_id, employ_name,position_id,org_cd from dbo.vw_l_usermaster) o 
        // on o.position_id = sr.owner_code
        // where sr.sr_number = 'sr-25610724-1601' 

        let queryString = " select sr.sr_number, sr.descp, " +
            " c1.code_name as contactMethod, sr.title as subjectType, " +
            " c2.code_name as mainSubject, c3.code_name as subSubject " +
            " ,isnull(o.employ_name,'') as srOwner " +
            " from l_sr sr " +
            " left join code_book c1 on sr.channel_code= c1.code_id and c1.code_type = 'sr_channel' " +
            " left join code_book c2 on sr.type_code = c2.code_id and c2.code_type = 'sr_type' " +
            " left join code_book c3 on sr.sub_type_code = c3.code_id and c3.code_type = 'sr_sub_type' " +
            " left join (select distinct user_id, employ_name,position_id,org_cd from dbo.vw_l_usermaster) o  " +
            " on o.position_id = sr.owner_code " +
            " where sr.sr_number = '" + srNo + "' "

        let data = await DataBaseUtils.executeMsSQL(configDB, queryString)
        return data
    }

}

export default CustomersDAO;
