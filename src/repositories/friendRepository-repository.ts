import {FriendRequest} from '../models/index';
import { Document, Schema, Model } from 'mongoose';
import CRUDRepository from './crud-repository';
import { ValidationError, DuplicateError } from '../utils/errors';

class FriendRequestRepository extends CRUDRepository<typeof FriendRequest>{
    constructor(){
        super(FriendRequest);
    }
    update = async(id: Schema.Types.ObjectId, updateData: any) => {
        try {
            const updatedUser = await this.model.findOneAndUpdate({receiverUsername: id}, updateData, {new: true})
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
    getUser = async(senderUsername: Schema.Types.ObjectId, receiverUsername: Schema.Types.ObjectId) => {
        try {
            const response = await (this.model as any).findOne({ senderUsername, receiverUsername});
            return response
        } catch (error) {
            console.log("Something went wrong inside repository layer");
            throw error
        }
    }
}
export default FriendRequestRepository;