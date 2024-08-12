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
}

module.exports = UserController