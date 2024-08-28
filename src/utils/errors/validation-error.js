const { StatusCodes } = require('http-status-codes');
const {AppError} = require('../index.js');

class ValidationError extends AppError{
    constructor(error){
        let keys = Object.keys(error.errors);
        let explanations = [];
        keys.forEach(key => {
            explanations.push(error.errors[key].properties.message)
        })

        let name = 'ValidatorError';
        let message = error._message;
        super(name, message, explanations, StatusCodes.BAD_REQUEST);
    }
}

module.exports = ValidationError