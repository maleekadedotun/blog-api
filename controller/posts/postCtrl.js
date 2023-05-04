const Post = require("../../model/Post/post");
const User = require("../../model/User/user");
const{ appErr, AppErr} = require("../../utilis/appError");


// Create
const postCreateCtrl = async(req, res, next) =>{
    const { title, description, category } = req.body;
    try {
        // find the user
        const author = await User.findById(req.userAuth) ;
        // check if the user is blocked
        if(author.isBlocked){
        return next(appErr("Access denied, account has been blocked"))
        }
        
        
        // Create the post
        const postCreated = await Post.create({
            title,
            description,
            users: author._id,
            category,
            photo: req?.file?.path,
        });
        
        // associate user to post -push the post into the user post field
        author.posts.push(postCreated)
        await author.save();
        res.json({
            status: "Success",
            data: postCreated,
        });
    }
    catch (error){
        next(appErr(error.message));
    }
};

// ToggleLikes
const postToggleLikesCtrl = async(req, res, next) =>{
    try {
        // Get the post
        const post = await Post.findById(req.params.id);
        // check if user have already like the post
        const isLiked = post.likes.includes(req.userAuth);
        // if the the user has already like the post, unlike the post
        if(isLiked){
            post.likes = post.likes.filter(like => like.toString() !== req.userAuth.toString())
            await post.save()
        }
        else{
            post.likes.push(req.userAuth);
            await post.save()
        }
        console.log(isLiked);
        res.json({
            status: "Success",
            data:  post,
        });
    }
    catch (error){
        next(appErr(error.message));
    }
};

// ToggledisLikes
const postToggledisLikesCtrl = async(req, res, next) =>{
    try {
        // Get the post
        const post = await Post.findById(req.params.id);
        // check if user have already Unlike the post
        const unLiked = post.disLikes.includes(req.userAuth);
        // if the the user has already like the post, unlike the post
        if(unLiked){
            post.disLikes = post.disLikes.filter(disLike => disLike.toString() !== req.userAuth.toString())
            await post.save()
        }
        else{
            post.disLikes.push(req.userAuth);
            await post.save()
        }
        // console.log(unLiked);
        res.json({
            status: "Success",
            data:  post,
        });
    }
    catch (error){
        next(appErr(error.message));
    }
};

// Single
const postSingleCtrl = async(req, res, next) =>{
    try {
        // find the post
        const post = await Post.findById(req.params.id)
        // number of view
        // check if user view the post
        const isViewed = post.numViews.includes(req.userAuth)
        if(isViewed) {
             
            res.json({
                status: "Success",
                data: post,
            });
        }
        else{

            // push 
            post.numViews.push(req.userAuth)
            // Save
            await post.save();
            
            res.json({
                status: "Success",
                data: post,
            });
        }
    }
    catch (error){
        next(appErr(error.message));
    }
};

// All 
const fetchPostAllCtrl =async(req, res, next) =>{
    try {
        const posts = await Post.find({})
        .populate("users")
        .populate( "category", "title");

        // check if user is blocked by the post owner 
        const filtered = posts.filter(post => {
            const blockedUsers = post.users.blocked;
            const isBlocked = blockedUsers.includes(req.userAuth);
            // console.log(isBlocked);

            // return isBlocked ? null : post;
            return !isBlocked;
        }) 
        res.json({
            status: "Success",
            data: filtered,
        });
    }
    catch (error){
        next(appErr(error.message));
    }
};

// Delete
const postDeleteCtrl = async(req, res, next) =>{
    try {
        // check if the post belong to the user
        // find the post
        const post = await Post.findById(req.params.id)
        if(post.users.toString() !== req.userAuth.toString()){
            return next(appErr("You are not allow to delete this post."))            
        }
        await Post.findByIdAndDelete(req.userAuth)
        res.json({
            status: "Success",
            data: "Post deleted successfully"
        });
    }
    catch (error){
        next(appErr(error.message));
    }
};

// Update
const postUpdateCtrl = async(req, res, next) =>{
    const {title, description, category} = req.body;
    try {
        // find the post
        const post = await Post.findById(req.params.id)
        // check if the post belong to the user

        if(post.users.toString() !== req.userAuth.toString()){
            return next(appErr("You are not allow to update this post."))            
        }
        await Post.findByIdAndUpdate(
            req.params.id,
           {
                title,
                description,
                category,
                photo: req?.file?.path,
           },
          {
            new: true,
             runValidators: true,
          }
        );
        res.json({
            status: "Success",
            data: post,
        });
    }
    catch (error){
        next(appErr(error.message));
    }
};

module.exports = {
    postCreateCtrl,
    postSingleCtrl,
    fetchPostAllCtrl,
    postDeleteCtrl,
    postUpdateCtrl,
    postToggleLikesCtrl,
    postToggledisLikesCtrl,
}