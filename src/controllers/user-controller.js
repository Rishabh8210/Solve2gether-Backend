const { UserService } = require('../services/index');
const { StatusCodes } = require('http-status-codes');
const ClientError = require('../utils/errors/client-error');


class UserController {
    constructor() {
        this.userService = new UserService();
    }
    create = async (req, res) => {
        try {
            const user = await this.userService.create(req.body);
            return res.status(StatusCodes.CREATED).json({
                data: user,
                message: 'Sucessfully user signup',
                status: true,
                err: {}
            })
        } catch (error) {
            return res.status(error.statusCode).json({
                data: {},
                message: error.message,
                status: false,
                err: error
            })
        }
    }
    update = async (req, res) => {
        try {
            const { username } = req.params;
            const existingUser = await this.userService.getUserByUsername(username);
            if (existingUser._id != req.user.id) {
                throw new ClientError(
                    'AttributeNotFound',
                    'User is not authorished',
                    'User is not authorisher, please check your username and try again',
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
        } catch (error) {
            console.log(error)
            return res.status(error.statusCode).json({
                data: {},
                sucess: false,
                message: error.message,
                err: error
            })
        }
    }
    getUserByUsername = async (req, res) => {
        try {
            const { username } = req.query;
            const existingUser = await this.userService.getUserByUsername(username);
            if (existingUser._id != req.user.id) {
                throw new ClientError(
                    'AttributeNotFound',
                    'User is not authorished',
                    'User is not authorisher, please check your username and try again',
                    StatusCodes.UNAUTHORIZED
                )
            }
            return res.status(StatusCodes.OK).json({
                data: existingUser,
                message: 'Sucessfully fetched user',
                status: true,
                err: {}
            })
        } catch (error) {
            console.log(error)
            return res.status(error.statusCode).json({
                data: {},
                message: error.message,
                status: false,
                err: error
            })
        }
    }
    deleteUserByUsername = async (req, res) => {
        try {
            const { username } = req.query;
            const existingUser = await this.userService.getUserByUsername(username);
            if (existingUser._id != req.user.id) {
                throw new ClientError(
                    'AttributeNotFound',
                    'User is not authorished',
                    'User is not authorisher, please check your username and try again',
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
        } catch (error) {
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

module.exports = UserController