import controller from './controller';

export function setup(router) {

    router
        .post('/', controller.getLogin)
        .post('/CMS', controller.getLoginCMS)

}