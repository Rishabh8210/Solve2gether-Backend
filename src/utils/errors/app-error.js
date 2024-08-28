const { StatusCodes } = require('http-status-codes')
class AppError extends Error{
    constructor(name = 'Server Error', message='Something went wrong, please try again later !', explanation = 'Something went wrong, please try again later !', statusCode = StatusCodes.INTERNAL_SERVER_ERROR){
        super();
        this.name = name;
        this.message = message;
        this.explanation = explanation;
        this.statusCode = statusCode;
    }
}

module.exports = AppError