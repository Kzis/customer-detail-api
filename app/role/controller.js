import RoleDAO from './dao'
import STATUS from '../../master/http-status'

class RoleController {

    static getAll(req, res) {

        RoleDAO.findAll().then((data) => {
            return res.status(STATUS.OK).json({
                users: data
            })
        })

    }

}


export default RoleController;