const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: [true, "firstName is required"]
    },
    lastName: {
        type: String,
        required: [true, "LastName is required"]
    },
    profilePhoto: {
        type: String,
    },

    email: {
        type: String,
        required: [true, "Email is not required"]
    },

    password: {
        type: String,
        required: [true, "Password is not required"]
    },
    isBlocked: {
        type: Boolean,
        default: 0,
    },
    isAdmin: {
        type: Boolean,
        default: false,
    },
    role: {
        type: String,
        enum: ["Admin", "Guest", "Editor" ],
    },
    viewers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    }],
    followers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }],
    following: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }],
    
    posts: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "post",
    }],
    blocked: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "post",
        }
    ],
    plan: [
        {
            type : String,
            enum : ['free', 'premium', 'pro'],
            default: 'free',
        }
    ],
    userAward: {
        type : String,
        enum : ['Bronze', 'Silver', 'Gold'],
        default: 'Bronze',
    }
    
},
    {
        timeStamps: true,
    },
);

// compile the post model

const user = mongoose.model("User", userSchema)

module.exports = user