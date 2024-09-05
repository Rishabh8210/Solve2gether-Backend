import dotenv from 'dotenv'
dotenv.config()

export const PORT = process.env.PORT;
export const DBURL = process.env.DBURL;
export const SALT = process.env.SALT;
export const JWT_SECRET_KEY =  process.env.JWT_SECRET_KEY
