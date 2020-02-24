import roleService from './service'
class RoleController {


    //------------MASTER_ROLE FUNCION---------------
    static getMasterRole(req, res) {
        roleService.getMasterRole(req).then((data) => {
            return res.json({
                role: data
            })
        })
    }

    static addMasterRole(req, res) {
        roleService.addMasterRole(req).then((data) => {
            return res.json({
                role: data
            })
        })
    }

    static updateMasterRole(req, res) {
        roleService.updateMasterRole(req).then((data) => {
            return res.json({
                role: data
            })
        })
    }

    static deleteMasterRole(req, res) {
        roleService.deleteMasterRole(req).then((data) => {
            return res.json({
                role: data
            })
        })
    }


    //--------------MAP_ROLE_MENU FUNCION----------------
    static getMapRoleMenu(req, res) {
        roleService.getMapRoleMenu(req).then((data) => {
            return res.json({
                role: data
            })
        })
    }

    static addMapRoleMenu(req, res) {
        roleService.addMapRoleMenu(req).then((data) => {
            return res.json({
                role: data
            })
        })
    }

    static updateMapRoleMenu(req, res) {
        roleService.updateMapRoleMenu(req).then((data) => {
            return res.json({
                role: data
            })
        })
    }

    static deleteMapRoleMenu(req, res) {
        roleService.deleteMapRoleMenu(req).then((data) => {
            return res.json({
                role: data
            })
        })
    }

    static getRoleDetailsConfigById(req, res) {
  
        roleService.getRoleDetailsConfigById(req.body).then((data) => {
            return res.json({
                role: data
            })
        })
    }

}


export default RoleController;