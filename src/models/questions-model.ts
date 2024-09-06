import { Document, model, Schema } from "mongoose";

export interface IQuestion {
    title: string;
    questionLink: string;
    topics: string[];
    difficulty: 'Easy' | 'Medium' |'Hard'
}

const questionSchema = new Schema<IQuestion>({
    title: {
        type: Schema.Types.String,
        required: [true, 'Title is required']
    },
    questionLink: {
        type: Schema.Types.String,
        required: [true, 'Question link is required']
    },
    topics: {
        type: [Schema.Types.String],
        required: true
    },
    difficulty: {
        type: Schema.Types.String,
        enum: ['Easy', 'Medium', 'Hard'],
        required: true
    }
}, {
    timestamps: true
})

const Questions = model<IQuestion>('Questions', questionSchema);

export default Questions