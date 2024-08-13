const { StatusCodes } = require("http-status-codes");
const { UserRepository } = require("../repositories");
const AppError = require("../utils/app-error");
const {SALT, JWT_SECRET_KEY} = require('../configs/server-config');
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt');
const ClientError = require("../utils/client-error");
class AuthService {
    constructor(){
        this.userRepository = new UserRepository();
    }
    #generateJWTToken = (userData) => {
        try {
            const token = jwt.sign(userData, JWT_SECRET_KEY, {expiresIn: '15m'});
            return token;
        } catch (error) {
            console.log("Something went wrong while generating the token", error);
            throw error
        }
    }
    #validatePassword = (originalPassword, hashedPassword) => {
        try {
            const isPasswordCorrect = bcrypt.compareSync(originalPassword, hashedPassword);
            return isPasswordCorrect;
        } catch (error) {
            console.log("Something went wrong while validating the password inside service layer", error);
            throw error
        }
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

    signin = async(userData) => {
        try {
            const { username, password } = userData;
            const user = await this.userRepository.getUserByUsername(username);
            const isPasswordCorrect = this.#validatePassword(password, user.password);
            if(!isPasswordCorrect){
                throw new ClientError(
                    'AttributeNotFound',
                    'Incorrect password',
                    'Password not matched',
                    StatusCodes.BAD_REQUEST
                )
            }
            const token = this.#generateJWTToken({username, id: user._id});
            return token;
        } catch (error) {
            console.log("Something went wrong inside service layer");
            if(error.message === 'User validation failed'){
                throw error;
            }
            throw error;
        }
    }
}

module.exports = AuthService