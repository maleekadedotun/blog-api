const express = require("express");
const { commentCreateCtrl, deleteCommentCtrl } = require("../../controller/comments/commentCtrl")
const { commentUpdateCtrl } = require("../../controller/comments/commentCtrl");
const isLogin = require("../../middlewares/isLogIn");
const commentRouter = express.Router();


//Post/api/v1/comments
commentRouter.post("/:id",isLogin, commentCreateCtrl)


//Get/api/v1/comments/:id
commentRouter.get("/:id", isLogin, deleteCommentCtrl);


//delete/api/v1/comments/:id
commentRouter.delete("/:id", commentUpdateCtrl);

//Put/api/v1/posts/:id
commentRouter.put("/:id", isLogin, commentUpdateCtrl);



module.exports = commentRouter