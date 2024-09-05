import { Document, model, Schema } from "mongoose";

export interface IQuestion {
    title: string,
    questionLink: string
}

const questionSchema = new Schema<IQuestion>({
    title: {
        type: Schema.Types.String,
        required: [true, 'Title is required']
    },
    questionLink: {
        type: Schema.Types.String,
        required: [true, 'Question link is required']
    }
}, {
    timestamps: true
})

const Questions = model<IQuestion>('Questions', questionSchema);

export default Questions