const {StatusCodes} = require('http-status-codes');
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

module.exports = {
    validateUserAuthSignup,
    validateUserAuthSignin
}