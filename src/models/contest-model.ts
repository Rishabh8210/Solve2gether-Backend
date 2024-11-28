import { Schema, model } from "mongoose";
// import { IContest } from '../utils/types'

export interface IContest {
    name: string
    numOfQues: Number
    questions: Schema.Types.ObjectId[]
    duration: Number,
}

const contestSchema = new Schema<IContest>({
    name: {
        type: String,
        required: [true, 'Name is required'],
    },
    questions: {
        type: [Schema.Types.ObjectId],
        ref: 'Questions',
        required: [true, 'Question for contest is required']
    },
    duration: {
        type: Number,
        required: [true, 'Contest duration is required']
    }
},{
    timestamps: true
})

const Contest = model<IContest>('contestSchema', contestSchema);
export default Contest