import {Request, Response, NextFunction} from 'express'
import { StatusCodes } from 'http-status-codes';
import {QuestionService} from '../services/';

class QuestionController {
    questionController: QuestionService
    constructor(){
        this.questionController = new QuestionService();
    }
    getAllQues = async(req: Request, res: Response) => {
        try {
            const filter = req.query;
            const response = await this.questionController.getAllQuestion(filter);
            return res.status(StatusCodes.OK).json({
                data: response,
                success: true, 
                message: 'Successfully fetched data as per filer',
                err: {}
            })
        } catch (error: any) {
            return res.status(error.statusCode).json({
                data: {},
                success: false, 
                message: error.message,
                err: error
            })
        }
    }
    parseData = async(req:Request, res:Response) => {
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
            const response = await this.questionController.parseCSVData(path);
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
    
}


export default QuestionController