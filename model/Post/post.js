const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Post Title is required"],
        trim: true,
    },
    description: {
        type: String,
        required: [true, "Post description is required"],
        trim: true,
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
        required: [true, "Post description is required"],
    },
    numViews: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    likes: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    disLikes: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    users: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: [true, "Please author is required"]
    },
    photo: {
        type: String,
        required: [true, "Post image is required"],
    },
},
    {
        timeStamps: true,
    },
);

// compile the post model

const post = mongoose.model("Post", postSchema)

module.exports = post











