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

export interface IQuestion {
    title: string;
    questionLink: string;
    topics: string[] | string;
    difficulty: 'Easy' | 'Medium' |'Hard' | 'Undefined'
}