import { Schema, model } from "mongoose";
import { IContest } from '../utils/types'
import Questions from "./questions-model";

const contestSchema = new Schema<IContest>({
    name: {
        type: Schema.Types.String,
        required: [true, 'Name is required'],
    },
    questions: {
        type: [Schema.Types.ObjectId],
        ref: Questions,
        required: [true, 'Question for contest is required']
    },
    duration: {
        type: Schema.Types.Number,
        required: [true, 'Contest duration is required']
    }
},{
    timestamps: true
})

const Contest = model<IContest>('contestSchema', contestSchema);
export default Contest