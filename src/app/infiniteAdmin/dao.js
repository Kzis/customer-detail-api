
import DataBaseUtils from '../../utils/database-utils'
import DateUtils from '../../utils/date-utils'
import AdminModel from './model'
import PrivilegeAssignModel from './PrivilegeAssignModel'
import PrivilegeTrackingModel from './PrivilegeTrackingModel'
import TrackingDetailModel from '../infiniteAdmin/TrackingDetailModel'

class InfiniteAdminDAO {

    constructor() {
        this.key = 'InfiniteAdmin';
    }

    static async getTier(tier_id) {
        console.log("getTier : " + tier_id)

        let client = await DataBaseUtils.getConnectionsCustomerParty()
        let from = 'from infinite.tier p '
        let where = 'where p.tier_id = $1 '
        let paramsValues = []
        paramsValues.push(tier_id)

        let queryString = {
            text: 'SELECT * '
                + ' ' + from
                + ' ' + where,
            values: paramsValues,
        }

        console.log(queryString)

        let tier = await DataBaseUtils.execute(client, queryString)

        return tier

    }

    static async getTierId(tier_name) {
        console.log("getTierId : " + tier_name.toUpperCase())

        let tier_id = 0
        if (tier_name != null && tier_name != "" && tier_name != undefined) {
            switch (tier_name.toUpperCase()) {
                case "REGULAR":
                    tier_id = 1
                    break;
                case "PRIME":
                    tier_id = 1
                    break;
                case "CLASSIC":
                    tier_id = 1
                    break;
                case "SILVER":
                    tier_id = 2
                    break;
                case "GOLD":
                    tier_id = 3
                    break;
                case "PLATINUM":
                    tier_id = 4
                    break;
                default:
                    tier_id = 0
            }
        }

        return tier_id
    }

    static async getPrivilege(tier_id) {
        console.log("getPrivilege : " + tier_id)

        let client = await DataBaseUtils.getConnectionsCustomerParty()
        let paramsValues = []
        let from = 'from infinite.privilege p '
        let where = 'where p.tier_id = $1 '    
        paramsValues.push(tier_id)

        let queryString = {
            text: 'SELECT * '
                + ' ' + from
                + ' ' + where,
            values: paramsValues,
        }

        console.log(queryString)

        let privilege = await DataBaseUtils.execute(client, queryString)

        return privilege

    }

    static async searchPartyId(gov_id) {

        console.log("searchPartyId")

        let client = await DataBaseUtils.getConnectionsCustomerParty()
        let from = 'from party.party p '
        let where = 'where p.govt_id = $1 '
        let paramsValues = []
        paramsValues.push(gov_id)

        let queryString = {
            text: 'SELECT * '
                + ' ' + from
                + ' ' + where,
            values: paramsValues,
        }

        let partyId = await DataBaseUtils.execute(client, queryString)

        return partyId

    }

    static async searchRPNO(rp_no) {

        console.log("searchRPNO")

        let client = await DataBaseUtils.getConnectionsCustomerParty()
        let from = 'from infinite.comply_receipt_queue p '
        let where = 'where p.rp_no = $1 '
        let paramsValues = []
        paramsValues.push(rp_no)

        let queryString = {
            text: 'SELECT * '
                + ' ' + from
                + ' ' + where,
            values: paramsValues,
        }

        let data = await DataBaseUtils.execute(client, queryString)

        return data

    }

    static async insertComplyReceipt(party, rp_no, policy_no, pay_period) {
        let data = await this.addAdmin(rp_no, policy_no, pay_period, party)
        return data;
    }

    static async insertPrivilegeTracking(party, gov_id, privilege_id, deliver_method, deliver_date, receive_date, deliver_status, tier_name, remark, tracking_number,
        tracking_status, receive_signee, recipient_prename, recipient_firstname, recipient_lastname, address_line_1, address_line_2, province, zip_code, create_time, create_user_code, update_time, update_user_code) {

        let res = {}
        let privilege_assign = await this.addPrivilegeAssign(party, privilege_id, deliver_method, deliver_date, receive_date, deliver_status, remark, create_time, create_user_code, update_time, update_user_code)

        if (privilege_assign != null && privilege_assign != '' && privilege_assign != undefined) {

            console.log(privilege_assign.dataValues.assign_id);

            let privilege_tracking = await this.addPrivilegeTracking(privilege_assign.dataValues.assign_id, deliver_method, deliver_date, tracking_number, receive_signee,
                tracking_status, recipient_prename, recipient_firstname, recipient_lastname, address_line_1, address_line_2, province, zip_code, remark, create_time,
                create_user_code, update_time, update_user_code)
        }

        res.privilege_assign = privilege_assign
        // res.privilege_tracking = privilege_tracking
        return res
    }

    static async addPrivilegeAssign(party, privilege_id, deliver_method, deliver_date, receive_date, deliver_status, remark, create_time, create_user_code, update_time, update_user_code) {
        let data = await PrivilegeAssignModel.create({
            party_id: party.rows[0].party_id,
            privilege_id: privilege_id,
            deliver_method: deliver_method,
            deliver_date: deliver_date,
            receive_date: receive_date,
            deliver_status: deliver_status,
            remark: remark,
            create_time: create_time,
            create_user_code: create_user_code,
            update_time: update_time,
            update_user_code: update_user_code
        }, {
            returning: true,
        })

        console.log(data);


        return data

    }

    static async addPrivilegeTracking(privilege_assign, deliver_method, deliver_date, tracking_number, tracking_status, receive_signee, recipient_prename, recipient_firstname,
        recipient_lastname, address_line_1, address_line_2, province, zip_code, remark, create_time, create_user_code, update_time, update_user_code) {
        // console.log("addPrivilegeTracking")
        let data = await PrivilegeTrackingModel.create({
            assign_id: privilege_assign,
            deliver_method: deliver_method,
            deliver_date: deliver_date,
            tracking_number: tracking_number,
            receive_signee: receive_signee,
            tracking_status: tracking_status,
            recipient_prename: recipient_prename,
            recipient_firstname: recipient_firstname,
            recipient_lastname: recipient_lastname,
            address_line_1: address_line_1,
            address_line_2: address_line_2,
            province: province,
            zip_code: zip_code,
            remark: remark,
            create_time: create_time,
            create_user_code: create_user_code,
            update_time: update_time,
            update_user_code: update_user_code
        }, {
            returning: true,

        })

        return data
    }

    static async addAdmin(rp_no, policy_no, pay_period, party) {

        let data = await AdminModel.create({
            rp_no: rp_no,
            policy_no: policy_no,
            pay_period: pay_period,
            party_id: party[0].party_id,
            create_time: DateUtils.getDateNow(),
            create_user_code: "Dashboard",
            update_time: DateUtils.getDateNow(),
            update_user_code: "Dashboard"
        }, {
            returning: true,

        })

        return data

    }

    static async findByParams(rp_no, policy_no) {
        let data = await AdminModel.findAll({
            raw: true,
            where: {
                rp_no: rp_no,
                policy_no: policy_no
            }
        })
        return data
    }

    static async getPrivilegeTracking(gov_id, emsCode, deliver_method, deliver_date, deliver_status) {

        let client = await DataBaseUtils.getConnectionsCustomerParty()
        let where = ''
        let paramsValues = []
        let count = 1

        where = where + 'where 1 = 1'

        if (gov_id != '') {
            where = where + ' ' + 'and party.govt_id = $' + count++
            paramsValues.push(gov_id)
        }

        if (emsCode != '') {
            where = where + ' ' + 'and pt.tracking_number = $' + count++
            paramsValues.push(emsCode)
        }

        if (deliver_method != '') {
            where = where + ' ' + 'and pa.deliver_method = $' + count++
            paramsValues.push(deliver_method)
        }

        if (deliver_date != '') {
            where = where + ' ' + 'and pa.deliver_date = $' + count++
            paramsValues.push(deliver_date)
        }

        if (deliver_status != '') {
            where = where + ' ' + 'and pa.deliver_status = $' + count++
            paramsValues.push(deliver_status)
        }

        let from = 'from party.party as party inner join infinite.privilege_assign as pa on party.party_id = pa.party_id'
            + ' ' + 'inner join infinite.privilege as p on p.privilege_id = pa.privilege_id'
            + ' ' + 'inner join infinite.privilege_tracking as pt on pa.assign_id = pt.assign_id'
        let group = 'group by party.govt_id, pa.privilege_id, p."name", pa.deliver_method, pa.deliver_date, pa.deliver_status, pa.remark, pt.tracking_number, pt.tracking_status,'
            + 'pt.receive_signee, pt.recipient_prename, pt.recipient_firstname, pt.recipient_lastname, pt.address_line_1, pt.address_line_2'

        let queryString = {
            text: 'select  party.govt_id, pa.privilege_id, p."name", pa.deliver_method, pa.deliver_date, pa.deliver_status, pa.remark, pt.tracking_number, pt.tracking_status,'
                + 'pt.receive_signee, pt.recipient_prename, pt.recipient_firstname, pt.recipient_lastname, pt.address_line_1, pt.address_line_2'
                + ' ' + from
                + ' ' + where
                + ' ' + group,
            values: paramsValues,
        }
        console.log(queryString);

        let data = await DataBaseUtils.execute(client, queryString)

        return data

    }

    static async getPartyId(gov_id) {
        let client = await DataBaseUtils.getConnectionsCustomerParty()
        let paramsValues = []

        let where = 'where p.govt_id = $1'
        paramsValues.push(gov_id)

        let queryString = {
            text: 'select p.party_id from party.party as p'
                + ' ' + where,
            values: paramsValues,
        }

        let data = await DataBaseUtils.execute(client, queryString)

        return data

    }

    static async getPreparePrivileage(idNo, name, lastname, tier, province, postCode, typeCustomer) {

        let client = await DataBaseUtils.getConnectionsCustomerParty()
        let paramsValues = []
        let from = ''
        let where = ''
        let condition = ''
        let count = 1
        let variable = "' '"
        let queryString

        if (typeCustomer == 'I') {
            from = 'from party.party as p inner join party.person as ps on ps.party_id = p.party_id'
                + ' ' + 'inner join party.party_address pa on pa.party_id = p.party_id'
                + ' ' + 'inner join contact.address as ca on ca.address_id = pa.address_id'
                + ' ' + 'left join lookup.sub_district as ls on ls.sub_district = ca.sub_district :: varchar'
                + ' ' + 'inner join infinite.cust_program_stat as icps on icps.party_id = ps.party_id'
                + ' ' + 'inner join infinite.tier as t on t.tier_id = icps.tier_id'
        } else {
            from = 'from party.party as p inner join party.person as ps on ps.party_id = p.party_id'
                + ' ' + 'inner join party.party_address pa on pa.party_id = p.party_id'
                + ' ' + 'inner join contact.address as ca on ca.address_id = pa.address_id'
                + ' ' + 'left join lookup.sub_district as ls on ls.sub_district = ca.sub_district :: varchar'
        }

        condition = condition + ' ' + 'where 1 = 1'

        if (idNo != '') {
            condition = condition + ' ' + 'and p.govt_id = $' + count++
            paramsValues.push(idNo)
        }

        if (name != '') {
            condition = condition + ' ' + 'and ps.fname_th = $' + count++
            paramsValues.push(name)
        }

        if (lastname != '') {
            condition = condition + ' ' + 'and ps.lname_th = $' + count++
            paramsValues.push(lastname)
        }

        if (typeCustomer == 'I') {
            if (tier != '') {
                condition = condition + ' ' + 'and t.tier_name = $' + count++
                paramsValues.push(tier)
            }
        }

        if (province != '') {
            condition = condition + ' ' + 'and ls.province = $' + count++
            paramsValues.push(province)
        }

        if (postCode != '') {
            condition = condition + ' ' + 'and ca.zip_code = $' + count++
            paramsValues.push(postCode)
        }

        if (typeCustomer == 'I') {
            queryString = {
                text: 'select p.party_id, p.govt_id, ps.fname_th, ps.lname_th, ls.province, ca.zip_code, t.tier_id, t.program_id,'
                    + ' ' + 'concat(ca.place, ' + variable + ', ca.house_number, ' + variable + ', ca.building, ' + variable + ', ca.floor, ' + variable + ', ca.room, '
                    + ' ' + variable + ', ca.village_number, ' + variable + ', ca.housing, ' + variable + ', ca.lane, ' + variable + ', ca.alley) as addtess1,'
                    + ' ' + 'concat(ca.road, ' + variable + ', ls.sub_district, ' + variable + ', ls.district) as address2, ls.province, ca.zip_code'
                    + ' ' + from
                    + ' ' + where
                    + ' ' + condition,
                values: paramsValues,
            }
        } else {
            queryString = {
                text: 'select p.party_id, p.govt_id, ps.fname_th, ps.lname_th, ls.province, ca.zip_code,'
                    + ' ' + 'concat(ca.place, ' + variable + ', ca.house_number, ' + variable + ', ca.building, ' + variable + ', ca.floor, ' + variable + ', ca.room, '
                    + ' ' + variable + ', ca.village_number, ' + variable + ', ca.housing, ' + variable + ', ca.lane, ' + variable + ', ca.alley) as addtess1,'
                    + ' ' + 'concat(ca.road, ' + variable + ', ls.sub_district, ' + variable + ', ls.district) as address2'
                    + ' ' + from
                    + ' ' + where
                    + ' ' + condition,
                values: paramsValues,
            }
        }
        console.log(queryString);

        let data = await DataBaseUtils.execute(client, queryString)

        return data

    }

    static async getDredownProvince() {

        let client = await DataBaseUtils.getConnectionsCustomerParty()

        let queryString = {
            text: 'select distinct province from lookup.sub_district as sd'
        }

        let data = await DataBaseUtils.execute(client, queryString)
        
        return data
    }

    static async getDredownTier() {

        let client = await DataBaseUtils.getConnectionsCustomerParty()

        let queryString = {
            text: 'SELECT program_id,tier_id,tier_name from infinite.tier'
        }

        let data = await DataBaseUtils.execute(client, queryString)
        
        return data
    }
    
    static async insPrivileageAssign(party_id, privilege_id, deliver_method, deliver_date, deliver_status, remark) {

        let data = await PrivilegeAssignModel.create({
            party_id: party_id,
            privilege_id: privilege_id,
            deliver_method: deliver_method,
            deliver_date: deliver_date,
            deliver_status: deliver_status,
            remark: remark
        }, {
            returning: true,
        })

        return data
    }

    static async getPrivilegeByTierAndProgramid(tier_id, program_id) {

        let client = await DataBaseUtils.getConnectionsCustomerParty()
        let paramsValues = []
        let from = 'from infinite.privilege p '
        let where = ''
        let count = 1
        
        where = where + 'where p.tier_id = $' + count++   
        paramsValues.push(tier_id)

        where = where + ' and p.program_id = $' + count++
        paramsValues.push(program_id)

        where = where + ' and p.main_privilege is null'

        let queryString = {
            text: 'SELECT * '
                + ' ' + from
                + ' ' + where,
            values: paramsValues,
        }

        console.log(queryString)

        let privilege = await DataBaseUtils.execute(client, queryString)

        return privilege

    }

    static async insertTrackingStatus(tracking_number, seq, status_date, place, status, recipient_name) {

        let data = await TrackingDetailModel.create({
            tracking_id: tracking_number,
            seq: seq,
            status_date: new Date(),
            place: place,
            status: status,
            recipient_name: recipient_name
        }, {
            returning: true,
        })

        return data
    }

}

export default InfiniteAdminDAO;
