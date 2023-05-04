const express = require("express");
const { postCreateCtrl, postSingleCtrl, postToggleLikesCtrl, postToggledisLikesCtrl } = require("../../controller/posts/postCtrl");
const { fetchPostAllCtrl, postDeleteCtrl, postUpdateCtrl } = require("../../controller/posts/postCtrl");
const isLogin = require("../../middlewares/isLogIn");

const multer = require("multer");
const storage = require("../../config1/cloudinary");

const postRouter = express.Router();

const upload = multer({storage});


//Post/api/v1/posts
postRouter.post("/",isLogin, upload.single("image"), postCreateCtrl);

//Get/api/v1/posts/:id
postRouter.get("/:id", isLogin, postSingleCtrl);

//Get/api/v1/posts
postRouter.get("/",isLogin, fetchPostAllCtrl);


//Get/api/v1/posts/likes/:id
postRouter.get("/likes/:id", isLogin, postToggleLikesCtrl);

//Get/api/v1/posts/dislikes/:id
postRouter.get("/dislikes/:id", isLogin, postToggledisLikesCtrl);


//delete/api/v1/posts/:id
postRouter.delete("/:id", isLogin, postDeleteCtrl);

//Put/api/v1/posts/:id
postRouter.put("/:id",isLogin, upload.single("image"), postUpdateCtrl)
module.exports = postRouter;