const { userRegisterCtrl, whoViewedCtrl, followingCtrl, unFollowCtrl, blockedCtrl, unblockUserCtrl} = require("../../controller/users/userCtrl")
const { userLoginCtrl, singleUserCtrl, userUpdateCtrl, adminBlockUserCtrl, adminUnBlockUserCtrl } = require("../../controller/users/userCtrl")
const { userCtrl, usersprofileCtrl, deleteUserAccountCtrl,profilePhotoUploadCtrl, updatePasswordCtrl } = require("../../controller/users/userCtrl")
const express = require("express");
const isLogin = require("../../middlewares/isLogIn");
const storage = require("../../config1/cloudinary");
const multer = require("multer");
const isAdmin = require("../../middlewares/isAdmin");



const userRouter = express.Router();


// instance profile upload
const upload = multer({storage});

//Post/api/v1/users/register
userRouter.post("/register", userRegisterCtrl);

//Post/api/v1/users/login
userRouter.post("/login", userLoginCtrl);

//Post/api/v1/users
userRouter.get("/", userCtrl);

//Get/api/v1/usersprofile/:id
userRouter.get("/profile/", isLogin, usersprofileCtrl);

//Get/api/v1/users/:id
userRouter.get("/:id", singleUserCtrl);

//Put/api/v1/users/:id
userRouter.put("/",isLogin, userUpdateCtrl);

//Get/api/v1/users/:id
userRouter.get("/viewers-profile/:id", isLogin, whoViewedCtrl);

//Get/api/v1/users/following/:id
userRouter.get("/following/:id", isLogin, followingCtrl);

//Get/api/v1/users/unfollowing/:id
userRouter.get("/unfollowing/:id", isLogin, unFollowCtrl);

//Get/api/v1/users/blocked/:id
userRouter.get("/blocked/:id", isLogin, blockedCtrl);

//Get/api/v1/users/unblocked/:id
userRouter.get("/unblock/:id", isLogin, unblockUserCtrl);

//put/api/v1/users/admin-block/:id
userRouter.put("/admin-block/:id", isLogin, isAdmin, adminBlockUserCtrl);

//put/api/v1/users/admin-block/:id
userRouter.put("/admin-unblock/:id", isLogin, isAdmin, adminUnBlockUserCtrl);

//put/api/v1/users/update-password/
userRouter.put("/update-password/", isLogin, updatePasswordCtrl);




//Post/api/v1/users/:id
userRouter.post("/profile-photo-upload",
isLogin,
upload.single("profile"),
 profilePhotoUploadCtrl);

//delete/api/v1/users/delete-account
userRouter.delete("/delete-account",isLogin, deleteUserAccountCtrl);



module.exports = userRouter