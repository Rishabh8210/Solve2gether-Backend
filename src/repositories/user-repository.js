const { User } = require('../models/index');
const CRUDRepository = require('./crud-repository');
class UserRepository extends CRUDRepository{
    constructor(){
        super(User); 
    }
}

module.exports = UserRepository