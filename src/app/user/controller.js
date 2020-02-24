
import userService from './service'

class UserController {


    static getUser(req, res) {
        userService.getUser(req).then((data) => {
            return res.json({
                users: data
            })
        })
    }

    static addUser(req, res) {
        userService.addUser(req).then((data) => {
            return res.json({
                users: data
            })
        })
    }

    static updateUser(req, res) {
        userService.updateUser(req).then((data) => {
            return res.json({
                users: data
            })
        })
    }

    static deleteUser(req, res) {
        userService.deleteUser(req).then((data) => {
            return res.json({
                users: data
            })
        })
    }
}
export default UserController;