
import TemplateModel from './model'
import RoleModel from './model-role'
import DataBaseUtils from '../../utils/database-utils'

class TemplateDAO {

    constructor() {
        this.key = 'template';
    }

    static async getTemplate(pid) {
        return await this.findByPid(pid)
    }

    static async getTemplateDefault(roleId) {
        return await this.findByRoleId(roleId)
    }

    static async saveTemplate(requestRecord) {
        let data

        let pid = await this.findByPid(requestRecord.pid)

        if (pid != null && pid != undefined) {
            await this.delete(requestRecord)
            data = await this.add(requestRecord)
            return data;
        } else {
            data = await this.add(requestRecord)
            return data;
        }
    }

    static async findByPid(pid) {
        let data = await TemplateModel.findAll({
            raw: true,
            where: {
                employee_id: pid
            }
        })
        return data
    }

    static async findByRoleId(roleId) {
        let data = await RoleModel.findAll({
            raw: true,
            where: {
                role_id: roleId
            }
        })
        return data
    }

    static async add(requestRecord) {

        let data = await TemplateModel.create({
            employee_id: requestRecord.pid,
            layout_json: requestRecord.layoutJson,
            menu_json: requestRecord.menuTabJson,
            active: 1,
            create_date: new Date(),
            update_date: new Date(),
            create_by: requestRecord.pid,
            update_by: requestRecord.pid
        }, {
            returning: true,

        })

        return data
    }

    static async delete(body) {
        let data = await TemplateModel.destroy({
            where: {
                employee_id: body.pid
            }
        })
        return data
    }

}

export default TemplateDAO;
