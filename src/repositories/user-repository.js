const { User } = require('../models/index');
class UserRepository {
    create = async(userData) => {
        try{
            const {username} = userData;
            // const user = await User.findOne({username});
            // if(user){
            //     throw {
            //         message: "User already registered",
            //     };
            // } else{
                const newUser = await User.create(userData);
                return newUser;
            // }
        }catch(error){
            console.log('Something went wrong inside reposiroy layer');
            throw error;
        }
    }
}

module.exports = UserRepository