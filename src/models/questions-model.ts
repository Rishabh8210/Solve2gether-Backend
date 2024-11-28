import { Document, model, Schema } from "mongoose";
import { IQuestion } from '../utils/types'

const questionSchema = new Schema<IQuestion>({
    title: {
        type: String,
        required: [true, 'Title is required']
    },
    questionLink: {
        type: String,
        required: [true, 'Question link is required']
    },
    topics: {
        type: [String],
        default: ['Undefined']
    },
    difficulty: {
        type: String,
        enum: ['Easy', 'Medium', 'Hard', 'Undefined'],
        required: true
    }
}, {
    timestamps: true
})

const Question = model<IQuestion>('questionSchema', questionSchema);

export default Question