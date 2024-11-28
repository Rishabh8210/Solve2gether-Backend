import CRUDRepository from "./crud-repository"
import {Questions} from "../models/index";
import { IQuestion } from "../models/questions-model";

class QuestionRepository extends CRUDRepository<typeof Questions> {
    constructor(){
        super(Questions);
    }
    getAllQues = async(filter:Partial<IQuestion>) => {
        try {
            const sanitizeFilter = Object.fromEntries(
                Object.entries(filter).filter(([_, value]) => value != undefined && value != null)
            )
            const response = await Questions.find(sanitizeFilter);
            return response;
        } catch (error) {
            console.log("Something went wrong inside question reposiroy");
            throw error
        }
    }
}

export default QuestionRepository