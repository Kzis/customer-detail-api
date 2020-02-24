import LookupService from './service'

class LookupController {

    static getOccupation(req, res) {
        LookupService.getOccupation().then((data) => {
            return res.json({ data })
        })
    }

    static getSubDistCode(req, res) {
        LookupService.getSubDistCode().then((data) => {
            return res.json({ data })
        })
    }

    static getIncomeRange(req, res) {
        LookupService.getIncomeRange().then((data) => {
            return res.json({ data })
        })
    }

    static getParticipantRole(req, res) {
        LookupService.getParticipantRole().then((data) => {
            return res.json({ data })
        })
    }

    static getBloodGroup(req, res) {
        LookupService.getBloodGroup().then((data) => {
            return res.json({ data })
        })
    }

    static getReligion(req, res) {
        LookupService.getReligion().then((data) => {
            return res.json({ data })
        })
    }

    static getCountryCode(req, res) {
        LookupService.getCountryCode().then((data) => {
            return res.json({ data })
        })
    }

    static getAll(req, res) {
        LookupService.getAll().then((data) => {
            return res.json({ data })
        })
    }

    static getMaritalStatus(req, res) {
        LookupService.getMaritalStatus().then((data) => {
            return res.json({ data })
        })
    }

    static getEducationLevel(req, res) {
        LookupService.getEducationLevel().then((data) => {
            return res.json({ data })
        })
    }



}


export default LookupController;