import controller from './controller';

export function setup(router) {

    router
        .post('/search', controller.getTemplate)
        .post('/save', controller.saveTemplate)

}
