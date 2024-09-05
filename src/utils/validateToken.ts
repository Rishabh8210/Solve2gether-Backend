import jwt from 'jsonwebtoken';
import { JWT_SECRET_KEY } from '../configs/server-config';
import {ClientError} from './errors/index';
import { StatusCodes } from 'http-status-codes';

export function validateJWTToken(token:string){
    try {
        if(JWT_SECRET_KEY){
            const isTokenValid = jwt.verify(token, JWT_SECRET_KEY);
            return isTokenValid;
        }
    } catch (error:any) {
        // console.log("Something went wrong while validating the token", error);
        if(error.name == 'TokenExpiredError' || error.name == 'JsonWebTokenError'){
            // console.log(error.name);
            throw new ClientError(
                error.name,
                'Please sigin again.',
                [`${error.name}. Please signin again.`],
                StatusCodes.UNAUTHORIZED
            )
        }else{
            throw error
        }
    }
}
