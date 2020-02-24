import controller from './controller';

export function setup(router) {

    router
        .post('/getBasicInfo', controller.getBasicInfo)
        .post('/getDemographicInfo', controller.getDemographicInfo)

}