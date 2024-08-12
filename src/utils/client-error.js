const AppError = require('./app-error')
class ClientError extends AppError{
    constructor(name, message, explanation, statusCode){
        super(name, message, explanation, statusCode);
    }
}

module.exports = ClientError