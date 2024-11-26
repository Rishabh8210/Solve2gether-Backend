import {Document, model, Schema} from 'mongoose'
import { IFriendRequest } from '../utils/types';

const friendRequestSchema = new Schema<IFriendRequest>({
    senderUsername: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    receiverUsername: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    status: {
        type: String,
        enum: ['Pending', 'Accepted'],
        default: 'Pending'
    }
}, {
    timestamps: true
});

const FriendRequest = model<IFriendRequest>('FriendRequest', friendRequestSchema);

export default FriendRequest