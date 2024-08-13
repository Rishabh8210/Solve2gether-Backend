const jwt = require('jsonwebtoken');
const { JWT_SECRET_KEY } = require('../configs/server-config');
const ClientError = require('./client-error');
const { StatusCodes } = require('http-status-codes');

function validateJWTToken(token){
    try {
        const isTokenValid = jwt.verify(token, JWT_SECRET_KEY);
        return isTokenValid;
    } catch (error) {
        console.log("Something went wrong while validating the token", error);
        if(error.name == 'TokenExpiredError' || error.name == 'JsonWebTokenError'){
            throw new ClientError(
                error.name,
                'Please sigin again.',
                `${error.name}. Please signin again.`,
                StatusCodes.UNAUTHORIZED
            )
        }
        throw error
    }
}

module.exports = {
    validateJWTToken
}