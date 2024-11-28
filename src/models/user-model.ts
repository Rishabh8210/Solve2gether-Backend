import { Document, model, Schema } from "mongoose";
import bcrypt from 'bcrypt'
import { SALT } from '../configs/server-config';

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

const userSchema = new Schema<IUser>({
    name: {
        type: String,
        required: [true, 'A name is required'],
        trim: true
    },
    email: {
        type: String,
        required: [true, 'A email is required'],
        trim : true,
        unique: true,
        match: [/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/, "Please fill a valid email address"]
    },
    password: {
        type: String,
        required: [true, 'A password is required'],
    },
    username: {
        type: String, 
        required: [true, 'A username is required'],
        unique: true,
        trim: true,
        minlength: [6, 'Username must be at least 6 characters long'],
    },
    friends: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }],
    streak: {
        type: Number,
        default: 0
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    profilePic: {
        type: String,
        validate: {
            validator: (v: string) => {
                return (
                    !v || /^https?:\/\/(.*)$/.test(v)
                );
            },
            message: "Profile picture must be a valid URL",
        },
    },
    leetcode: {
        type: String,
        validate: {
            validator: (v: string) => {
                return (
                    !v || /^https?:\/\/(.*)$/.test(v)
                );
            },
            message: "LeetCode profile must be a valid URL",
        },
    },
    codechef: {
        type: String,
        validate: {
            validator: (v: string) => {
                return (
                    !v || /^https?:\/\/(.*)$/.test(v) 
                );
            },
            message: "CodeChef profile must be a valid URL",
        },
    },
    codeforces: {
        type: String,
        validate: {
            validator: (v: string) => {
                return (
                    !v || /^https?:\/\/(.*)$/.test(v) 
                );
            },
            message: "Codeforces profile must be a valid URL",
        },
    }
}, {
    timestamps: true
})
userSchema.pre('save', async function(next) {
    if ((this.isModified('password') || this.isNew) && SALT) {
        try {
            this.password = await bcrypt.hash(this.password, parseInt(SALT));
        } catch (error) {
            console.log(error);
        }
    }
    next();
});

const User = model<IUser>('User', userSchema);
export default User