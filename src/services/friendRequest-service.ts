import {FriendRequestRepository, UserRepository} from '../repositories/index';
import {StatusCodes} from 'http-status-codes';
import {AppError, ClientError} from '../utils/errors/index';
import { IFriendRequest } from '../models/friendRequest-model';
import { Schema } from 'mongoose';

class FriendRequestService {
    friendRequestRepository:FriendRequestRepository
    userRepository:UserRepository
    constructor(){
        this.friendRequestRepository = new FriendRequestRepository();
        this.userRepository = new UserRepository();
    }

    sendFriendRequest = async(friendRequestData: Partial<IFriendRequest>) => {
        try {
            const {senderUsername, receiverUsername} = friendRequestData;
            if(!senderUsername || !receiverUsername){
                throw new ClientError(
                    'AttributeNotFound',
                    'Invalid request data',
                    ['Required fields are mandatory'],
                    StatusCodes.BAD_REQUEST
                );
            }
            const isAlreadySended = await this.friendRequestRepository.getUser(senderUsername, receiverUsername);
            if(isAlreadySended){
                throw new AppError(
                    'DuplicateKeyError',
                    'A request with this username is already exists',
                    ['A request with this username is already exists'],
                    StatusCodes.CONFLICT
                )
            }
            const response = await this.friendRequestRepository.create(friendRequestData);
            return response
        } catch (error:any) {
            console.log("Something went wrong inside service layerssss", error);
            if(error.message === 'FriendRequest validation failed'){
                throw error;
            }
            if(error.name == 'DuplicateKeyError'){
                throw error
            }
            throw new AppError(
                'ServerError',
                'Something went wrong, Please try again',
                ['Logical issue found'],
                StatusCodes.INTERNAL_SERVER_ERROR
            )
        }
    }

    acceptFriendRequest = async(id: Schema.Types.ObjectId, friendId: Schema.Types.ObjectId) => {
        try {
            console.log(id)
            const user = await this.userRepository.getUserById(id);
            const {friends} = user;
            console.log(friends)
            const isAlreadyFriend = friends.indexOf(friendId);
            console.log(isAlreadyFriend)
            if(isAlreadyFriend != -1){
                throw new ClientError(
                    'AttributeNotFound',
                    'User is already connected',
                    ['User is already connected with other person'],
                    StatusCodes.CONFLICT
                )
            }
            const response:any = await this.friendRequestRepository.update(friendId, {status: 'Accepted'});
            console.log(response)
            const addResponseInList = await this.userRepository.update(id, friendId);
            const removeFriendRequest = await this.friendRequestRepository.deleteUserById(response._id);
            return addResponseInList;
        } catch (error:any) {
            console.log("Something went wrrong inside service layer");
            if(error.message === 'FriendRequest validation failed'){
                throw error;
            }
            if(error.name == 'AttributeNotFound'){
                throw error
            }
            throw new AppError(
                'ServerError',
                'Something went wrong, Please try again',
                ['Logical issue found'],
                StatusCodes.INTERNAL_SERVER_ERROR
            )
        }
    }

    removeFriend = async(userId:Schema.Types.ObjectId, friendId: Schema.Types.ObjectId) => {
        try {
            const isFriendExist = await this.userRepository.getUserById(friendId);
            if(!isFriendExist){
                throw new ClientError(
                    'AttributeNotFound',
                    'User not exists',
                    ['User is deleted his/her account'],
                    StatusCodes.NOT_FOUND
                );
            }
            const user = await this.userRepository.getUserById(userId);
            const userFriends = user.friends;
            const filterUserFriends = userFriends.filter((friend: any) => {
                if(!(friend._id.equals(friendId)))
                    return friend
            });
            user.friends = filterUserFriends;
            
            const friendFriends = isFriendExist.friends;
            const filterFriendFriends = friendFriends.filter((friend: any) => {
                if(!(friend._id.equals(userId)))
                    return friend
            });
            isFriendExist.friends = filterFriendFriends;
            console.log("Dataa", user, isFriendExist);

            await user.save();
            await isFriendExist.save();
            return user
        } catch (error:any) {
            console.log("Something went wrong inside friendRequest service layer", error);
            if(error.name == 'AttributeNotFound'){
                throw error
            }
            throw new AppError(
                'ServerError',
                'Something went wrong, Please try again',
                ['Logical issue found'],
                StatusCodes.INTERNAL_SERVER_ERROR
            )
        }
    }
    
    getAllFriendsByUsername = async(username:string) => {
        try {
            const user = this.userRepository.getUserByUsername(username);
            return user;
        } catch (error:any) {
            console.log("Something went wrong in the service layer", error);
            if(error.name == 'AttributeNotFound'){
                throw error
            }
            throw new AppError(
                'ServerError',
                'Something went wrong, Please try again',
                ['Logical issue found'],
                StatusCodes.INTERNAL_SERVER_ERROR
            )
        }
    }

    getAllByName = async(name:string) => {
        try {
            console.log(name)
            const users = await this.userRepository.getAllByName(name);
            return users;
        } catch (error:any) {
            console.log("Something went wrong in the service layer", error);
            if(error.name == 'AttributeNotFound'){
                throw error
            }
            throw new AppError(
                'ServerError',
                'Something went wrong, Please try again',
                ['Logical issue found'],
                StatusCodes.INTERNAL_SERVER_ERROR
            )
        }
    }
}

export default FriendRequestService