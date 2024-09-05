import multer from 'multer'
import fs from 'fs'
import { AppError } from '../utils/errors';
import csv from 'csv-parser'
import { QuestionRepository } from '../repositories';
const questionRepository = new QuestionRepository();
async function parseExcelData(path: string) {
    try {
        const questionSet:any[] = [];
        await new Promise((resolve, reject) => {
            fs.createReadStream(path)
            .pipe(csv())
            .on('data', (ques) => questionSet.push(ques))
            .on('end', () => {
               resolve(questionSet)
            })
            .on('close', () => {
                fs.unlink(path, (err) => {
                  if (err) {
                    console.error('Error deleting file:', err);
                    reject(new AppError())
                  } else {
                    console.log('File deleted successfully');
                  }
                });
              })
            .on('error', () => {
                reject(new AppError())
            })
        })
        const response = await questionRepository.create(questionSet);
        return response;
    }
    catch (error:any) {
        if(error.name == "Server Error") throw error
        console.log("Something went wrong inside quetion parsing");
        throw error
    }
}

export default parseExcelData