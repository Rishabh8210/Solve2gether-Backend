import { StatusCodes } from "http-status-codes";
import {AppError} from './index.js';

export interface IValidationError{
    errors: {[key:string]: any},
    _message: string
}
class ValidationError extends AppError{
    constructor(error: IValidationError){
        let keys = Object.keys(error.errors);
        let explanations:string[] = [];
        keys.forEach(key => {
            explanations.push(error.errors[key].properties.message)
        })

        let name = 'ValidatorError';
        let message = error._message;
        super(name, message, explanations, StatusCodes.BAD_REQUEST);
    }
}

export default ValidationError