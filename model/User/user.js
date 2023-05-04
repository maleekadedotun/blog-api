const mongoose = require("mongoose");
const Post = require("../Post/post");


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
        required: [true, "Password is required"]
    },
    isBlocked: {
        type: Boolean,
        default: false,
    },
    isAdmin: {
        type: Boolean,
        default: false,
    },
    role: {
        type: String,
        enum: ["Admin", "Guest", "Editor" ],
    },
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Comment",
        },
    ],
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
        ref: "Post",
    }],
    blocked: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "post",
        }
    ],
    // plan: 
    //     {
    //         type : String,
    //         enum : ['free', 'premium', 'pro'],
    //         default: 'free',
    //     },
        
    userAward: {
        type : String,
        enum : ['Bronze', 'Silver', 'Gold'],
        default: 'Bronze',
    }
    
},
    {
        timestamps: true,
        toJSON: {virtuals: true},
    },
);
// hooks
// pre- before record is saved
userSchema.pre('findOne',async function (next){
    // poulate the posts
    this.populate({
        path: "posts",
    })
    // get the user id
    const userId = this._conditions._id
    // find the post created by the user
    const posts = await Post.find({users: userId})
    // find the last post created by the user
    const lastPost = posts[posts.length -1]
    const lastPostDate = new Date(lastPost?.createdAt);
    const lastPostDateStr = lastPostDate.toDateString();
    userSchema.virtual("lastPostDate").get(function () {
        return lastPostDateStr
    })
    // console.log(lastPostDateStr);
    // get current date
    const currentDate = new Date();
    // check the difference between the currentDate and lastPostDate
    const diff  = currentDate - lastPostDate
    // get the difference in days and return less than in days
    const diffInDays = diff / (1000 * 3600 * 24)
    if(diffInDays > 30){
        // Add virtual isInactive to the schema to check if the user in inactive for 30 days.
        userSchema.virtual("isInActive").get(function () {
            return true
        });
        // find the user by ID and update
        await User.findByIdAndUpdate(
            userId, 
            {
             isBlocked: true
           },
            {
                new: true,
            }
        );

    }
    else{
        userSchema.virtual("isInActive").get(function () {
            return false
        });
        // find the user by ID and update
        await User.findByIdAndUpdate(userId, {
            isBlocked: false
        },
        {
            new: true,
        }
        );
        
    }
    const daysAgo = Math.floor(diffInDays)
    // Add virtual lastActive to the user schema
    userSchema.virtual("lastActive").get(function() {
        // check if last active is less than zero
        if(daysAgo <= 0){
            return "Today"
        }
        // check if last active is equal to one

        if(daysAgo === 1) {
            return "Yesterday"
        }
        // check if last active is greater to one

        if(daysAgo > 1) {
            return `${daysAgo} days Ago`
        }
        
    })
    const numberOfPosts = posts.length;
    // check if the number of post is less than 10
    await User.findByIdAndUpdate(userId, {
        
        userAward : "Bronze"  
    },
    {
        new: true,
    });
     // check if the number of post is less than 10
   if(numberOfPosts < 10){
        await User.findByIdAndUpdate(userId, {
            
            userAward : "Bronze"  
        },
        {
            new: true,
        });
    }
      // check if the number of post is greater than 10
   if(numberOfPosts > 10){
        await User.findByIdAndUpdate(userId, {
            
            userAward : "Silver"  
        },
        {
            new: true,
        }
        );
       // check if the number of post is greater than 20
       if(numberOfPosts > 20){
            await User.findByIdAndUpdate(userId, 
                {
                
                userAward : "Gold"  
                },
                {
                    new: true,
                }
            );
        }
    }
    next()
});
// post- after saving record
// userSchema.post('save', function (next){
//     console.log("post hook called");
//  });
// Get fullname
userSchema.virtual("fullName")
  .get(function () {
    return `${this.firstName} ${this.lastName}`
   }
);

// Get initial
userSchema.virtual("initials")
  .get(function () {
    return `${this.firstName[0]}${this.lastName[0]}`
   }
);

// Get postCount
userSchema.virtual("postCount")
  .get(function () {
    return this.posts.length
   }
);
// Get followers count
userSchema.virtual("followersCount")
  .get(function () {
    return this.followers.length;
   }
);
// Get following count
userSchema.virtual("followingCount")
  .get(function () {
    return this.following.length;
   }
);
// Get viewers count
userSchema.virtual("viewersCount")
  .get(function () {
    return this.viewers.length;
   }
);
// Get blocked count
userSchema.virtual("blockedCount")
  .get(function () {
    return this.blocked.length;
   }
);

// compile the post model

const User = mongoose.model("User", userSchema)

module.exports = User