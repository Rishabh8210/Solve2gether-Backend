const {FriendRequest} = require('../models/index');
const CRUDRepository = require('./crud-repository');
class FriendRequestRepository extends CRUDRepository{
    constructor(){
        super(FriendRequest);
    }
    update = async(id, updateData) => {
        try {
            const updatedUser = await this.model.findOneAndUpdate({receiverUsername: id}, updateData, {new: true})
            return updatedUser;
        } catch (error) {
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
    getUser = async(senderUsername, receiverUsername) => {
        try {
            const response = await this.model.findOne({ senderUsername, receiverUsername});
            return response
        } catch (error) {
            console.log("Something went wrong inside repository layer");
            throw error
        }
    }
}
module.exports = FriendRequestRepository;