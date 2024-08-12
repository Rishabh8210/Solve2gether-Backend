const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { SALT } = require('../configs/server-config');
const userSchema = mongoose.Schema({
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
        minlength: [6, 'Password must be at least 6 characters long'],
        maxlength: [30, 'Password cannot be more than 30 characters long']
    },
    username: {
        type: String, 
        required: [true, 'A username is required'],
        unique: true,
        trim: true,
        minlength: [6, 'Username must be at least 6 characters long'],
    },
    friends: [{
        type: mongoose.Schema.Types.ObjectId,
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
        type: String
    },
    leetcode: {
        type: String
    },
    codechef: {
        type: String
    },
    codeforces: {
        type: String
    }
}, {
    timestamps: true
})
userSchema.pre('save', async function(next) {
    if (this.isModified('password') || this.isNew) {
        this.password = await bcrypt.hash(this.password, parseInt(SALT));
    }
    next();
});

const User = mongoose.model('User', userSchema);
module.exports = User