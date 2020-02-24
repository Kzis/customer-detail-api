import userDAO from './dao'
import dateUtil from '../../utils/date-utils'

class UserService {

    //CALL LADAP - GET PID
    static async getUser(req) {
        let output = null
        if (!req.body.requestRecord.employee_id) {
            await userDAO.findAll().then((data) => {
                output = setOutput(data)
            })
        } else {
            await userDAO.findByPid(req.body.requestRecord.employee_id).then((data) => {
                output = setOutput(data)
            })
        }

        return output
    }


    static async addUser(req) {
        let output = {
            "status": "",
            "logError": "",
            "user": null
        };
        try {
            let user = null
            console.log("=======================")
            console.log(req.body)
            console.log("=======================")
            user = await userDAO.findBEmpid(req.body.requestRecord.employee_id)

            console.log("=======================")
            console.log(user)
            console.log("=======================")

            if (user.length <= 0) {
                let data = await userDAO.add(req.body.requestRecord)
                output.status = "SUCCESS"
                output.user = data.dataValues
            } else {
                output.status = "FAILED"
                output.logError = "employee_id : " + req.body.employee_id + " is already register."
            }

        } catch (err) {
            output.status = "FAILED"
            output.logError = err.message
        } finally {
            return output
        }

    }

    static async updateUser(req) {
        let output = {
            "status": "",
            "logError": "",
            "user": null
        };
        try {
            let data = await userDAO.update(req.body.requestRecord)
            output.status = "SUCCESS"
            output.user = data[1][0].dataValues
        } catch (err) {
            console.log(err)
            output.status = "FAILED"
            output.logError = err.message
        } finally {
            return output
        }

    }

    static async deleteUser(req) {
        let output = {
            "status": "",
            "logError": "",
            "employee_id": ""
        };
        try {
            await userDAO.delete(req.body.requestRecord)
            output.status = "SUCCESS"
            output.employee_id = req.body.requestRecord.employee_id
        } catch (err) {
            output.status = "FAILED"
            output.logError = err.message
            output.employee_id = req.body.requestRecord.employee_id
        } finally {
            return output
        }

    }
}


export default UserService;

function setOutput(data) {
    var listOutput = []
    var output = {}
    data.forEach(element => {
        output = {}
        output.user_id = element.user_id
        output.employee_id = element.employee_id
        output.role_id = element.role_id
        output.role_name = element['master_role.name']
        output.favorite = element.favorite
        output.active = element.active
        output.create_date = dateUtil.setDateFormat(element.create_date, "yyyy/mm/dd h:MM:ss");
        output.update_date = dateUtil.setDateFormat(element.update_date, "yyyy/mm/dd h:MM:ss");
        output.create_by = element.create_by
        output.update_by = element.update_by
        listOutput.push(output)
    })
    // console.log("********UserService********");
    // console.log(listOutput);
    // console.log("********UserService********");

    return listOutput
}