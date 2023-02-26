// Create
const postCreateCtrl = async(req,res) =>{
    try {
        res.json({
            status: "Success",
            data: "Post created"
        });
    }
    catch (error){
        res.json(error.message);
    }
};

// Single
const postSingleCtrl = async(req,res) =>{
    try {
        res.json({
            status: "Success",
            data: "Post single route"
        });
    }
    catch (error){
        res.json(error.message);
    }
};

// All 
const postAllCtrl =async(req,res) =>{
    try {
        res.json({
            status: "Success",
            data: "All Posts route"
        });
    }
    catch (error){
        res.json(error.message);
    }
};

// Delete
const postDeleteCtrl = async(req,res) =>{
    try {
        res.json({
            status: "Success",
            data: "Delete posts route"
        });
    }
    catch (error){
        res.json(error.message);
    }
};

// Update
const postUpdateCtrl = async(req, res) =>{
    try{
        res.json({
            status: "Success",
            data: "Update post routes"
        })
    }
    catch (error){
        res.json(error.message);
    }
};

module.exports = {
    postCreateCtrl,
    postSingleCtrl,
    postAllCtrl,
    postDeleteCtrl,
    postUpdateCtrl,
}