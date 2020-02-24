import controller from './controller';

export function setup(router) {

    router
        .post('/insertComplyReceipt', controller.insertComplyReceipt) //INF-08
        .post('/getComplyReceipt', controller.getComplyReceipt) //INF-09
        .post('/insertPrivilegeTracking', controller.insertPrivilegeTracking) //INF-10
        .post('/getPrivilegeTracking', controller.getPrivilegeTracking) //INF-12
        .post('/getPreparePrivileage', controller.getPreparePrivileage) //INF-13
        .post('/insPrivileageAssign', controller.insPrivileageAssign) 
        .post('/getDredownProvince', controller.getDredownProvince) 
        .post('/getDredownTier', controller.getDredownTier) // INF-16
        .post('/updateTrackingEMS ', controller.updateTrackingEMS ) //INF-14
        // .post('/updateTrackingStatus', controller.updateTrackingStatus) // INF-15
        .post('/insertTrackingStatus', controller.insertTrackingStatus)

}
