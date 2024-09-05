import CRUDRepository from "./crud-repository"
import {Questions} from "../models/index";

class QuestionRepository extends CRUDRepository<typeof Questions> {
    constructor(){
        super(Questions);
    }
}

export default QuestionRepository