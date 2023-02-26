const express = require("express");
const { categoryCreateCtrl, allCategoryCtrl } = require("../../controller/categories/categoryCtrl")
const { deleteCategoryCtrl, UpdatecategoryCtrl } = require("../../controller/categories/categoryCtrl")

const categoryRouter = express.Router();


//Post/api/v1/categories
categoryRouter.post("/", categoryCreateCtrl)

//Get/api/v1/categories/:id
categoryRouter.get("/:id", allCategoryCtrl);


//delete/api/v1/categories/:id
categoryRouter.delete("/:id", deleteCategoryCtrl);

//Put/api/v1/categories/:id
categoryRouter.put("/:id", UpdatecategoryCtrl);


module.exports = categoryRouter;