// Create 
const commentCreateCtrl = async(req,res) =>{
    try {
        res.json({
            status: "Success",
            data: "Comment created"
        });
    }
    catch (error){
        res.json(error.message);
    }
};

// Single
const singleCommentCtrl = async(req,res) =>{
    try {
        res.json({
            status: "Success",
            data: "comment route"
        });
    }
    catch (error){
        res.json(error.message);
    }
};

const commnetDeleteCtrl =  async(req,res) =>{
    try {
        res.json({
            status: "Success",
            data: "Delete comment route"
        });
    }
    catch (error){
        res.json(error.message);
    }
};

//Update
const commentUpdateCtrl = async(req,res) =>{
    try {
        res.json({
            status: "Success",
            data: "Update posts route"
        });
    }
    catch (error){
        res.json(error.message);
    }
}; 


module.exports = {
    commentCreateCtrl,
    singleCommentCtrl,
    commnetDeleteCtrl,
    commentUpdateCtrl,
}