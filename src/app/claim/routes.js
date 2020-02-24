import controller from './controller';

export function setup(router) {

    router
    .post('/getClaimInquiry', controller.getClaimInquiry)
    .post('/getClaimDetail', controller.getClaimDetail)

}
