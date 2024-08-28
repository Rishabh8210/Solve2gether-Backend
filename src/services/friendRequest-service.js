const {FriendRequestRepository, UserRepository} = require('../repositories/index');
const {StatusCodes} = require('http-status-codes')
const AppError = require('../utils/errors/app-error');
const ClientError = require('../utils/errors/client-error')
class FriendRequestService {
    constructor(){
        this.friendRequestRepository = new FriendRequestRepository();
        this.userRepository = new UserRepository();
    }

    sendFriendRequest = async(friendRequestData) => {
        try {
            const {senderUsername, receiverUsername} = friendRequestData;
            const isAlreadySended = await this.friendRequestRepository.getUser(senderUsername, receiverUsername);
            if(isAlreadySended){
                throw new AppError(
                    'DuplicateKeyError',
                    'A request with this username is already exists',
                    'A request with this username is already exists',
                    StatusCodes.CONFLICT
                )
            }
            const response = await this.friendRequestRepository.create(friendRequestData);
            return response
        } catch (error) {
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
                'Logical issue found',
                StatusCodes.INTERNAL_SERVER_ERROR
            )
        }
    }

    acceptFriendRequest = async(id, friendId) => {
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
                    'User is already connected with other person',
                    StatusCodes.CONFLICT
                )
            }
            const response = await this.friendRequestRepository.update(friendId, {status: 'Accepted'});
            console.log(response)
            const addResponseInList = await this.userRepository.update(id, friendId);
            const removeFriendRequest = await this.friendRequestRepository.deleteUserById(response._id);
            return addResponseInList;
        } catch (error) {
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
                'Logical issue found',
                StatusCodes.INTERNAL_SERVER_ERROR
            )
        }
    }

    getAllFriendsByUsername = async(username) => {
        try {
            const user = this.userRepository.getUserByUsername(username);
            return user;
        } catch (error) {
            console.log("Something went wrong in the service layer", error);
            if(error.name == 'AttributeNotFound'){
                throw error
            }
            throw new AppError(
                'ServerError',
                'Something went wrong, Please try again',
                'Logical issue found',
                StatusCodes.INTERNAL_SERVER_ERROR
            )
        }
    }

    getAllByName = async(name) => {
        try {
            console.log(name)
            const users = await this.userRepository.getAllByName(name);
            return users;
        } catch (error) {
            console.log("Something went wrong in the service layer", error);
            if(error.name == 'AttributeNotFound'){
                throw error
            }
            throw new AppError(
                'ServerError',
                'Something went wrong, Please try again',
                'Logical issue found',
                StatusCodes.INTERNAL_SERVER_ERROR
            )
        }
    }
}

module.exports = FriendRequestService