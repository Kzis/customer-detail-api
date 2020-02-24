import PolicyService from './service'

class PolicyDataServiceController {

    static policyDetailsOL(req, res) {

        PolicyService.policyDetailsOL(req.body)
            .then((data) => {
                res.send(data)
            })
    }

    static policyDetailsCL(req, res) {

        PolicyService.policyDetailsCL(req.body)
            .then((data) => {
                res.send(data)
            })
    }

    static policyDetailsUnitLink(req, res) {

        PolicyService.policyDetailsUnitLink(req.body)
            .then((data) => {
                res.send(data)
            })
    }

    static nextPayPeriod(req, res) {

        PolicyService.nextPayPeriod(req.body)
            .then((data) => {
                res.send(data)
            })
    }

    static getLoanPremium(req, res) {

        PolicyService.getLoanPremium(req.body)
            .then((data) => {
                res.send(data)
            })
    }

    static getRiderDetial(req, res) {

        PolicyService.getRiderDetial(req.body)
            .then((data) => {
                res.send(data)
            })
    }

    static getBeneficiaryInfo(req, res) {

        PolicyService.getBeneficiaryInfo(req.body)
            .then((data) => {
                res.send(data)
            })
    }

    static getPaymentHistory(req, res) {

        PolicyService.getPaymentHistory(req.body)
            .then((data) => {
                res.send(data)
            })
    }

    static getCoverageOverview(req, res) {

        PolicyService.getCoverageOverview(req.body)
            .then((data) => {
                res.send(data)
            })
    }

    static claimInquiry(req, res) {

        PolicyService.claimInquiry(req.body)
            .then((data) => {
                res.send(data)
            })
    }

    static claimDetail(req, res) {

        PolicyService.claimDetail(req.body)
            .then((data) => {
                res.send(data)
            })
    }

    static displayPolicyList(req, res) {
        PolicyService.displayPolicyList(req.body)
            .then((data) => {
                res.send(data)
            })
    }
    static actualValuePolicy(req, res) {
        PolicyService.actualValuePolicy(req.body)
            .then((data) => {
                res.send(data)
            })
    }
}


export default PolicyDataServiceController;
