const {FriendRequestRepository, UserRepository} = require('../repositories/index');
const {StatusCodes} = require('http-status-codes')
const AppError = require('../utils/app-error')
class FriendRequestService {
    constructor(){
        this.friendRequestRepository = new FriendRequestRepository();
        this.userRepository = new UserRepository();
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