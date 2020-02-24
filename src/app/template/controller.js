import TemplateService from './service'

class TemplateController {


    static getTemplate(req, res) {

        TemplateService.getTemplate(req.body)
            .then((data) => {
                res.send(data)
            })
    }

    static saveTemplate(req, res) {

        TemplateService.saveTemplate(req.body)
            .then((data) => {
                res.send(data)
            })
    }


}

export default TemplateController;
