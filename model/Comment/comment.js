const mongoose = require("mongoose");

const commentSchema = new comment.Schema(
    {
        post: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Post",
            required: [true, "Post is required"],
        },
        user: {
            type: Object,
            required: [true, "User is required"],
        },
        description: {
            type: Object,
            required: [true, "Comment description is required"],
        },

    },
    {timeStamps: true}
);

const comment = mongoose.model("Comment",commentSchema);

module.exports = comment