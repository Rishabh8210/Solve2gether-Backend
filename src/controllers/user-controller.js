const { UserService } = require('../services/index');
const { StatusCodes } = require('http-status-codes');


class UserController{
    constructor(){
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
    update = async(req, res) => {
        try {
            const { username } = req.params;
            const user = await this.userService.getUserByUsername(username);
            const updateUser = await this.userService.update(user._id, req.body);
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
            console.log(username)
            const user = await this.userService.getUserByUsername(username);
            return res.status(StatusCodes.OK).json({
                data: user,
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
}

module.exports = UserController