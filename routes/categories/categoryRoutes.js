const express = require("express");
const { categoryCreateCtrl, allCategoryCtrl } = require("../../controller/categories/categoryCtrl")
const { deleteCategoryCtrl, UpdatecategoryCtrl, singleCategoryCtrl } = require("../../controller/categories/categoryCtrl");
const isLogin = require("../../middlewares/isLogIn");
const categoryRouter = express.Router();


//Post/api/v1/categories
categoryRouter.post("/", isLogin, categoryCreateCtrl)

//Get/api/v1/categories/:id
categoryRouter.get("/", allCategoryCtrl);

//Get/api/v1/categories/
categoryRouter.get("/:id", singleCategoryCtrl);


//delete/api/v1/categories/:id
categoryRouter.delete("/:id", isLogin, deleteCategoryCtrl);

//Put/api/v1/categories/:id
categoryRouter.put("/:id", isLogin, UpdatecategoryCtrl);


module.exports = categoryRouter;