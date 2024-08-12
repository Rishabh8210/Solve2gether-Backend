const { User } = require('../models/index');
class UserRepository {
    create = async(userData) => {
        try{
            const newUser = await User.create(userData);
            return newUser;
        }catch(error){
            console.log('Something went wrong inside reposiroy layer');
            throw error;
        }
    }
}

module.exports = UserRepository