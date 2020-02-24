import InfiniteAdminService from './service'
import InfiniteAdminDAO from './dao'

class InfiniteAdminController {

    static insertComplyReceipt(req, res) {

        InfiniteAdminService.insertComplyReceipt(req.body)
            .then((data) => {
                res.send(data)
            })
    }

    static getComplyReceipt(req, res) {

        InfiniteAdminService.getComplyReceipt(req.body)
            .then((data) => {
                res.send(data)
            })
    }

    static insertPrivilegeTracking(req, res) {

        InfiniteAdminService.insertPrivilegeTracking(req.body)
            .then((data) => {
                res.send(data)
            })
    }

    static getPrivilegeTracking(req, res) {

        InfiniteAdminService.getPrivilegeTracking(req.body)
            .then((data) => {
                res.send(data)
            })
    }

    static getPreparePrivileage(req, res) {

        InfiniteAdminService.getPreparePrivileage(req.body)
            .then((data) => {
                res.send(data)
            })
    }

    static insPrivileageAssign(req, res) {

        InfiniteAdminService.insPrivileageAssign(req.body)
            .then((data) => {
                res.send(data)
            })
    }

    static getDredownProvince(req, res) {

        InfiniteAdminService.getDredownProvince(req.body)
            .then((data) => {
                res.send(data)
            })
    }

      static getDredownTier(req, res) {

        InfiniteAdminService.getDredownTier(req.body)
            .then((data) => {
                res.send(data)
            })
    }

    static updateTrackingEMS(req, res) {

        InfiniteAdminService.updateTrackingEMS(req.body)
            .then((data) => {
                res.send(data)
            })
    }

      static insertTrackingStatus(req, res) {

        InfiniteAdminService.insertTrackingStatus(req.body)
            .then((data) => {
                res.send(data)
            })
    }
}

export default InfiniteAdminController;
