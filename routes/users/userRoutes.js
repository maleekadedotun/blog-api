const { userRegisterCtrl } = require("../../controller/users/userCtrl")
const { userLoginCtrl, singleUserCtrl, userUpdateCtrl } = require("../../controller/users/userCtrl")
const { userCtrl, usersprofileCtrl, userDeleteCtrl,profilePhotoUploadCtrl } = require("../../controller/users/userCtrl")
const express = require("express");
const isLogin = require("../../middlewares/isLogIn");
const storage = require("../../config1/cloudinary");
const multer = require("multer");


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
userRouter.put("/:id", userUpdateCtrl);

//Post/api/v1/users/:id
userRouter.post("/profile-photo-upload"
,upload.single("profile"),
 profilePhotoUploadCtrl);

//delete/api/v1/users/:id
userRouter.delete("/:id", userDeleteCtrl);



module.exports = userRo