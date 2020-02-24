import menuService from './service'
var io = require('@pm2/io')
var counter = io.counter({
    name: 'Active requests'
})

class menuController {

    static getMenu(req, res) {
        counter.inc()
        menuService.getMenu(req.body).then((data) => {
            counter.dec()
            return res.json({
                users: data
            })
        })

    }

    static getMenuCMS(req, res) {
        menuService.getMenuCMS(req.body).then((data) => {
            counter.dec()
            return res.json({
                users: data
            })
        })

    }

    static getMasterMenu(req, res) {

        menuService.getMasterMenu(req.body).then((data) => {
            return res.json(data)
        })

    }

    static getMasterSubMenu(req, res) {

        menuService.getMasterSubMenu(req.body).then((data) => {
            return res.json(data)
        })

    }

    static insertMenu(req, res) {

        menuService.insertMenu(req.body).then((data) => {
            return res.json(data)
        })

    }

    static updateMenu(req, res) {

        menuService.updateMenu(req.body).then((data) => {
            return res.json(data)
        })

    }

    static deleteMenu(req, res) {

        menuService.deleteMenu(req.body).then((data) => {
            return res.json(data)
        })

    }

    static insertSubmenu(req, res) {

        menuService.insertSubmenu(req.body).then((data) => {
            return res.json(data)
        })

    }

    static updateSubmenu(req, res) {

        menuService.updateSubmenu(req.body).then((data) => {
            return res.json(data)
        })

    }

    static deleteSubmenu(req, res) {

        menuService.deleteSubmenu(req.body).then((data) => {
            return res.json(data)
        })

    }

}


export default menuController;