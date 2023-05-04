const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Post title is required"],
        trim: true,
    },
    // isBlocked: {
    //     type: Boolean,
    //     default: 0,
    // },
    description: {
        type: String,
        required: [true, "Post description is required"],
        trim: true,
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
        required: [true, "Post category is required"],
    },
    numViews: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
       },
    ],
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Comment",
        },
    ],
    likes: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
    ],
    disLikes: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            },
    ],
    users: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
         required: [true, "Please Author is required"]
    },
    photo: {
        type: String,
        // required: [true, "Post image is required"],
    },
},
    {
        timestamps: true,
        toJSON: { virtuals: true }
    },
);

// Hook
postSchema.pre(/^find/, function(next) {
    // add viewCount as virtual field
    postSchema.virtual("viewsCount").get(function(){
        const post = this;
        return post.numViews.length;
    });
    
    // add likesCount as virtual field
    postSchema.virtual("likesCount").get(function(){
        const post = this;
        return post.likes.length;
    });
    // add disLikes count as virtual field
    postSchema.virtual("disLikesCount").get(function(){
        const post = this;
        return post.disLikes.length;
    });
    
    // check the most likes post in percentage
    postSchema.virtual("likesPercentage").get(function(){
        const post = this;
        const total = +post.likes.length +  +post.disLikes.length
        const percentage = (post.likes.length / total) * 100
        return `${percentage}%`
    });
    
 // check the most dislikes post in percentage
    postSchema.virtual("disLikesPercentage").get(function(){
        const post = this;
        const total = +post.disLikes.length +  +post.disLikes.length
        const percentage = (post.disLikes.length / total) * 100
        return `${percentage}%`
    });   
    // if days is less than 0 return today, if days is 1 return yesterday else return daysago.
    postSchema.virtual("daysAgo").get(function() {
        const post = this;
        const date = new Date(post.createdAt);
        const daysAgo = Math.floor((Date.now() - date) / 86400000)
        return daysAgo === 0 ? "Today"
        : daysAgo === 1 ? "Yesterday"
        :`${daysAgo} days ago`;
    })
 next()
})
// compile the post model

const post = mongoose.model("Post", postSchema)

module.exports = post











