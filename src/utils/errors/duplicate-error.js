const AppError = require('./app-error');
const {StatusCodes} = require('http-status-codes');
class DuplicateError extends AppError{
    constructor(error){
        
        const { keyPattern } = error;
        let keys = Object.keys(keyPattern);

        let explanations = []
        keys.forEach((key) => {
            explanations.push(`${key} is already exists`);
        })
        
        let name = 'MongoServerError: E11000';
        let explanation = error.errmsg
        super(name,`${keys[0]} is already exists`, explanation, StatusCodes.BAD_REQUEST);
    }
}

module.exports = DuplicateError;