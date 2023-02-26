const express = require("express");
const { postCreateCtrl, postSingleCtrl } = require("../../controller/posts/postCtrl");
const { postAllCtrl, postDeleteCtrl, postUpdateCtrl } = require("../../controller/posts/postCtrl")

const postRouter = express.Router();


//Post/api/v1/posts
postRouter.post("/", postCreateCtrl)


//Get/api/v1/posts/:id
postRouter.get("/:id", postSingleCtrl);

//Get/api/v1/posts
postRouter.get("/", postAllCtrl);

//delete/api/v1/posts/:id
postRouter.delete("/:id", postDeleteCtrl);

//Put/api/v1/posts/:id
postRouter.put("/:id", postUpdateCtrl)
module.exports = postRouter;