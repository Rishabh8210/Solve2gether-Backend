const { DuplicateError } = require('../utils/index')
const { UserRepository } = require('../repositories/index')
class UserService {
    constructor(){
        this.userReposiory = new UserRepository();
    }

    create = async(userData)=> {
        try {
            const newUser = await this.userReposiory.create(userData);
            return newUser;
        } catch (error) {
            if(error.errorResponse.code == 11000){
                throw new DuplicateError(error.errorResponse)
            }
            throw error
        }
    }
}

module.exports = UserService;