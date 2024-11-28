import { StatusCodes } from "http-status-codes";
import { UserService } from './index'
import {AppError, ClientError} from "../utils/errors/index"
import {SALT, JWT_SECRET_KEY} from '../configs/server-config';
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt';
import { IUser } from "../models/user-model";
class AuthService {
    userService: UserService
    constructor(){
        this.userService = new UserService();
    }
    #generateJWTToken = (userData: Partial<IUser>) => {
        try {
            if(JWT_SECRET_KEY ){
                const token = jwt.sign(userData, JWT_SECRET_KEY, {expiresIn: '15m'});
                return token;
            }
        } catch (error) {
            console.log("Something went wrong while generating the token", error);
            throw error
        }
    }
    #validatePassword = (originalPassword:string, hashedPassword:string) => {
        try {
            const isPasswordCorrect = bcrypt.compareSync(originalPassword, hashedPassword);
            return isPasswordCorrect;
        } catch (error) {
            console.log("Something went wrong while validating the password inside service layer", error);
            throw error
        }
    }
    signup = async(userData: Partial<IUser>) => {
        try {
            const newUser = await this.userService.create(userData);
            return newUser;
        } catch (error:any) {
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
                ['Logical issue found'],
                StatusCodes.INTERNAL_SERVER_ERROR
            )
        }
    }

    signin = async(userData: Partial<IUser>) => {
        try {
            const { username, password } = userData;
            if(!username || !password){
                throw new ClientError(
                    'AttributeNotFound',
                    'Missing credentials',
                    ['Please enter email', 'Please enter password'],
                    StatusCodes.BAD_REQUEST
                ) 
            }
            const user = await this.userService.getUserByUsername(username);
            const isPasswordCorrect = this.#validatePassword(password, user.password);
            if(!isPasswordCorrect){
                throw new ClientError(
                    'AttributeNotFound',
                    'Incorrect password',
                    ['Password not matched'],
                    StatusCodes.BAD_REQUEST
                )
            }
            const token = this.#generateJWTToken({username, id: user._id});
            return token;
        } catch (error:any) {
            console.log("Something went wrong inside service layer");
            if(error.message === 'User validation failed'){
                throw error;
            }
            throw error;
        }
    }
}

export default AuthService