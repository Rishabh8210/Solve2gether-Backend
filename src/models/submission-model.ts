import { Schema, model } from 'mongoose'
import { ISubmission } from '../utils/types'

const submissionSchema = new Schema<ISubmission> ({
    submittedBy: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'User id is required'],
    },
    contestId: {
        type: Schema.Types.ObjectId,
        ref: 'Contest',
        required: [true, 'Contest id is required'],
    },
    solvedQues: {
        type: [Schema.Types.ObjectId],
        ref: 'Questions',
        required: [true, 'Contest question solved is required'],
        validate: {
            validator: (v: any[]) => v && v.length > 0,
            message: 'At least one solved question is required',
        },
    },
}, {
    timestamps: true
})

const Submission = model<ISubmission>('Submission', submissionSchema);
export default Submission