import models from './model'

class userDAO {

    constructor() {
        this.key = 'user';
    }

    static async findAll() {

        let data = await models.ModelUser.findAll({
            include: [{
                model: models.ModelMasterRole,
                on: {
                    col1: models.sequelize.where(
                        models.sequelize.col("user.role_id"), "=",
                        models.sequelize.col("master_role.role_id"))
                },
                attributes: ['name']
            }],
            order: [['update_date', 'DESC']],
            raw: true,
        })
        return data
    }

    static async findByPid(pid) {

        let data = await models.ModelUser.findAll({
            raw: true,
            where: {
                employee_id: pid
            }
        })
        return data

    }

    static async findBEmpid(employee_id) {

        let data = await models.ModelUser.findAll({
            raw: true,
            where: {
                employee_id: employee_id
            }
        })
        return data

    }

    static async add(body) {

        let data = models.ModelUser.create({

            employee_id: body.employee_id,
            role_id: body.role_id,
            favorite: "",
            active: body.active,
            create_date: new Date(),
            update_date: new Date(),
            create_by: body.pid,
            update_by: body.pid
        }, {
            returning: true,

        })
        return data
    }

    static async update(body) {

        let data = models.ModelUser.update({

            role_id: body.role_id,
            active: body.active,
            update_date: new Date(),
            update_by: body.pid
        }, {
            returning: true,
            where: {
                employee_id: body.employee_id
            }
        })

        return data
    }

    static async delete(body) {
        let data = models.ModelUser.destroy({
            where: {
                employee_id: body.employee_id
            }
        })
        return data
    }
}

export default userDAO;