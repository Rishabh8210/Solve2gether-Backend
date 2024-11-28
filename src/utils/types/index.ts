import { Schema, Document } from "mongoose";

export interface IUser extends Document{
    name: string, 
    email: string,
    password: string,
    username: string,
    friends: Schema.Types.ObjectId[],
    streak: number,
    isVerified: boolean,
    profilePic?: string,
    leetcode?: string,
    codechef?: string,
    codeforces?: string
}

export interface IFriendRequest extends Document {
    senderUsername: Schema.Types.ObjectId,
    receiverUsername: Schema.Types.ObjectId,
    status: string,
    createdAt: Date,
    updatedAt: Date,
}

export interface IQuestion extends Document {
    title: string;
    questionLink: string;
    topics: string[] | string;
    difficulty: 'Easy' | 'Medium' |'Hard' | 'Undefined'
}

export interface IContest extends Document {
    name: string
    numOfQues: Number
    questions: Schema.Types.ObjectId[]
    duration: Number,
    createdBy: Schema.Types.ObjectId
}

export interface ISubmission extends Document {
    submittedBy: Schema.Types.ObjectId,
    contestId: Schema.Types.ObjectId,
    solvedQues: Schema.Types.ObjectId[],
}
