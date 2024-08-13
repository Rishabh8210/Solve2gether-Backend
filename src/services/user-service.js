const { DuplicateError, AppError } = require('../utils/index')
const { UserRepository } = require('../repositories/index')
const { StatusCodes } = require('http-status-codes');
class UserService {
    constructor(){
        this.userRepository = new UserRepository();
    }

    create = async(userData) => {
        try {
            const newUser = await this.userRepository.create(userData);
            return newUser;
        } catch (error) {
            console.log("Something went wrong inside service layer");
            if(error.message === 'User validation failed'){
                throw error;
            }
            if(error.name === 'MongoServerError: E11000'){
                throw error;
            }
            throw new AppError(
                'ServerError',
                'Something went wrong, Please try again',
                'Logical issue found',
                StatusCodes.INTERNAL_SERVER_ERROR
            )
        }
    }
    update = async(id, updateData) => {
        try {
            const userUpdate = await this.userRepository.update(id, updateData);
            return userUpdate;
        } catch (error) {
            console.log("Something went wrrong inside service layer");
            if(error.message === 'User validation failed'){
                throw error;
            }
            if(error.name === 'MongoServerError: E11000'){
                throw error;
            }
            throw new AppError(
                'ServerError',
                'Something went wrong, Please try again',
                'Logical issue found',
                StatusCodes.INTERNAL_SERVER_ERROR
            )
        }
    }
    getUserByUsername = async(username) => {
        try {
            const user = await this.userRepository.getUserByUsername(username);
            return user;
        } catch (error) {
            console.log("Something went wrong in the service layer");
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
    deleteUserByUsername = async(username) => {
        try {
            const user = await this.userRepository.deleteUserByUsername(username);
            return user;
        } catch (error) {
            console.log("Something went wrong in the service layer");
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

module.exports = UserService;