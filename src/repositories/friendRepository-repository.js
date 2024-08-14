const {FriendRequest} = require('../models/index');
const CRUDRepository = require('./crud-repository');
class FriendRequestRepository extends CRUDRepository{
    constructor(){
        super(FriendRequest);
    }

}
module.exports = FriendRequestRepository;