import {ClientError, DuplicateError, ValidationError} from '../utils/errors/index'
import { StatusCodes } from 'http-status-codes';
import { Schema } from 'mongoose';

class CRUDRepository<T> {
    model: T
    constructor(model: T){
        this.model = model;
    }
    create = async(data: any) => {
        try{
            const response = await (this.model as any).create(data);
            return response;
        }catch(error:any){
            console.log("Something went wrong inside CRUD Repository", error._message);
            if(error._message.indexOf('validation failed') != -1){
                throw new ValidationError(error);
            }
            if(error.errorResponse.code === 11000){
                throw new DuplicateError(error.errorResponse);
            }
            throw error
        }
    }
    update = async(id: any, updateData: any) => {
        try {
            const updatedUser = await (this.model as any).findOneAndUpdate(
                {_id: id}, 
                {
                    $addToSet: { friends: updateData }
                }, {new: true})
            return updatedUser;
        } catch (error:any) {
            console.log("Something went wrong inside CRUD Repository");
            if(error._message.indexOf('validation failed') != -1){
                throw new ValidationError(error);
            }
            if(error.errorResponse.code === 11000){
                throw new DuplicateError(error.errorResponse);
            }
            throw error
        }
    }
    getUserByUsername = async(username: string) => { 
        try {
            const user = await (this.model as any).findOne({username}).populate('friends');
            if(!user){
                throw new ClientError(
                    'AttributeNotFound',
                    'Invalid username, Please verify it',
                    ['Please check the username, as there is no record of the username'],
                    StatusCodes.NOT_FOUND
                )
            }
            return user;
        } catch (error) {
            console.log("Something went wrong inside CRUD Repository");
            throw error
        }
    }
    deleteUserByUsername = async(username:string) => {
        try {
            const response:any = await (this.model as any).deleteOne({username});
            if(!response.deletedCound == false){
                throw new ClientError(
                    'AttributeNotFound',
                    'Invalid username, Please verify it',
                    ['Please check the username, as there is no record of the username'],
                    StatusCodes.NOT_FOUND
                )
            }
            return response;
        } catch (error) {
            console.log("Something went wrong inside CRUD Repository");
            throw error
        }
    }

    getUserById = async(id: Schema.Types.ObjectId) => {
        try {
            const user = await (this.model as any).findById(id);
            // console.log(user)
            if(!user){
                throw new ClientError(
                    'AttributeNotFound',
                    'Invalid id, Please verify it',
                    ['Please check the id, as there is no record of the id'],
                    StatusCodes.NOT_FOUND
                )
            }
            return user;
        } catch (error) {
            console.log("Something went wrong inside CRUD Repository");
            throw error
        }
    }

    deleteUserById = async(id:Schema.Types.ObjectId) => {
        try {
            const response = await (this.model as any).deleteOne({_id: id});
            if(!response.deletedCound == false){
                throw new ClientError(
                    'AttributeNotFound',
                    'Invalid id, Please verify it',
                    ['Please check the id, as there is no record of the id'],
                    StatusCodes.NOT_FOUND
                )
            }
            return response;
        } catch (error) {
            console.log("Something went wrong inside CRUD Repository");
            throw error
        }
    }

    getAllByName = async(name:string) => {
        try {
            const pattern = '^'+name;
            const users = await (this.model as any).find({ name: { $regex: pattern } });
            if(!users){
                throw new ClientError(
                    'AttributeNotFound',
                    'Invalid name, Please verify it',
                    ['Please check the name, as there is no record of the name'],
                    StatusCodes.NOT_FOUND
                )
            }
            return users;
        } catch (error) {
            console.log("Something went wrong inside CRUD Repository");
            throw error
        }
    }
}
export default CRUDRepository