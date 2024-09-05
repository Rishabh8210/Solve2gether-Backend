import {StatusCodes} from 'http-status-codes';
import { AuthService } from '../services/index';
import {Request, Response, NextFunction} from 'express'
class AuthController {
    authService: AuthService
    constructor(){
        this.authService = new AuthService();
    }

    signup = async(req:Request, res:Response) => {
        try {
            const user = await this.authService.signup(req.body);
            return res.status(StatusCodes.CREATED).json({
                data: user,
                status: true,
                message: 'User successfully signed up',
                err: {}
            })
        } catch (error:any) {
            return res.status(error.statusCode).json({
                data: {},
                status: false,
                message: error.message,
                err: {error}
            })
        }
    }

    signin = async(req:Request, res:Response) => {
        try {
            const response = await this.authService.signin(req.body);
            return res.status(StatusCodes.OK).json({
                data: response,
                status: true,
                message: 'User successfully signed in',
                err: {}
            }) 
        } catch (error:any) {
            return res.status(error.statusCode).json({
                data: {},
                status: true,
                message: error.message,
                err: error
            }) 
        }
    }
}

export default AuthController