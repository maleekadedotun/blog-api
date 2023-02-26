const cloudinary = require("cloudinary");
const dotenv = require("dotenv");
const { CloudinaryStorage } = require("multer-storage-cloudinary");

dotenv.config();
cloudinary.config({
    cloud_name: process.env. CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Instance upload storage

const storage = new CloudinaryStorage({
    cloudinary,
    allowedFormats: ["jpg", "png"],
    params:{
        folder: "blog-api",
        transformation: [{width: 500, height: 500, crop: "limit"}],
    }
});

module.exports = storage;