import CRUDRepository from "./crud-repository"
import {Questions} from "../models/index";
import { IQuestion } from "../models/questions-model";

class QuestionRepository extends CRUDRepository<typeof Questions> {
    constructor(){
        super(Questions);
    }
    getAllQues = async(filter: Partial<IQuestion>) => {
        try {
            console.log("Filter", filter);
            const response = await Questions.find(filter);
            return response;
        } catch (error) {
            console.log("Something went wrong inside question reposiroy");
            throw error
        }
    }
}

export default QuestionRepository