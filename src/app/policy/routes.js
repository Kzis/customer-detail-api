import controller from './controller';

export function setup(router) {

    router
        .post('/getPolicyList', controller.getPolicyList)
        .post('/getPolicyDisplay', controller.getPolicyDisplay)
        .post('/getPolicyPremium', controller.getPolicyPremium)
        .post('/getPolicyLoan', controller.getPolicyLoan)

}
