const express = require("express");
const { commentCreateCtrl, singleCommentCtrl } = require("../../controller/comments/commentCtrl")
const { commnetDeleteCtrl, commentUpdateCtrl } = require("../../controller/comments/commentCtrl")

const commentRouter = express.Router();


//Post/api/v1/comments
commentRouter.post("/", commentCreateCtrl)


//Get/api/v1/comments/:id
commentRouter.get("/:id", singleCommentCtrl);


//delete/api/v1/comments/:id
commentRouter.delete("/:id", commentUpdateCtrl);

//Put/api/v1/posts/:id
commentRouter.put("/:id", commentUpdateCtrl);



module.exports = commentRouter