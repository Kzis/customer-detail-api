import usercontroller from './controller'

export function setup(router) {

    router
        .post('/getUser', usercontroller.getUser)
        .post('/addUser', usercontroller.addUser)
        .post('/updateUser', usercontroller.updateUser)
        .post('/deleteUser', usercontroller.deleteUser)
}

