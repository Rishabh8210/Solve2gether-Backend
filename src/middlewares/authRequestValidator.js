const {StatusCodes} = require('http-status-codes');
const  validateJWTToken  = require('../utils/errors/validation-error');
const validateUserAuthSignup = (req, res, next) => {
    const {name, email, password, username} = req.body;
    if(!name || !email || !password || !username){
        return res.status(StatusCodes.BAD_REQUEST).json({
            data: {},
            message: 'All mandatory fields are required.',
            status: false,
            err: "mandatory fields are missing in the signup request"
        })
    }
    next();
}

const validateUserAuthSignin = (req, res, next) => {
    const { username, password } = req.body;
    if(!username || !password){
        return res.status(StatusCodes.BAD_REQUEST).json({
            data: {},
            message: 'All mandatory fields are required.',
            status: false,
            err: "mandatory fields are missing in the signin request"
        })
    }
    next();
}

const isAuthenticated = async(req, res, next) => {
    try {
        const token = req.headers['authorization'].split(' ')[1];
        if(!token){
            return res.status(StatusCodes.UNAUTHORIZED).json({
                data: {},
                message: 'No token provided',
                status: false,
                err: "Token not found in the request"
            })
        }
        const userData = validateJWTToken(token);
        req.user = userData;
        next();
    } catch (error) {
        console.log(error)
        return res.status(StatusCodes.UNAUTHORIZED).json({
            data: {}, 
            message: error.message,
            status: false,
            err: error
        })
    }
}

module.exports = {
    validateUserAuthSignup,
    validateUserAuthSignin,
    isAuthenticated
}