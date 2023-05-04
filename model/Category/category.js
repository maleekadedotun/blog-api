const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema(
    {
        
        user: {
            type: String,
            ref: "User",
            required: true,
        },
       title: {
            type: Object,
            required: true, 
        },

    },
    {timestamps: true}
);

const Category = mongoose.model("Category",categorySchema);

module.exports = Category;