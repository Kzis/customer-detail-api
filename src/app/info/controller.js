import infoService from './service'

class BasicInfoController {

    static getBasicInfo(req, res) {
        infoService.getBasicInfo(req.body).then((data) => {
            return res.json({
                data: data
            })
        })
    }

    static getDemographicInfo(req, res) {
        infoService.getDemographicInfo(req.body).then((data) => {
            return res.json({
                data: data
            })
        })
    }
}


export default BasicInfoController;