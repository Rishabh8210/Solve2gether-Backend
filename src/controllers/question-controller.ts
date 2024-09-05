import {Request, Response, NextFunction} from 'express'
import parseExcelData from '../services/question-service'
import { StatusCodes } from 'http-status-codes';

const parseData = async(req:Request, res:Response) => {
    try {
        const path = req.file?.path;
        console.log(path);
        if(!path){
            return res.status(StatusCodes.NOT_FOUND).json({
                data: {},
                success: false,
                message: 'File path not found',
                err: {error: "File path not found"}
            })
        }
        const response = await parseExcelData(path);
        console.log("Data", response);
        return res.status(StatusCodes.OK).json({
            data: response,
            message: 'Successfully added the data',
            success: true,
            err: {}
        })
    } catch (error: any) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            data: {},
            success: false,
            message: 'File path not found',
            err: error
        })
    }
}

export default parseData