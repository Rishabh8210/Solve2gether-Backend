const { StatusCodes } = require("http-status-codes");
const { UserRepository } = require("../repositories");
const AppError = require("../utils/app-error");

class AuthService {
    constructor(){
        this.userRepository = new UserRepository();
    }
    signup = async(userData) => {
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
}

module.exports = AuthService