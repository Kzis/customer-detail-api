import loginService from './service';


class LoginController {

    static getLogin(req, res) {

        loginService.login(req)
            .then((data) => {
                res.json({
                    login: data
                })
            })
    }

    static getLoginCMS(req, res) {

        loginService.loginCMS(req)
            .then((data) => {
                res.json({
                    login: data
                })
            })
    }

}

export default LoginController;