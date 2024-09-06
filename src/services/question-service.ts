import fs from 'fs'
import { AppError } from '../utils/errors';
import csv from 'csv-parser'
import { QuestionRepository } from '../repositories';
import { IQuestion } from '../models/questions-model';

class QuestionService {
    questionRepository: QuestionRepository
    constructor() {
        this.questionRepository = new QuestionRepository();
    }
    getAllQuestion = async (filter: Partial<IQuestion>) => {
        try {
            const response = await this.questionRepository.getAllQues(filter);
            return response;
        } catch (error) {
            console.log("Something went wrong inside Service layer");
            throw new AppError()
        }
    }
    parseCSVData = async (path: string) => {
        try {
            let questionSet: any[] = [];
            await new Promise((resolve, reject) => {
                fs.createReadStream(path)
                    .pipe(csv())
                    .on('data', (ques) => {
                        let topics = ques.topics.split(',');
                        let trimedTopics:string[] = []
                        for(let topic of topics){
                            trimedTopics.push(topic.trim())
                        }
                        ques.topics = trimedTopics;
                        questionSet.push(ques)
                    })
                    .on('end', () => {
                        console.log(questionSet);
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
            const response = await this.questionRepository.create(questionSet);
            return response;
        }
        catch (error: any) {
            if (error.name == "Server Error") throw error
            console.log("Something went wrong inside quetion parsing");
            throw error
        }
    }
}

export default QuestionService