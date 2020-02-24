import PolicyService from './service'

class PolicyController {

    static getPolicyList(req, res) {

        PolicyService.getPolicyList(req.body)
            .then((data) => {
                res.json({ data })
            })
    }

    static getPolicyDisplay(req, res) {

        PolicyService.getPolicyDisplay(req.body)
            .then((data) => {
                res.json({ data })
            })
    }

    static getPolicyPremium(req, res) {

        PolicyService.getPolicyPremium(req.body)
            .then((data) => {
                res.json({ data })
            })
    }

    static getPolicyLoan(req, res) {

        PolicyService.getPolicyLoan(req.body)
            .then((data) => {
                res.json({ data })
            })
    }

}


export default PolicyController;
