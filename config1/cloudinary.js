const cloudinary = require("cloudinary").v2;
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

// Using SDK to Upload image
// Return "https" URLs by setting secure: true
// cloudinary.config({
//     secure: true
//   });
  
//   // Log the configuration
//   console.log(cloudinary.config());

//   // Uploads an image file
// const uploadImage = async (imagePath) => {

//     // Use the uploaded file's name as the asset's public ID and 
//     // allow overwriting the asset with new versions
//     const options = {
//       use_filename: true,
//       unique_filename: false,
//       overwrite: true,
//     };

//     try {
//       // Upload the image
//       const result = await cloudinary.uploader.upload(imagePath, options);
//       console.log(result);
//       return result.public_id;
//     } catch (error) {
//       console.error(error);
//     }
// };

  