import roleDao from './dao'
import dateUtil from '../../utils/date-utils'
import menuDAO from '../../app/menu/dao'
import AsyncUtils from '../../utils/async-utils'

class RoleService {

    //-----------------MASTER ROLE----------------------
    static async getMasterRole(req) {
        let output = null
        let name = req.body.requestRecord.name
        if (!req.body.name) {
            await roleDao.getMasterRoleAll().then((data) => {
                output = setMasterRoleOutput(data)
            })
        } else {
            name = name + "%"
            await roleDao.getMasterRoleByName(name).then((data) => {
                output = setMasterRoleOutput(data)
            })
        }
        return output
    }

    static async addMasterRole(req) {

        let output = {
            "status": "",
            "logError": "",
            "master_role": {}
        };
        try {
            await roleDao.addMasterRole(req.body.requestRecord).then((data) => {
                output.status = "SUCCESS"
                output.master_role = data.dataValues
            })

        } catch (err) {
            output.status = "FAILED"
            output.logError = err.message
        } finally {
            return output
        }


    }

    static async updateMasterRole(req) {
        let output = {
            "status": "",
            "logError": "",
            "master_role": null
        };
        try {
            await roleDao.updateMasterRole(req.body.requestRecord).then((data) => {
                output.status = "SUCCESS"
                output.master_role = data[1][0].dataValues
            })
        } catch (err) {
            console.log(err)
            output.status = "FAILED"
            output.logError = err.message
        } finally {
            return output
        }
    }

    static async deleteMasterRole(req) {

        let output = {
            "status": "",
            "logError": "",
            "role_id": ""
        };
        try {
            await roleDao.deleteMasterRole(req.body.requestRecord).then((data) => {
                output.status = "SUCCESS"
                output.role_id = req.body.requestRecord.role_id
            })
        } catch (err) {
            output.status = "FAILED"
            output.logError = err.message
            output.role_id = req.body.role_id
        } finally {
            return output
        }
    }


    //---------------MAP ROLE MENU----------------
    static async getMapRoleMenu(req) {
        let output = null
        let role_id = req.body.role_id
        if (!req.body.role_id) {
            await roleDao.getMapRoleMenuAll().then((data) => {
                // console.log("***********data all************");
                // console.log(data);
                // console.log("***********data all************");
                output = setMaRoleMenuOutput(data)
            })
        } else {
            await roleDao.getMapRoleMenuByRoleId(role_id).then((data) => {

                // console.log("***********data byName************");
                // console.log(data);
                // console.log("***********data byName************");
                output = setMaRoleMenuOutput(data)
            })
        }
        // console.log("***********output************");
        // console.log(output);
        // console.log("***********output************");
        return output
    }

    static async addMapRoleMenu(req) {

        let output = {
            "status": "",
            "logError": "",
            "map_role_menu": null
        };
        try {
            req.body.create_by = req.body.create_by.replace("-", "")
            req.body.update_by = req.body.update_by.replace("-", "")
            await roleDao.addMapRoleMenu(req.body).then((data) => {
                output.status = "SUCCESS"
                output.map_role_menu = data.dataValues
            })

        } catch (err) {
            output.status = "FAILED"
            output.logError = err.message
        } finally {
            return output
        }


    }

    static async updateMapRoleMenu(req) {
        let output = {
            "status": "",
            "logError": "",
            "map_role_menu": null
        };
        try {
            req.body.update_by = req.body.update_by.replace("-", "")
            await roleDao.updateMapRoleMenu(req.body).then((data) => {
                output.status = constant.SUCCESS
                output.map_role_menu = data[1][0].dataValues
            })
        } catch (err) {
            output.status = "FAILED"
            output.logError = err.message
        } finally {
            return output
        }
    }

    static async deleteMapRoleMenu(req) {

        let output = {
            "status": "",
            "logError": "",
            "role_id": ""
        };
        try {
            await roleDao.deleteMapRoleMenu(req.body).then((data) => {
                output.status = "SUCCESS"
                output.role_id = req.body.role_id
            })
        } catch (err) {
            output.status = "FAILED"
            output.logError = err.message
            output.role_id = req.body.role_id
        } finally {
            return output
        }
    }

    static async getRoleDetailsConfigById(body) {

        let id = body.id
        let is_admin = ''
        let mapRoleMenu = await menuDAO.getMapRoleMenuCMS(id, is_admin)
        let check_menu = 0
        let data = {}
        let master = {}
        let sub = []
        let objSub = {}
        let objMenu = []
        let i = 0

        await AsyncUtils.asyncForEach(mapRoleMenu.rows, async (ele) => {
            i++
            console.log(ele)
            console.log("----------")
            if (ele.menu_id == check_menu) {
                objSub = {}
                objSub.id = ele.sub_menu_id
                objSub.name = ele.sub_menu_name
                objSub.keyName = ele.sub_menu_key

                if (id != 0) {
                    if (ele.is_admin == 2) {
                        objSub.isDashborad = 1
                        objSub.isInfinite = 1
                    } else if (ele.is_admin == 1) {
                        objSub.isDashborad = 1
                        objSub.isInfinite = 0
                    } else {
                        objSub.isDashborad = 0
                        objSub.isInfinite = 1
                    }
                } else {
                    objSub.isDashborad = 0
                    objSub.isInfinite = 0
                }


                sub.push(objSub)
                if (i === mapRoleMenu.rows.length) {
                    objMenu.push(master)
                }
            } else {
                check_menu = ele.menu_id

                if (check_menu != 0) {
                    objMenu.push(master)
                }

                master = {}
                objSub = {}
                sub = []

                master.id = ele.menu_id
                master.master = ele.master_menu_name

                objSub.id = ele.sub_menu_id
                objSub.name = ele.sub_menu_name
                objSub.keyName = ele.sub_menu_key

                if (id != 0) {
                    if (ele.is_admin == 2) {
                        objSub.isDashborad = 1
                        objSub.isInfinite = 1
                    } else if (ele.is_admin == 1) {
                        objSub.isDashborad = 1
                        objSub.isInfinite = 0
                    } else {
                        objSub.isDashborad = 0
                        objSub.isInfinite = 1
                    }
                } else {
                    objSub.isDashborad = 0
                    objSub.isInfinite = 0
                }

                sub.push(objSub)

                master.sub = sub

                if (i === mapRoleMenu.rows.length) {
                    objMenu.push(master)
                }
            }
        });

        objMenu.shift()

        data.roldId = id
        data.menu = objMenu

        return data
    }
}


export default RoleService;

function setMasterRoleOutput(data) {
    var listOutput = []
    var output = {}
    data.forEach(element => {
        output = {}
        output.role_id = element.role_id
        output.name = element.name
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


function setMaRoleMenuOutput(data) {
    var listOutput = []
    var output = {}
    data.forEach(element => {
        output = {}
        output.role_id = element.role_id
        output.role_name = element['master_role.name']
        output.menu_id = element.menu_id
        output.menu_name = element['master_menu.name']
        output.sub_menu_id = element.sub_menu_id
        output.menu_sub_name = element['master_sub_menu.name']
        output.api_id = element.api_id
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