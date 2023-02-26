// Create
const categoryCreateCtrl = async(req,res) =>{
    try {
        res.json({
            status: "Success",
            data: "Category created"
        });
    }
    catch (error){
        res.json(error.message);
    }
};

// All
const allCategoryCtrl = async(req,res) =>{
    try {
        res.json({
            status: "Success",
            data: "Category route"
        });
    }
    catch (error){
        res.json(error.message);
    }
};

// Delete
const deleteCategoryCtrl = async(req,res) =>{
    try {
        res.json({
            status: "Success",
            data: "Delete categories route"
        });
    }
    catch (error){
        res.json(error.message);
    }
};

// Update
const UpdatecategoryCtrl = async(req, res) =>{
    try {
        res.json({
            status: "Success",
            data: "Update category route"
        });
    }
    catch (error){
        res.json(error.message);
    }
}

module.exports = {
    categoryCreateCtrl,
    allCategoryCtrl,
    deleteCategoryCtrl,
    UpdatecategoryCtrl,
}