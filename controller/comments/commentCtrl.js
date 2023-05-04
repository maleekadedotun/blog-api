const Comment = require("../../model/Comment/comment");
const Post = require("../../model/Post/post");
const User = require("../../model/User/user");
const{ appErr, AppErr} = require("../../utilis/appError");


// Create 
const commentCreateCtrl = async(req, res, next) =>{
    const {description} = req.body;
    try {
        // find the post
        const post = await Post.findById(req.params.id);
        // create comment
        const comment = await Comment.create({
            post : post._id,
            description,
            user: req.userAuth,            
        })
        //find the user
        const user = await User.findById(req.userAuth);
        //push the comment to post
        post.comments.push(comment);
        //push the user to post
        user.comments.push(comment);
        // save 
           await post.save(); 
           await user.save();     

        res.json({
            status: "Success",
            data: comment,
        });
    }
    catch (error){
        next(appErr(error.message));
    }
};



//Update
const commentUpdateCtrl = async(req, res, next) =>{
    const {description} = req.body;
    try {

        const comment = await Comment.findById(req.params.id)
        // check if the post belong to the user

        if(comment.user.toString() !== req.userAuth.toString()){
            return next(appErr("You are not allow to update this comment."))            
        }
        const comments = await Comment.findByIdAndUpdate(
            req.params.id,
            {description},
            {new: true, runValidators: true,}
        )
        res.json({
            status: "Success",
            data: comments,
        });
    }
    catch (error){
        next(appErr(error.message));
    }
}; 

// delete
const deleteCommentCtrl = async(req, res, next) =>{
    try {
        const comment = await Comment.findById(req.params.id)
        // check if the post belong to the user

        if(comment.user.toString() !== req.userAuth.toString()){
            return next(appErr("You are not allow to update this comment."))            
        }
        await Comment.findByIdAndDelete(req.params.id)
        
        res.json({
            status: "Success",
            data: "Comment has been deleted successfully"
        });
    }
    catch (error){
        next(appErr(error.message));
    }
}


module.exports = {
    commentCreateCtrl,
    deleteCommentCtrl,
    // commnetDeleteCtrl,
    commentUpdateCtrl,
}