import { DuplicateError, AppError } from '../utils/errors/index'
import { UserRepository } from '../repositories/index'
import { StatusCodes } from 'http-status-codes';
import { Schema } from 'mongoose';
import { IUser } from '../models/user-model';
class UserService {
    userRepository: UserRepository
    constructor(){
        this.userRepository = new UserRepository();
    }

    create = async(userData: Partial<IUser>) => {
        try {
            const newUser = await this.userRepository.create(userData);
            const response = {
                name: newUser.name,
                email: newUser.email,
                username: newUser.username,
                friends: newUser.friends,
                streak: newUser.streak,
                isVerified: newUser.isVerified
            }
            return response;
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
    update = async(id: Schema.Types.ObjectId, updateData: Partial<IUser>) => {
        try {
            const userUpdate = await this.userRepository.update(id, updateData);
            return userUpdate;
        } catch (error:any) {
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
                ['Logical issue found'],
                StatusCodes.INTERNAL_SERVER_ERROR
            )
        }
    }
    getUserByUsername = async(username:string) => {
        try {
            const user = await this.userRepository.getUserByUsername(username);
            return user;
        } catch (error:any) {
            console.log("Something went wrong in the service layer");
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
    deleteUserByUsername = async(username:string) => {
        try {
            const user = await this.userRepository.deleteUserByUsername(username);
            return user;
        } catch (error:any) {
            console.log("Something went wrong in the service layer");
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

export default UserService;