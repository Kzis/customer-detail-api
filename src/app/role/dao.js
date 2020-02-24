import models from './model'
const Op = models.Sequelize.Op;

class RoleDAO {

    constructor() {
        this.key = 'role';
    }

    //-----------MASTER_ROLE----------------
    static async getMasterRoleAll() {

        let data = await models.ModelMasterRole.findAll({
            attributes: ['role_id', 'name', 'create_date', 'update_date', 'create_by', 'update_by'],
            order: ['role_id'],
            raw: true,
        })
        return data
    }
    static async getMasterRoleByRoleId(role_id) {

        let data = await models.ModelMasterRole.findAll({
            raw: true,
            attributes: ['role_id', 'name', 'create_date', 'update_date', 'create_by', 'update_by'],
            where: {
                role_id: role_id
            },
        })
        return data

    }

    static async getMasterRoleByName(name) {

        let data = await models.ModelMasterRole.findAll({
            raw: true,
            attributes: ['role_id', 'name', 'create_date', 'update_date', 'create_by', 'update_by'],
            where: {
                name: {
                    [Op.like]: name
                }
            },
            order: ['role_id'],
        })
        return data

    }

    static async addMasterRole(body) {

        let data = models.ModelMasterRole.create({

            name: body.name,
            create_date: new Date(),
            update_date: new Date(),
            create_by: body.pid,
            update_by: body.pid
        }, {
            returning: true,

        })
        return data
    }

    static async updateMasterRole(body) {

        let data = models.ModelMasterRole.update({
            name: body.name,
            update_date: new Date(),
            update_by: body.pid
        }, {
            returning: true,
            where: {
                role_id: body.role_id
            }
        })

        return data
    }

    static async deleteMasterRole(body) {
        let data = models.ModelMasterRole.destroy({
            where: {
                role_id: body.role_id
            }
        })
        return data
    }


    //-----------MAP_ROLE_MENU----------------
    static async getMapRoleMenuAll() {

        let data = await models.ModelMapRoleMenu.findAll({
            include: [{
                model: models.ModelMasterRole,
                on: {
                    col1: models.sequelize.where(
                        models.sequelize.col("master_role.role_id"), "=",
                        models.sequelize.col("map_role_menu.role_id"))
                },
                attributes: ['role_id', 'name'],
            }, {
                model: models.ModelMasterMenu,
                on: {
                    col1: models.sequelize.where(
                        models.sequelize.col("map_role_menu.menu_id"), "=",
                        models.sequelize.col("master_menu.menu_id"))
                },
                attributes: ['menu_id', 'key', 'name'],
            }, {
                model: models.ModelMasterSubMenu,
                on: {
                    col1: models.sequelize.where(
                        models.sequelize.col("map_role_menu.sub_menu_id"), "=",
                        models.sequelize.col("master_sub_menu.sub_menu_id"))
                },
                attributes: ['sub_menu_id', 'key', 'name']
            }
            ],
            order: ['role_id'],
            raw: true,
        })
        return data
    }

    static async getMapRoleMenuByRoleId(role_id) {

        let data = await models.ModelMapRoleMenu.findAll({
            include: [{
                model: models.ModelMasterRole,
                on: {
                    col1: models.sequelize.where(
                        models.sequelize.col("master_role.role_id"), "=",
                        models.sequelize.col("map_role_menu.role_id"))
                },
                attributes: ['role_id', 'name'],
            }, {
                model: models.ModelMasterMenu,
                on: {
                    col1: models.sequelize.where(
                        models.sequelize.col("map_role_menu.menu_id"), "=",
                        models.sequelize.col("master_menu.menu_id"))
                },
                attributes: ['menu_id', 'key', 'name'],
            }, {
                model: models.ModelMasterSubMenu,
                on: {
                    col1: models.sequelize.where(
                        models.sequelize.col("map_role_menu.sub_menu_id"), "=",
                        models.sequelize.col("master_sub_menu.sub_menu_id"))
                },
                attributes: ['sub_menu_id', 'key', 'name']
            }
            ],
            where: {
                role_id: role_id
            },
            order: ['role_id'],
            raw: true,
        })
        return data

    }

    static async addMapRoleMenu(body) {

        let data = models.ModelMapRoleMenu.create({

            role_id: body.role_id,
            menu_id: body.menu_id,
            sub_menu_id: body.sub_menu_id,
            api_id: body.api_id,
            create_date: new Date(),
            update_date: new Date(),
            create_by: body.create_by,
            update_by: body.update_by
        }, {
            returning: true,

        })
        return data
    }

    static async updateMapRoleMenu(body) {

        let data = models.ModelMapRoleMenu.update({

            menu_id: body.menu_id,
            sub_menu_id: body.sub_menu_id,
            api_id: body.api_id,
            update_date: new Date(),
            update_by: body.update_by
        }, {
            returning: true,
            where: {
                role_id: body.role_id
            }
        })

        return data
    }

    static async deleteMapRoleMenu(body) {
        let data = models.ModelMapRoleMenu.destroy({
            where: {
                role_id: body.role_id
            }
        })
        return data
    }

    //-------------util----------------



}

export default RoleDAO;