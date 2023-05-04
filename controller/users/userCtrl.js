const  User  = require("../../model/User/user");
const bcrypt = require("bcryptjs");
const generateToken = require("../../utilis/generateToken");
const generateFromHeader = require("../../utilis/generateTokenFromHeader");
const{ appErr, AppErr} = require("../../utilis/appError");
const Comment = require("../../model/Comment/comment");
const Category = require("../../model/Category/category");
const Post = require("../../model/Post/post");




// register
const userRegisterCtrl = async(req, res, next) =>{
    // console.log(req.body);
    const {firstName, lastName, email, password} = req.body;
    try {
        // Check if email exists.
        const userFound = await User.findOne({email})
        if(userFound) {
            return next(new AppErr("Email Already Exist"));
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt)


        // Create the user
        const user = await User.create({
            firstName,
            lastName,
            email,
            password: hashPassword
        })
        // console.log(user);
        res.json({
            status: "Success",
            data: user,
        });
    }
    catch (error){
        next(new AppErr(error.message));
    }
};
// Login
const userLoginCtrl =  async(req, res, next) =>{
    const {email, password} = req.body;
    
    try {
       // Check Email
       const userGmail = await User.findOne({email});
       if(!userGmail) {
            return next(appErr("Invalid login Credentials"))
       }
          

       // Verify Password
        //  const isPasswordValid = await User.compare(password);
        const isPassWordMatched = await bcrypt.compare(password, userGmail.password);
        if(!userGmail || !isPassWordMatched) {
            return next(appErr("Invalid login Credentials"))
        }
    //    if(!userGmail)
    //         return res.json({
    //             msg: "Invalid Credentials"
    //         })
    //    };

    //    // password Validation
    //    const userPassword = await User.findOne({password});
    //    if(!userPassword){
    //         return res.json({
    //             msg: "Invalid Credentials"
    //         })
    //    }
        res.json({
            status: "Success",
            data: {
                firstName: userGmail.firstName,
                lastName: userGmail.lastName,
                email: userGmail.email,
                isAdmin: userGmail.isAdmin,
                token: generateToken(userGmail._id)
            }
        });
    }
    catch (error){
        next(appErr(error.message));
    }
};

// All
const userCtrl = async(req, res, next) =>{
    try {
        const users = await User.find()
        res.json({
            status: "Success",
            data: users,
        });
        // console.log(users);
    }
    catch (error){
        next(appErr(error.message));
    }
};

// profile
const usersprofileCtrl =  async(req,res) =>{
    // console.log(req.userAuth)
    try {
        // get token from header
       const token =  generateFromHeader(req);
    //   console.log(token)
        const user = await User.findById(req.userAuth)
        res.json({
            status: "Success",
            data: user,
        });
    }
    catch (error){
        res.json(error.message);
    }
}; 

// Single
const singleUserCtrl = async(req,res) =>{
    try {
        res.json({
            status: "Success",
            data: "Single User route"
        });
    }
    catch (error){
        res.json(error.message);
    }
};

// Update
const userUpdateCtrl =  async(req, res, next) =>{
    const {email, firstName, lastName} = req.body;
    try {
        // check if email is not taken

        if(email){
            const emailTaken = await User.findOne({email});
            if(emailTaken) {
                return next(appErr("Email already taken"))
            }
        }

        // update the user
        const user = await User.findByIdAndUpdate(req.userAuth, 
            {
                firstName,
                lastName,
                email,
            },
            {
                new: true,
                runValidators: true,
            }
        )
        res.json({
            status: "Success",
            data: user,
        });
    }
    catch (error){
        next(appErr(error.message));
    }
};

// Update password
const updatePasswordCtrl =  async(req, res, next) =>{
    const {password} = req.body;
    try {
        // check if the user is updating password
        if(password) {
            const salt = await bcrypt.genSalt(10);
         const hashPassword = await bcrypt.hash(password, salt) 
         // update user
         const user = await User.findByIdAndUpdate(req.userAuth,{
           password: hashPassword            
         },
            {
                new: true,
                runValidators: true,
            }         
         );
         res.json({
             status: "Success",
             data: "Password has been changed Successfully",
         });
        }
     else{
         return next(appErr("please provide password field",))
       }
    }
   
    catch (error){
        next(appErr(error.message));
    }
};

// Blocked
const blockedCtrl = async(req, res, next) =>{
    try {
        // find the user to block
        const userToBlocked = await User.findById(req.params.id);
        // console.log(userToBlocked)
        // find the user who block
        const userWhoBlocked = await User.findById(req.userAuth);
        // console.log(userWhoBlocked)
        // Check if userToBlocked and userWhoBlocked are found
        if(userWhoBlocked && userToBlocked) {
            const isUserAlreadyBlocked = userWhoBlocked.blocked.find(blocked => 
                blocked.toString() === userToBlocked._id.toString()
            );
            if(isUserAlreadyBlocked) {
                return next(appErr("You have already blocked this user."))
            }
            else{
                 // push user userToBlocked into userWhoBlocked array
                 userWhoBlocked.blocked.push(userToBlocked._id);
                 // save userToBlocked
                 await userWhoBlocked.save()
                 res.json({
                     status: "Success",
                     data: "You have successfully blocked this user."
                 });
            }
        }
       
    }
    catch (error){
        next(appErr(error.message));
    }
};

// Unblocked
const unblockUserCtrl = async(req, res, next) =>{
    try {
        // find the user to unblock
        const userToUnBlocked = await User.findById(req.params.id);
        // find the user who block
        const userWhoUnBlocked = await User.findById(req.userAuth);
        // Check if userToUnBlocked and userWhoUnBlocked are found
        if(userToUnBlocked && userWhoUnBlocked){
            const isUserAlreadyBlock = userWhoUnBlocked.blocked.find(blocked =>
                blocked.toString() === userToUnBlocked._id.toString()
            );
            if(!isUserAlreadyBlock){
                return next(appErr("You have not blocked this user."))
            }
            else{
                // remove userToUnBlocked from userWhoUnBlocked array
                userWhoUnBlocked.blocked = userWhoUnBlocked.blocked.filter(blocked =>
                    blocked.toString() !== userToUnBlocked._id.toString()
                );
                  // save   userWhoUnBlocked
                  await userWhoUnBlocked.save()
                  res.json({
                      status: "Success",
                      data: "You have successfully UnBlock this User "
                  });
            }
        }

    }
    catch (error){
        next(appErr(error.message));
    }
};

// Admin-Block
const adminBlockUserCtrl = async(req, res, next) =>{
    try {
        // find user to block
        const userToBeBlocked = await User.findById(req.params.id);

        const userWhoBlocked = await User.findById(req.userAuth);
        if(!userWhoBlocked){
            return next(appErr("User not Found"))
        }
        else{
            // change isblocked to true
            userToBeBlocked.isBlocked = true;
            // save userToBeBlocked
            await userToBeBlocked.save()
            res.json({
                status: "Success",
                data: "You have successfully blocked this user"
            });
        }
    }
    catch (error){
        next(appErr(error.message));
    }
};

// Admin-unBlock
const adminUnBlockUserCtrl = async(req, res, next) =>{
    try {
        // find user to block
        const userToBeUnBlocked = await User.findById(req.params.id)
        if(!userToBeUnBlocked){
            return next(appErr("User not Found"))
        }
        else{
            // change isblocked to false
            userToBeUnBlocked.isBlocked = false;
            // save userToBeBlocked
            await userToBeUnBlocked.save()
            res.json({
                status: "Success",
                data: "You have successfully Unblocked this user"
            });
        }
    }
    catch (error){
      next(appErr(error.message));
    }
};
// Following
const followingCtrl = async(req,res, next) =>{
    try {
        // find the user to follow
        const userToFollow = await User.findById(req.params.id);
        // find the user who is following
        const userWhoFollowed = await User.findById(req.userAuth);
        // console.log(userWhoFollowed);

        // Check if userToFollow and userWhoFollowed are found
        if(userToFollow && userWhoFollowed) {
            // Check if userWhoFollowed is already in the users followers array
            const isAlreadyFollowed = userToFollow.followers.find(follower => 
                follower.toString() == userWhoFollowed._id.toString()
            );
            console.log(isAlreadyFollowed, "follow");
                        
           if(isAlreadyFollowed){
                return next(appErr("You have already follow this user"));
            }
            else{
                // push user userWhoFollowed into users followers array
                userToFollow.followers.push(userWhoFollowed._id);
                // push userToFollow  to userWhoFollowed's following array
                userWhoFollowed.following.push(userToFollow._id);

                await userToFollow.save();
                await userWhoFollowed.save();
                res.json({
                    status: "Success",
                    data: "You have successfully follow this user"
                });
            }
        }
                
    }
    catch (error){
        next(appErr(error.message));
    }
};

// Unfollow
const unFollowCtrl =  async(req, res, next) =>{
    //  console.log(req.userAuth);
    try {
       // find the user to unfollow
       const userToUnFollowed = await User.findById(req.params.id);
        //   console.log(userToBeUnFollowed);
        // find the user who is unfollowing
        const userWhoUnFollowed = await User.findById(req.userAuth);
        // console.log(userWhoUnFollowed)

        // Check if userToUnFollowed and userWhoUnFollowed are found
        if(userToUnFollowed && userWhoUnFollowed){
            const userAlreadyFollowed = userToUnFollowed.followers.find(follower =>
                follower.toString() === userWhoUnFollowed._id.toString()
            );
            if(!userAlreadyFollowed){
                return next(appErr("You have not follow this user at unfollow"))
            }
            else{
                userToUnFollowed.followers = userToUnFollowed.followers.filter(follower =>
                    follower.toString() !== userWhoUnFollowed._id.toString()
                );
                // save userToUnFollowed
                await userToUnFollowed.save();

                userWhoUnFollowed.following = userWhoUnFollowed.following.filter(following =>
                    following.toString() !== userToUnFollowed._id.toString()
                );
                // save userToWhoUnFollowed
             await userWhoUnFollowed.save()

                res.json({
                    status: "Success",
                    data: "You have successfully Unfollow this user"
                });
            }
        }
    }
    
    catch (error){
        next(appErr(error.message));
    }
};


// who viewed my profile
const whoViewedCtrl =  async(req, res, next) =>{
    try {
        // Original user
        const user = await User.findById(req.params.id);

        // who viewed the original user
        const whoViewed = await User.findById(req.userAuth);

        // Check if the user is viewed
        if(user && whoViewed){
            // Check if userWhoviewed is already in the users viewers array.
            const isAlredyViewed = user.viewers.find(viewer => 
                viewer.toString() === whoViewed._id.toJSON()
            )
            // console.log(isAlredyViewed, "Viewed");
            if(isAlredyViewed) {
                return next(AppErr("You already view this profile"))
            }
            else{
                // push the whoViewed to the original viewers array
                user.viewers.push(whoViewed._id)
                await user.save()
                res.json({
                    status: "Success",
                    data: "You have successfully viewed this profile"
                });
            }
        }
    }
    catch (error){
        next(appErr(error.message));
    }
};

// profile photo upload
const profilePhotoUploadCtrl =  async(req, res, next) =>{
    // console.log(req.file);
    try {
        // Find the user to be updated
        const userUpdate = await User.findById(req.userAuth);
        // Check if the user is found

        if(!userUpdate){
            return next(AppErr("User not found"));
        }

        // Check if the user is blocked

        if(userUpdate.isBlocked){
            return next(AppErr("Action  not allowed, your account has been blocked"));
        }

        // Check if the user is updating their profile photo
        if(req.file){
            // Update profile photo
            await User.findByIdAndUpdate(req.userAuth, {
                $set: {
                    profilePhoto: req.file.path,
                }
               
            },
            {
                new: true,
            });
            res.json({
                status: "Success",
                data: "profile photo haas been upload successfully"
            });

        }
    }
    catch (error){
        next(appErr(error.message));
    }
};

// Delete
const deleteUserAccountCtrl = async(req,res) =>{
    try {
        // find user to be deleted
        const userToDelete = await User.findById(req.userAuth);
        console.log(userToDelete);
       
        // find all Post to be deleted
        await Post.deleteMany({users: req.userAuth})
       // find all Comment to be deleted,
       await Comment.deleteMany({users: req.userAuth})
       
      // find all Category to be deleted
      await Category.deleteMany({users: req.userAuth})
      // delete user
      await userToDelete.delete();

      // delete Account 
        res.json({
            status: "Success",
            data: "Account has been deleted successfully"
        });
    }
    catch (error){
        res.json(error.message);
    }
};


module.exports = {
    userRegisterCtrl,
    userLoginCtrl,
    userCtrl,
    usersprofileCtrl,
    singleUserCtrl,
    userUpdateCtrl,
    deleteUserAccountCtrl,
    profilePhotoUploadCtrl,
    whoViewedCtrl,
    followingCtrl,
    unFollowCtrl,
    blockedCtrl,
    unblockUserCtrl,
    adminBlockUserCtrl,
    adminUnBlockUserCtrl,
    updatePasswordCtrl,
}