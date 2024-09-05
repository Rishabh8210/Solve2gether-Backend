import {User} from '../models/index';
import {CRUDRepository} from './index';
class UserRepository extends CRUDRepository<typeof User>{
    constructor(){
        super(User); 
    }
}

export default UserRepository