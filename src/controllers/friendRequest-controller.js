const {FriendRequestService, UserService} = require('../services/index');
const {StatusCodes} = require('http-status-codes');
const ClientError = require('../utils/errors/client-error')

class FriendRequestController {
    constructor(){
        this.friendRequestService = new FriendRequestService()
        this.userService = new UserService();
    }

    sendFriendRequest = async(req, res) => {
        try{
            const {username} = req.params;
            const isUserExist = await this.userService.getUserByUsername(username);
            if(!isUserExist){
                throw new ClientError(
                    'AttributeNotFound',
                    'User not found',
                    'User data not found. Please verify your username and try again.',
                    StatusCodes.UNAUTHORIZED
                )
            }
            console.log(isUserExist)
            const friendRequestData = {
                senderUsername: req.user.id,
                receiverUsername: isUserExist._id,
            }
    
            const response = await this.friendRequestService.sendFriendRequest(friendRequestData);
            return res.status(StatusCodes.CREATED).json({
                data: response,
                message: 'Successfully request sended',
                status: true,
                err: {}
            })
        }catch(error){
            console.log(error);
            return res.status(error.statusCode).json({
                data: {},
                message: error.message,
                status: false,
                err: error
            })
        }
    }

    acceptFriendRequest = async(req, res) => {
        try {
            const { username } = req.params;
            const isUserExist = await this.userService.getUserByUsername(username);
            if(!isUserExist){
                throw new ClientError(
                    'AttributeNotFound',
                    'User not found',
                    'User data not found. Please verify your username and try again.',
                    StatusCodes.UNAUTHORIZED
                )
            }
            
            const response = await this.friendRequestService.acceptFriendRequest(req.user.id, isUserExist._id);
            console.log(response)
            return res.status(StatusCodes.OK).json({
                data: response,
                message: 'Friend request accepted successfully',
                status: true,
                err :{}
            })
        } catch (error) {
            console.log(error);
            return res.status(error.statusCode).json({
                data: {},
                message: error.message,
                status: false,
                err: error
            })
        }
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