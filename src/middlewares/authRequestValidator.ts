import {StatusCodes} from 'http-status-codes';
import  {validateJWTToken} from '../utils/validateToken';
import { Request, Response, NextFunction } from 'express';

import { Schema } from 'mongoose';

export interface CustomRequest extends Request{
    // [key:string]:any 
    headers: {
        authorization?:string,
        username?: string,
        id?: Schema.Types.ObjectId,
        [key:string]:any 
    }
}


export const validateUserAuthSignup = (req:Request, res:Response, next:NextFunction) => {
    const{name, email, password, username} = req.body;
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

export const validateUserAuthSignin = (req:Request, res:Response, next:NextFunction) => {
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

export const isAuthenticated = async(req:CustomRequest, res:Response, next:NextFunction) => {
    try {
        if(req.headers['authorization']){
            const token = req.headers['authorization'].split(' ')[1];
            if(!token){
                 res.status(StatusCodes.UNAUTHORIZED).json({
                    data: {},
                    message: 'No token provided',
                    status: false,
                    err: "Token not found in the request"
                })
            }
            const userData = validateJWTToken(token);
            req.headers["user"] = userData;
            next();
        } else{
            res.status(StatusCodes.UNAUTHORIZED).json({
                data: {},
                message: 'No token provided',
                status: false,
                err: "Token not found in the request"
            })
        }
    } catch (error:any) {
         res.status(StatusCodes.UNAUTHORIZED).json({
            data: {}, 
            message: error.message,
            status: false,
            err: error
        })
    }
}
