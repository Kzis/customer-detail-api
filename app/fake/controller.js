import FakeDAO from './dao'
import STATUS from '../../master/http-status'

class FakeController {

    static getAll(req, res) {

        FakeDAO.findAll().then((data) => {
            return res.status(STATUS.OK).json({
                users: data
            })
        })

    }

}

export default FakeController;