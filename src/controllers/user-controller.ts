import { UserService } from '../services/index';
import { StatusCodes } from 'http-status-codes';
import { ClientError } from '../utils/errors/index';
import { Request, Response } from 'express';
import { CustomRequest } from '../middlewares/authRequestValidator';

class UserController {
    userService: UserService
    constructor() {
        this.userService = new UserService();
    }
    create = async (req:Request, res:Response) => {
        try {
            const user = await this.userService.create(req.body);
            return res.status(StatusCodes.CREATED).json({
                data: user,
                message: 'Sucessfully user signup',
                status: true,
                err: {}
            })
        } catch (error:any) {
            return res.status(error.statusCode).json({
                data: {},
                message: error.message,
                status: false,
                err: error
            })
        }
    }
    update = async (req:CustomRequest, res:Response) => {
        try {
            const { username } = req.params;
            const existingUser = await this.userService.getUserByUsername(username);
            if (existingUser._id != req.headers['user'].id) {
                throw new ClientError(
                    'AttributeNotFound',
                    'User is not authorished',
                    ['User is not authorisher, please check your username and try again'],
                    StatusCodes.UNAUTHORIZED
                )
            }
            const updateUser = await this.userService.update(existingUser._id, req.body);
            return res.status(StatusCodes.OK).json({
                data: updateUser,
                message: 'User updated successfully',
                status: true,
                err: {}
            })
        } catch (error:any) {
            console.log(error)
            return res.status(error.statusCode).json({
                data: {},
                sucess: false,
                message: error.message,
                err: error
            })
        }
    }
    getUserByUsername = async (req:CustomRequest, res:Response) => {
        try {
            const username = req.query.username as string;
            const existingUser = await this.userService.getUserByUsername(username);
            if (!existingUser || existingUser._id != req.headers['user'].id) {
                throw new ClientError(
                    'AttributeNotFound',
                    'User is not authorished',
                    ['User is not authorisher, please check your username and try again'],
                    StatusCodes.UNAUTHORIZED
                )
            }
            return res.status(StatusCodes.OK).json({
                data: existingUser,
                message: 'Sucessfully fetched user',
                status: true,
                err: {}
            })
        } catch (error:any) {
            console.log(error)
            return res.status(error.statusCode).json({
                data: {},
                message: error.message,
                status: false,
                err: error
            })
        }
    }
    deleteUserByUsername = async (req:CustomRequest, res:Response) => {
        try {
            const username = req.query.username as string;
            const existingUser = await this.userService.getUserByUsername(username);
            if (existingUser._id != req.headers["user"].id) {
                throw new ClientError(
                    'AttributeNotFound',
                    'User is not authorished',
                    ['User is not authorisher, please check your username and try again'],
                    StatusCodes.UNAUTHORIZED
                )
            }
            const response = await this.userService.deleteUserByUsername(username);
            return res.status(StatusCodes.OK).json({
                data: response,
                message: 'Sucessfully deleted the user',
                status: true,
                err: {}
            })
        } catch (error:any) {
            // console.log(error)
            return res.status(error.statusCode).json({
                data: {},
                message: error.message,
                status: false,
                err: error
            })
        }
    }
}

export default UserController