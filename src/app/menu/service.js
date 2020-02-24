import menuDAO from './dao'
import JsonUtils from '../../utils/json-utils'
import LogUtils from '../../utils/log-utils'
import AsyncUtils from '../../utils/async-utils'
import https_status from '../../master/http-status'

class MenuService {

    static async getMasterMenu(body) {
        let responseRecord = {}
        let headerData = {}
        let responseStatus = {}
        try {
            let data = await menuDAO.getMasterMenu()
            let listOut = []
            data.forEach(val => {
                listOut.push(val.dataValues)
            });
            responseRecord = listOut
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
            return JsonUtils.setJsonOutput(headerData, responseStatus, responseRecord)
        }
    };

    static async getMasterSubMenu(body) {
        let responseRecord = {}
        let headerData = {}
        let responseStatus = {}
        try {
            let data = await menuDAO.getMasterSubMenu()
            let listOut = []
            data.forEach(val => {
                listOut.push(val.dataValues)
            });
            responseRecord = listOut
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
            return JsonUtils.setJsonOutput(headerData, responseStatus, responseRecord)
        }
    };

    static async getMenu(body) {
        let id = body.id
        let mapRoleMenu = await menuDAO.getMapRoleMenu(id)
        let check_menu = 0
        let data = []
        let objData = {}
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

                sub.push(objSub)

                master.sub = sub

                if (i === mapRoleMenu.rows.length) {
                    objMenu.push(master)
                }
            }
        });

        objMenu.shift()
        objData.roldId = id
        objData.menu = objMenu
        data.push(objData)

        return data
    }

    static async getMenuCMS(body) {
        let id = body.id
        let is_admin = 1
        let mapRoleMenu = await menuDAO.getMapRoleMenuCMS(id, is_admin)
        let check_menu = 0
        let data = []
        let objData = {}
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
                sub.push(objSub)

                if (i === mapRoleMenu.rows.length) {
                    master.sub = sub
                    objMenu.push(master)
                }
            } else {

                check_menu = ele.menu_id

                if (check_menu != 0) {
                    if (master) {
                        objMenu.push(master)
                    } else {
                        objMenu.push(ele)
                    }

                }

                master = {}
                objSub = {}
                sub = []

                master.id = ele.menu_id
                master.master = ele.master_menu_name

                objSub.id = ele.sub_menu_id
                objSub.name = ele.sub_menu_name
                objSub.keyName = ele.sub_menu_key

                sub.push(objSub)

                master.sub = sub

                if (i === mapRoleMenu.rows.length) {
                    objMenu.push(master)
                }
            }
        });

        objMenu.shift()
        objData.roldId = id
        objData.menu = objMenu
        data.push(objData)

        return data
    }

    static async insertMenu(body) {
        let headerData = JsonUtils.getHeaderData(body.headerData)
        let responseData = {}
        let responseStatus = {}

        try {
            LogUtils.debug(headerData.messageId, this.name, this.insertMenu.name, JSON.stringify(body), "insertMenu")

            let name = body.requestRecord.name
            let p_id = body.requestRecord.p_id
            let key = body.requestRecord.key

            let checkName = await menuDAO.getMenuByName(name)

            let checkKey = await menuDAO.getMenuByKey(key)

            if (checkName.rows == '' && checkKey.rows == '') {
                let data = await menuDAO.insertMenu(name, p_id, key)
                if (data.length != undefined || data != null) {
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
            } else {
                responseStatus = 'ไม่สามารถบันทึกเนื่องจาก name หรือ key ซ้ำกับในระบบ'
                return JsonUtils.setJsonOutput(headerData, responseStatus)
            }

        } catch (error) {
            console.log(error);
            LogUtils.error(headerData.messageId, this.name, this.insertMenu.name, JSON.stringify(body), error)
            responseStatus = JsonUtils.setResponseStatus(https_status.INTERNAL_SERVER_ERROR)
            return JsonUtils.setJsonOutput(headerData, responseStatus)
        }
    }

    static async updateMenu(body) {
        let headerData = JsonUtils.getHeaderData(body.headerData)
        let responseData = {}
        let responseStatus = {}

        try {
            // LogUtils.debug(headerData.messageId, this.name, this.insertMenu.name, JSON.stringify(body), "insertMenu")

            let data = await menuDAO.updateMenu(body.requestRecord)


            if (data.length != undefined || data != null) {
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
            LogUtils.error(headerData.messageId, this.name, this.insertMenu.name, JSON.stringify(body), error)
            responseStatus = JsonUtils.setResponseStatus(https_status.INTERNAL_SERVER_ERROR)
            return JsonUtils.setJsonOutput(headerData, responseStatus)
        }
    }

    static async deleteMenu(body) {
        let headerData = JsonUtils.getHeaderData(body.headerData)
        let responseData = {}
        let responseStatus = {}

        try {
            // LogUtils.debug(headerData.messageId, this.name, this.insertMenu.name, JSON.stringify(body), "insertMenu")

            let data = await menuDAO.deleteMenu(body.requestRecord)


            if (data.length != undefined || data != null) {
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
            LogUtils.error(headerData.messageId, this.name, this.insertMenu.name, JSON.stringify(body), error)
            responseStatus = JsonUtils.setResponseStatus(https_status.INTERNAL_SERVER_ERROR)
            return JsonUtils.setJsonOutput(headerData, responseStatus)
        }
    }

    static async insertSubmenu(body) {
        let headerData = JsonUtils.getHeaderData(body.headerData)
        let responseData = {}
        let responseStatus = {}

        try {
            LogUtils.debug(headerData.messageId, this.name, this.insertSubmenu.name, JSON.stringify(body), "insertSubmenu")

            let name = body.requestRecord.name
            let p_id = body.requestRecord.p_id
            let key = body.requestRecord.key

            let checkName = await menuDAO.getSubMenuByName(name)

            let checkKey = await menuDAO.getSubMenuByKey(key)

            if (checkName.rows == '' && checkKey.rows == '') {
                let data = await menuDAO.insertSubmenu(name, p_id, key)
                if (data.length != undefined || data != null) {
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
            } else {
                responseStatus = 'ไม่สามารถบันทึกเนื่องจาก name หรือ key ซ้ำกับในระบบ'
                return JsonUtils.setJsonOutput(headerData, responseStatus)
            }

        } catch (error) {
            console.log(error);
            LogUtils.error(headerData.messageId, this.name, this.insertSubmenu.name, JSON.stringify(body), error)
            responseStatus = JsonUtils.setResponseStatus(https_status.INTERNAL_SERVER_ERROR)
            return JsonUtils.setJsonOutput(headerData, responseStatus)
        }
    }

    static async updateSubmenu(body) {
        let headerData = JsonUtils.getHeaderData(body.headerData)
        let responseData = {}
        let responseStatus = {}

        try {
            // LogUtils.debug(headerData.messageId, this.name, this.insertMenu.name, JSON.stringify(body), "insertMenu")

            let data = await menuDAO.updateSubmenu(body.requestRecord)


            if (data.length != undefined || data != null) {
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
            LogUtils.error(headerData.messageId, this.name, this.insertMenu.name, JSON.stringify(body), error)
            responseStatus = JsonUtils.setResponseStatus(https_status.INTERNAL_SERVER_ERROR)
            return JsonUtils.setJsonOutput(headerData, responseStatus)
        }
    }

    static async deleteSubmenu(body) {
        let headerData = JsonUtils.getHeaderData(body.headerData)
        let responseData = {}
        let responseStatus = {}

        try {
            // LogUtils.debug(headerData.messageId, this.name, this.insertMenu.name, JSON.stringify(body), "insertMenu")

            let data = await menuDAO.deleteSubmenu(body.requestRecord)


            if (data.length != undefined || data != null) {
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
            LogUtils.error(headerData.messageId, this.name, this.insertMenu.name, JSON.stringify(body), error)
            responseStatus = JsonUtils.setResponseStatus(https_status.INTERNAL_SERVER_ERROR)
            return JsonUtils.setJsonOutput(headerData, responseStatus)
        }
    }

}





export default MenuService;