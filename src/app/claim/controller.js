import ClaimService from './service'

class ClaimController {

    static getClaimInquiry(req, res) {

        ClaimService.getClaimInquiry(req.body)
            .then((data) => {
                res.send(data)
            })
    }

    static getClaimDetail(req, res) {

        ClaimService.getClaimDetail(req.body)
            .then((data) => {
                res.send(data)
            })
    }

}


export default ClaimController;
