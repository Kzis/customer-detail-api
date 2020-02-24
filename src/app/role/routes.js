import controller from './controller';

export function setup(router) {

    router
        .post('/getMapRoleMenu', controller.getMapRoleMenu)
        .post('/addMapRoleMenu', controller.addMapRoleMenu)
        .post('/updateMapRoleMenu', controller.updateMapRoleMenu)
        .post('/deleteMapRoleMenu', controller.deleteMapRoleMenu)

        .post('/getMasterRole', controller.getMasterRole)
        .post('/addMasterRole', controller.addMasterRole)
        .post('/updateMasterRole', controller.updateMasterRole)
        .post('/deleteMasterRole', controller.deleteMasterRole)
        .post('/getRoleDetailsConfigById', controller.getRoleDetailsConfigById)

}