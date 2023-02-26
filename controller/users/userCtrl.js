const User = require("../../model/User/user");
const bcrypt = require("bcryptjs");
const generateToken = require("../../utilis/generateToken");
const generateFromHeader = require("../../utilis/generateTokenFromHeader");
const{ appErr, AppErr} = require("../../utilis/appError");



// register
const userRegisterCtrl = async(req, res, next) =>{
    // console.log(req.body);
    const {firstName, lastName, profilePhoto, email, password} = req.body;
    try {
        // Check if email exists.
        const userFound = await User.findOne({email})
        if(userFound) {
            return next(new AppErr("Email Already Exist"));
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt)


        // Create the user
        const user = await User.create({
            firstName,
            lastName,
            email,
            password: hashPassword
        })
        // console.log(user);
        res.json({
            status: "Success",
            data: user,
        });
    }
    catch (error){
        next(new AppErr(error.message));
    }
};
// Login
const userLoginCtrl =  async(req, res) =>{
    const {email, password} = req.body;
    
    try {
       // Check Email
       const userGmail = await User.findOne({email});

       // Verify Password
       const isPasswordMatched = await bcrypt.compare(password, userGmail.password);
        if(!userGmail || !isPasswordMatched) {
            return res.json({
                msg: "Invalid Login Details"
            })
        }
    //    if(!userGmail)
    //         return res.json({
    //             msg: "Invalid Credentials"
    //         })
    //    };

    //    // password Validation
    //    const userPassword = await User.findOne({password});
    //    if(!userPassword){
    //         return res.json({
    //             msg: "Invalid Credentials"
    //         })
    //    }
        res.json({
            status: "Success",
            data: {
                firstName: userGmail.firstName,
                lastName: userGmail.lastName,
                email: userGmail.email,
                isAdmin: userGmail.isAdmin,
                token: generateToken(userGmail._id)
            }
        });
    }
    catch (error){
        res.json(error.message);
    }
};

// All
const userCtrl = async(req,res) =>{
    try {
        res.json({
            status: "Success",
            data: "All User routes"
        });
    }
    catch (error){
        res.json(error.message);
    }
};

// profile
const usersprofileCtrl =  async(req,res) =>{
    // console.log(req.userAuth)
    try {
        // get token from header
       const token =  generateFromHeader(req);
    //   console.log(token)
        const user = await User.findById(req.userAuth)
        res.json({
            status: "Success",
            data: user,
        });
    }
    catch (error){
        res.json(error.message);
    }
}; 

// Single
const singleUserCtrl = async(req,res) =>{
    try {
        res.json({
            status: "Success",
            data: "Single User route"
        });
    }
    catch (error){
        res.json(error.message);
    }
};

// Update
const userUpdateCtrl =  async(req,res) =>{
    try {
        res.json({
            status: "Success",
            data: "Update user route"
        });
    }
    catch (error){
        res.json(error.message);
    }
};

// profile photo upload
const profilePhotoUploadCtrl =  async(req,res) =>{
    res.send(req.file)
    console.log(req.file);
    try {
        res.json({
            status: "Success",
            data: "profile photo upload"
        });
    }
    catch (error){
        res.json(error.message);
    }
};

// Delete
const userDeleteCtrl = async(req,res) =>{
    try {
        res.json({
            status: "Success",
            data: "Delete user route"
        });
    }
    catch (error){
        res.json(error.message);
    }
};


module.exports = {
    userRegisterCtrl,
    userLoginCtrl,
    userCtrl,
    usersprofileCtrl,
    singleUserCtrl,
    userUpdateCtrl,
    userDeleteCtrl,
    profilePhotoUploadCtrl,
}