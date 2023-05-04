const Category = require("../../model/Category/category");
const{ appErr, AppErr} = require("../../utilis/appError");


// Create
const categoryCreateCtrl = async(req, res, next) =>{
    const {title} = req.body;
    try {
        const category = await Category.create({title, user: req.userAuth});
        res.json({
            status: "Success",
            data: category,
        });
    }
    catch (error){
        return next(appErr(error.message))
    }
};

// All
const allCategoryCtrl = async(req,res) =>{
    try {
        const categories = await Category.find();

        res.json({
            status: "Success",
            data: categories,
        });
    }
    catch (error){
        res.json(error.message);
    }
};


// Single
const singleCategoryCtrl = async(req,res) =>{
    try {
        const category = await Category.findById(req.params.id);

        res.json({
            status: "Success",
            data: category,
        });
    }
    catch (error){
        res.json(error.message);
    }
};

// Update
const UpdatecategoryCtrl = async(req, res) =>{
    const {title} = req.body;
    try {
        const category = await Category.findByIdAndUpdate(
            req.params.id,
            {title},
            {new: true, runValidators: true,}
             )
        res.json({
            status: "Success",
            data: category,
        });
    }
    catch (error){
        res.json(error.message);
    }
}

// Delete
const deleteCategoryCtrl = async(req,res) =>{
  
    try {
        await Category.findByIdAndDelete(req.params.id)
        res.json({
            status: "Success",
            data: "Category deleted successfully"
        });
    }
    catch (error){
        res.json(error.message);
    }
};



module.exports = {
    categoryCreateCtrl,
    allCategoryCtrl,
    deleteCategoryCtrl,
    UpdatecategoryCtrl,
    singleCategoryCtrl,
}