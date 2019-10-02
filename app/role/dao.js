
import RoleModel from './model'

class RoleDAO {

    constructor() {
        this.key = 'role';
    }

    static async findAll() {

        let data = await RoleModel.findAll({
            raw: true,
        })
        return data
    }

}

export default RoleDAO;