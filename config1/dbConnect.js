const mongoose = require("mongoose");
require("dotenv").config();


// There are two solution for Deprecation warning: mongoose.

// Either set the strictly option globally to suppress the warning
// mongoose.set("strictQuery", true)

// Set the flag to false if you want to override the current strictQuery behaviour and prepare for the next release.
mongoose.set("strictQuery", false)

const dbConnect = async () => {
    try{
      await mongoose.connect(process.env.MONGODB_ULR);
      console.log("DataBase connected successfully");
    }catch(error) {
      console.log(error.message);
      process.exit(1)
    }
}
 dbConnect()
// mongoose.connect("mongodb+srv://emmaUserName:blogpassword@blog-api-nodejs.7gmd59s.mongodb.net/blog-api?retryWrites=true&w=majority", 
// mongoose.connect(process.env.MONGODB_ULR,
//   () => console.log("DataBase connected successfully!")
// );