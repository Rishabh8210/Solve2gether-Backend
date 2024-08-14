const {FriendRequestService} = require('../services/index');
const {StatusCodes} = require('http-status-codes');

class FriendRequestController {
    constructor(){
        this.friendRequestService = new FriendRequestService()
    }

    getAllByName = async(req, res) => {
        try {
            const { name } = req.query;
            const users = await this.friendRequestService.getAllByName(name);
            return res.status(StatusCodes.OK).json({
                data: users,
                message: 'Successfully fetched the users',
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

module.exports = FriendRequestController