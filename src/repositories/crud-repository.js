const { ClientError, DuplicateError } = require('../utils/index')
const { StatusCodes } = require('http-status-codes');
const ValidationError = require('../utils/validation-error');
class CRUDRepository {
    constructor(model){
        this.model = model;
    }
    create = async(data) => {
        try{
            const response = await this.model.create(data);
            return response;
        }catch(error){
            console.log("Something went wrong inside CRUD Repository");
            if(error._message == 'User validation failed'){
                throw new ValidationError(error);
            }
            if(error.errorResponse.code === 11000){
                throw new DuplicateError(error.errorResponse);
            }
            throw error
        }
    }
    update = async(id, updateData) => {
        try {
            const updatedUser = await this.model.findOneAndUpdate({_id: id}, updateData, {new: true})
            return updatedUser;
        } catch (error) {
            console.log("Something went wrong inside CRUD Repository");
            if(error._message == 'User validation failed'){
                throw new ValidationError(error);
            }
            if(error.errorResponse.code === 11000){
                throw new DuplicateError(error.errorResponse);
            }
            throw error
        }
    }
    getUserByUsername = async(username) => { 
        try {
            const user = await this.model.findOne({username});
            if(!user){
                throw new ClientError(
                    'AttributeNotFound',
                    'Invalid username, Please verify it',
                    'Please check the username, as there is no record of the username',
                    StatusCodes.NOT_FOUND
                )
            }
            return user;
        } catch (error) {
            console.log("Something went wrong inside CRUD Repository");
            throw error
        }
    }
    deleteUserByUsername = async(username) => {
        try {
            const response = await this.model.deleteOne({username});
            if(!response.deletedCound == 0){
                throw new ClientError(
                    'AttributeNotFound',
                    'Invalid username, Please verify it',
                    'Please check the username, as there is no record of the username',
                    StatusCodes.NOT_FOUND
                )
            }
            return response;
        } catch (error) {
            console.log("Something went wrong inside CRUD Repository");
            throw error
        }
    }
    getAllByName = async(name) => {
        try {
            const pattern = '^'+name;
            const users = await this.model.find({ name: { $regex: pattern } });
            if(!users){
                throw new ClientError(
                    'AttributeNotFound',
                    'Invalid name, Please verify it',
                    'Please check the name, as there is no record of the name',
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
module.exports = CRUDRepository