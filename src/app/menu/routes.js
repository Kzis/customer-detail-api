import controller from './controller';

export function setup(router) {

    router
        .post('/getMenu', controller.getMenu)
        .post('/getMenuINF', controller.getMenuCMS)
        .post('/getMasterMenu', controller.getMasterMenu)
        .post('/getMasterSubMenu', controller.getMasterSubMenu)
        .post('/insertMenu', controller.insertMenu)
        .post('/updateMenu', controller.updateMenu)
        .post('/deleteMenu', controller.deleteMenu)
        .post('/insertSubmenu', controller.insertSubmenu)
        .post('/updateSubmenu', controller.updateSubmenu)
        .post('/deleteSubmenu', controller.deleteSubmenu)
}