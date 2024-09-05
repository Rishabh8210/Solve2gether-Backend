import { FriendRequestService, UserService } from '../services/index';
import { StatusCodes } from 'http-status-codes';
import { ClientError } from '../utils/errors/index'
import { Request, Response, NextFunction } from 'express'
import { CustomRequest } from '../middlewares/authRequestValidator';


class FriendRequestController {
    friendRequestService: FriendRequestService;
    userService: UserService
    constructor(){
        this.friendRequestService = new FriendRequestService()
        this.userService = new UserService();
    }

    sendFriendRequest = async(req:CustomRequest, res:Response) => {
        try{
            const {username} = req.params;
            const isUserExist = await this.userService.getUserByUsername(username);
            if(!isUserExist){
                throw new ClientError(
                    'AttributeNotFound',
                    'User not found',
                    ['User data not found. Please verify your username and try again.'],
                    StatusCodes.UNAUTHORIZED
                )
            }
            console.log(isUserExist)
            const friendRequestData = {
                senderUsername: req.headers["user"].id,
                receiverUsername: isUserExist._id,
            }
    
            const response = await this.friendRequestService.sendFriendRequest(friendRequestData);
            return res.status(StatusCodes.CREATED).json({
                data: response,
                message: 'Successfully request sended',
                status: true,
                err: {}
            })
        }catch(error:any){
            console.log(error);
            return res.status(error.statusCode).json({
                data: {},
                message: error.message,
                status: false,
                err: error
            })
        }
    }

    acceptFriendRequest = async(req:CustomRequest, res: Response) => {
        try {
            const { username } = req.params;
            const isUserExist = await this.userService.getUserByUsername(username);
            if(!isUserExist){
                throw new ClientError(
                    'AttributeNotFound',
                    'User not found',
                    ['User data not found. Please verify your username and try again.'],
                    StatusCodes.UNAUTHORIZED
                )
            }
            const userId = req.headers["user"].id;
            const response = await this.friendRequestService.acceptFriendRequest(userId, isUserExist._id);
            console.log(response)
            return res.status(StatusCodes.OK).json({
                data: response,
                message: 'Friend request accepted successfully',
                status: true,
                err :{}
            })
        } catch (error:any) {
            console.log(error);
            return res.status(error.statusCode).json({
                data: {},
                message: error.message,
                status: false,
                err: error
            })
        }
    }
    removeFriend = async(req:CustomRequest, res:Response) => {
        try {
            const friendUsername = req.query.username as string;
            console.log(friendUsername);
            const isFriendExist = await this.userService.getUserByUsername(friendUsername);
            if(!isFriendExist){
                throw new ClientError(
                    'AttributeNotFound',
                    'User not found',
                    ['User is deleted his/her account'],
                    StatusCodes.NOT_FOUND
                )
            }
            const userId = req.headers['user'].id;
            const response = await this.friendRequestService.removeFriend(userId, isFriendExist._id);
            return res.status(StatusCodes.OK).json({
                data: response,
                message: 'Successfully friend is removed',
                success: true,
                err: {}
            })
        } catch (error:any) {
            console.log(error);
            return res.status(error.statusCode).json({
                data: {},
                success: false,
                message: error.message,
                err: error
            })
        }
    }
    getAllByName = async(req:Request, res:Response) => {
        try {
            let name  = req.query.name as string;
            const users = await this.friendRequestService.getAllByName(name);
            return res.status(StatusCodes.OK).json({
                data: users,
                message: 'Successfully fetched the users',
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
}

export default FriendRequestController