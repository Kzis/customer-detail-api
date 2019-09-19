import controller from './controller';

export function setup(router) {

    router
        .get('/', controller.getAll)
        .get('/:id', controller.getById)
        .post('/', controller.get)
        .post('/add', controller.insert)
        .post('/update/:id', controller.update)
        .delete('/:id', controller.delete)

}