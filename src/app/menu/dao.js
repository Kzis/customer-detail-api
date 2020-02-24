
const models = require('./model');
import DataBaseUtils from '../../utils/database-utils'
import master_menu from '../menu/master_menu.js'
import master_sub_menu from '../menu/master_sub_menu'

class menuDAO {

    constructor() {
        this.key = 'menu';
    }

    // static async getMenu(id) {
    //     let data = await models.ModelMapRoleName.findAll({
    //         attributes: ['role_id'],
    //         where: {
    //             role_id: id
    //         },
    //         order: ['menu_id', 'sub_menu_id'],
    //         include: [{
    //             model: models.ModelMasterMenu,
    //             on: {
    //                 col1: models.sequelize.where(
    //                     models.sequelize.col("map_role_menu.menu_id"), "=",
    //                     models.sequelize.col("master_menu.menu_id"))
    //             },
    //             attributes: ['menu_id', 'key', 'name'],
    //         }, {
    //             model: models.ModelMasterSubMenu,
    //             on: {
    //                 col1: models.sequelize.where(
    //                     models.sequelize.col("map_role_menu.sub_menu_id"), "=",
    //                     models.sequelize.col("master_sub_menu.sub_menu_id"))
    //             },
    //             attributes: ['sub_menu_id', 'key', 'name']
    //         }, {
    //             model: models.ModelSystemConfig,
    //             on: {
    //                 col1: models.sequelize.where(
    //                     models.sequelize.col("map_role_menu.is_admin"), "=",
    //                     models.sequelize.col("system_config.system_id")),
    //                 col2: models.sequelize.where(
    //                     models.sequelize.col("system_config.type"), "=",
    //                     "API")
    //             },
    //             attributes: ['system_id', 'key', 'value']
    //         }],
    //     })
    //     console.log('********************** get data ***********');
    //     console.log(data);



    //     return data
    // }

    static async getMasterMenu() {
        return await models.ModelMasterMenu.findAll(
            {
                attributes: [
                    'menu_id', 'key', 'name', 'create_date', 'update_date', 'create_by', 'update_by'
                ]
            }
        )
    }

    static async getMasterSubMenu() {
        return await models.ModelMasterSubMenu.findAll(
            {
                attributes: [
                    'sub_menu_id', 'key', 'name', 'create_date', 'update_date', 'create_by', 'update_by'
                ]
            }
        )
    }

    static async getMapRoleMenu(id) {
        let client = await DataBaseUtils.getConnectionsInformation()

        let where = ' where role_id =' + id

        // let queryString = {
        //     text: " select a.map_role_id , a.role_id , a.menu_id , a.sub_menu_id , " +
        //         " b.name as master_menu_name , b.key as master_menu_key , " +
        //         " c.name as sub_menu_name , c.key as sub_menu_key " +
        //         " from customer_dashboard.map_role_menu a " +
        //         " left join customer_dashboard.master_menu b on a.menu_id = b.menu_id " +
        //         " left join customer_dashboard.master_sub_menu c on a.sub_menu_id = c.sub_menu_id "
        //         + ' ' + where
        // }

        let queryString = {
            text: " select a.map_role_id , a.role_id ,a.map_menu_id, b.menu_id , b.sub_menu_id , a.is_admin , " +
                " c.name as master_menu_name , c.key as master_menu_key , " +
                " d.name as sub_menu_name, d.key as sub_menu_key " +
                " from customer_dashboard.map_role_menu a " +
                " left join customer_dashboard.map_menu b on a.map_menu_id = b.map_menu_id " +
                " left join customer_dashboard.master_menu c on b.menu_id = c.menu_id " +
                " left join customer_dashboard.master_sub_menu d on b.sub_menu_id = d.sub_menu_id "
                + ' ' + where
        }

        let data = await DataBaseUtils.execute(client, queryString)
        return data
    }

    static async getMapRoleMenuCMS(id, is_admin) {

        let client = await DataBaseUtils.getConnectionsInformation()
        let queryString
        let where = ''

        if (is_admin == 1) {
            where = where + ' where role_id =' + id + ' and a.is_admin = ' + is_admin
        } else {
            if (id == 0) {
                where = where
            } else {
                where = where + ' where role_id =' + id 
            }
        }

        if (is_admin == 1) {
            queryString = {
                text: 'select a.map_role_id , a.role_id ,a.map_menu_id, b.menu_id , b.sub_menu_id , a.is_admin ,'
                    + ' ' + 'c.name as master_menu_name , c.key as master_menu_key , '
                    + ' ' + 'd.name as sub_menu_name, d.key as sub_menu_key '
                    + ' ' + 'from customer_dashboard.map_role_menu a '
                    + ' ' + 'left join customer_dashboard.map_menu b on a.map_menu_id = b.map_menu_id'
                    + ' ' + 'left join customer_dashboard.master_menu c on b.menu_id = c.menu_id'
                    + ' ' + 'left join customer_dashboard.master_sub_menu d on b.sub_menu_id = d.sub_menu_id'
                    + ' ' + where
                    + ' ' + 'order by a.map_role_id'
            }
            console.log(queryString); 
        } else {
            queryString = {
                text: 'select count(is_admin) as is_admin, b.menu_id , b.sub_menu_id, c.name as master_menu_name,'
                    + ' ' + 'c.key as master_menu_key, d.name as sub_menu_name, d.key as sub_menu_key'
                    + ' ' + 'from customer_dashboard.map_role_menu a'
                    + ' ' + 'left join customer_dashboard.map_menu b on a.map_menu_id = b.map_menu_id'
                    + ' ' + 'left join customer_dashboard.master_menu c on b.menu_id = c.menu_id'
                    + ' ' + 'left join customer_dashboard.master_sub_menu d on b.sub_menu_id = d.sub_menu_id'
                    + ' ' + where
                    + ' ' + 'group by b.menu_id, b.sub_menu_id, c.name, c.key, d.name, d.key'
                    + ' ' + 'order by b.menu_id'
            }
            console.log(queryString);
        }

        let data = await DataBaseUtils.execute(client, queryString)
        return data
    }

    static async getMasterMenu(menuId) {
        let client = await DataBaseUtils.getConnectionsInformation()

        let where = ' where menu_id =' + menuId
        let queryString = {
            text: " select * from customer_dashboard.master_menu "
                + ' ' + where
        }

        let data = await DataBaseUtils.execute(client, queryString)
        return data
    }

    static async getMasterSubMenu(subMenuId) {
        let client = await DataBaseUtils.getConnectionsInformation()

        let where = ' where sub_menu_id =' + subMenuId
        let queryString = {
            text: " select * from customer_dashboard.master_sub_menu "
                + ' ' + where
        }

        let data = await DataBaseUtils.execute(client, queryString)
        return data
    }

    static async insertMenu(name, p_id, key) {

        let data = await master_menu.create({
            name: name,
            create_date: new Date() + 7,
            update_date: new Date() + 7,
            create_by: p_id,
            update_by: p_id,
            key: key
        }, {
            returning: true,
        })

        return data

    }

    static async getMenuByKey(key) {

        let client = await DataBaseUtils.getConnectionsDashboard()
        let count = 1
        let condition = ''
        let paramsValues = []

        condition = condition + 'where key = $' + count++
        paramsValues.push(key)

        let queryString = {
            text: "select * from customer_dashboard.master_menu"
                + ' ' + condition,
            values: paramsValues
        }

        let data = await DataBaseUtils.execute(client, queryString)

        return data
    }

    static async getMenuByName(name) {

        let client = await DataBaseUtils.getConnectionsDashboard()
        let count = 1
        let condition = ''
        let paramsValues = []

        condition = condition + ' where name = $' + count++
        paramsValues.push(name)

        let queryString = {
            text: "select * from customer_dashboard.master_menu"
                + ' ' + condition,
            values: paramsValues
        }

        let data = await DataBaseUtils.execute(client, queryString)

        return data
    }

    static async getMenuByName(name) {

        let client = await DataBaseUtils.getConnectionsDashboard()
        let count = 1
        let condition = ''
        let paramsValues = []

        condition = condition + ' where name = $' + count++
        paramsValues.push(name)

        let queryString = {
            text: "select * from customer_dashboard.master_menu"
                + ' ' + condition,
            values: paramsValues
        }

        let data = await DataBaseUtils.execute(client, queryString)

        return data
    }

    static async updateMenu(requestRecord) {

        let data = master_menu.update({
            name: requestRecord.name,
            update_date: (new Date() + 7),
            update_by: requestRecord.update_by,
            key: requestRecord.key
        }, {
            returning: true,
            where: {
                menu_id: requestRecord.menu_id
            }
        })

        return data
    }

    static async deleteMenu(requestRecord) {
        let data = master_menu.destroy({
            where: {
                menu_id: requestRecord.menu_id
            }
        })
        return data
    }

    static async getSubMenuByKey(key) {

        let client = await DataBaseUtils.getConnectionsDashboard()
        let count = 1
        let condition = ''
        let paramsValues = []

        condition = condition + 'where key = $' + count++
        paramsValues.push(key)

        let queryString = {
            text: "select * from customer_dashboard.master_sub_menu"
                + ' ' + condition,
            values: paramsValues
        }

        let data = await DataBaseUtils.execute(client, queryString)

        return data
    }

    static async getSubMenuByName(name) {

        let client = await DataBaseUtils.getConnectionsDashboard()
        let count = 1
        let condition = ''
        let paramsValues = []

        condition = condition + ' where name = $' + count++
        paramsValues.push(name)

        let queryString = {
            text: "select * from customer_dashboard.master_sub_menu"
                + ' ' + condition,
            values: paramsValues
        }

        let data = await DataBaseUtils.execute(client, queryString)

        return data
    }

    static async insertSubmenu(name, p_id, key) {

        let data = await master_sub_menu.create({
            name: name,
            create_date: (new Date() + 7),
            update_date: (new Date() + 7),
            create_by: p_id,
            update_by: p_id,
            key: key
        }, {
            returning: true,
        })

        return data

    }

    static async updateSubmenu(requestRecord) {

        let data = master_sub_menu.update({
            name: requestRecord.name,
            update_date: (new Date() + 7),
            update_by: requestRecord.update_by,
            key: requestRecord.key
        }, {
            returning: true,
            where: {
                sub_menu_id: requestRecord.sub_menu_id
            }
        })

        return data
    }

    static async deleteSubmenu(requestRecord) {
        let data = master_sub_menu.destroy({
            where: {
                sub_menu_id: requestRecord.sub_menu_id
            }
        })
        return data
    }


}

export default menuDAO;