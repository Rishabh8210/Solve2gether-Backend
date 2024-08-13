const {StatusCodes} = require('http-status-codes');
const { AuthService } = require('../services/index');

class AuthController {
    constructor(){
        this.authService = new AuthService();
    }

    signup = async(req, res) => {
        try {
            const user = await this.authService.signup(req.body);
            return res.status(StatusCodes.CREATED).json({
                data: user,
                status: true,
                message: 'User successfully signed up',
                err: {}
            })
        } catch (error) {
            return res.status(error.statusCode).json({
                data: {},
                status: false,
                message: error.message,
                err: {error}
            })
        }
    }

    signin = async(req, res) => {
        try {
            const response = await this.authService.signin(req.body);
            return res.status(StatusCodes.OK).json({
                data: response,
                status: true,
                message: 'User successfully signed in',
                err: {}
            }) 
        } catch (error) {
            return res.status(error.statusCode).json({
                data: {},
                status: true,
                message: error.message,
                err: error
            }) 
        }
    }
}

module.exports = AuthController