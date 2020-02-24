
import userDAO from '../user/dao';
import roleDAO from '../role/dao';
import ldapConfig from '../../config/ldap-config'
import LogUtils from '../../utils/log-utils'

const soapRequest = require('easy-soap-request');
const xml2js = require('xml2js')
const processors = xml2js.processors
const xmlParser = xml2js.Parser({
    tagNameProcessors: [processors.stripPrefix]
})


class LoginService {

    //CALL LADAP - GET PID
    static async login(req) {
        const url = ldapConfig.url
        const sampleHeaders = ldapConfig.sampleHeaders
        let xml = ldapConfig.ldap
        xml = xml.replace('#userparam#', req.body.userName)
        xml = xml.replace('#passwordparam#', req.body.password)

        console.log("========== xml ==========")
        console.log(xml)
        console.log("========== xml ==========")

        LogUtils.debug('', this.name, this.login.name, JSON.stringify(xml), "Call : " + url)
        const { response } = await soapRequest({ url: url, headers: sampleHeaders, xml: xml, timeout: 1000 });
        const { body } = response

        console.log("========== response ==========")
        console.log(response)
        console.log("========== response ==========")

        // get ldap                           
        let ldap = await xmlParseString(body)

        console.log("========== ldap ==========")
        LogUtils.debug('', this.name, this.login.name, body, "Response after call ldap")
        console.log(ldap)
        console.log("========== ldap ==========")


        if (ldap.pid != null) {

            // getuser
            let user = await this.getUser(ldap.pid)

            try {
                LogUtils.debug('', this.name, this.login.name, JSON.stringify(user), "Get dashboard user")
                if (user[0].active === 1) {

                    // get role
                    let role = await this.getRole(user[0].role_id)
                    LogUtils.debug('', this.name, this.login.name, JSON.stringify(role), "Login สำเร็จ")

                    let serviceLdapResponse = {
                        message: ldap.message,
                        status: ldap.status == "true",
                        pid: user[0].employee_id,
                        roleId: user[0].role_id,
                        roleName: role.name

                    }
                    return serviceLdapResponse
                } else {
                    LogUtils.debug('', this.name, this.login.name, JSON.stringify(user), "ไม่พบข้อมูลใน Dashboard")
                    ldap.message = "ไม่พบข้อมูลใน Dashboard1"
                    ldap.status = false
                    return ldap

                }
            } catch (err) {
                LogUtils.error('', this.name, this.login.name, JSON.stringify(body), err)
                console.log(err);
                let serviceLdapResponse = {
                    message: "ไม่พบข้อมูลใน Dashboard",
                    status: false,
                    pid: null

                }
                return serviceLdapResponse
            }

        } else {
            LogUtils.debug('', this.name, this.login.name, JSON.stringify(ldap), "บัญชีหรือรหัสผ่านท่านไม่ถูกต้อง")
            ldap.message = "บัญชีหรือรหัสผ่านท่านไม่ถูกต้อง"
            ldap.status = false
            return ldap
        }
    };

    // login CMS
    static async loginCMS(req) {

        const url = ldapConfig.url
        const sampleHeaders = ldapConfig.sampleHeaders
        let xml = ldapConfig.ldap
        xml = xml.replace('#userparam#', req.body.userName)
        xml = xml.replace('#passwordparam#', req.body.password)

        const { response } = await soapRequest({ url: url, headers: sampleHeaders, xml: xml, timeout: 1000 });
        const { body } = response
        let ldap = await xmlParseString(body)

        ldap.status = ldap.status == "true"
        ldap.pid = ldap.pid != null ? ldap.pid : ""

        return ldap


    };

    //CALL USERDAO - GET ROLE
    static async getUser(pid) {
        const data = await userDAO.findByPid(pid)
        return data
    }

    //CALL ROLEDAO - GET ROLE
    static async getRole(role_id) {
        const data = await roleDAO.getMasterRoleByRoleId(role_id)
        return data
    }
}

async function xmlParseString(body) {

    let serviceResponse = {
        message: null,
        status: null,
        pid: null
    }

    xmlParser.parseString(body, (err, result) => {
        if (err) {
            // res.json(err)
        } else {
            let serviceReqResponse = result.Envelope.Body[0].serviceReqResponse[0].return[0]

            if (serviceReqResponse.result[0].personAttributes != null) {
                serviceResponse = {
                    message: serviceReqResponse.message[0],
                    status: serviceReqResponse.status[0],
                    pid: serviceReqResponse.result[0].personAttributes[0].pid[0]
                }
            } else {
                serviceResponse = {
                    message: serviceReqResponse.message[0],
                    status: serviceReqResponse.status[0],
                    pid: null
                }
            }

        }
    })
    return serviceResponse
}




export default LoginService;