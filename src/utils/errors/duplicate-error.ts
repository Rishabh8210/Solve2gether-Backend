import AppError from './app-error';
import {StatusCodes} from 'http-status-codes';

export interface IServerError{
    keyPattern: { [key: string]: any},
    errmsg: string
}

class DuplicateError extends AppError{
    constructor(error: IServerError){
        
        const { keyPattern} = error;
        let keys = Object.keys(keyPattern);

        let explanations:string[] = [];
        keys.forEach((key) => {
            explanations.push(`${key} is already exists`);
        })
        
        let name = 'MongoServerError: E11000';
        let message = error.errmsg
        super(name,message, explanations, StatusCodes.BAD_REQUEST);
    }
}

export default DuplicateError;